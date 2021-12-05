const { Router } = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { Readable } = require('stream');
const { song } = require('../mongo');

const router = Router();

router.get('/:trackID', (req, res) => {
    const trackID = req.params.trackID;

    res.set("content-type", "audio/mp3");
    res.set("accept-ranges", "bytes");

    const GridFS = Grid(mongoose.connection.db, mongoose.mongo);

    const downloadStream = GridFS.createReadStream({ _id: trackID });

    downloadStream.on('data', chunk => {
        res.write(chunk);
    });

    downloadStream.on('error', () => {
        res.sendStatus(404);
    });

    downloadStream.on('end', () => {
        res.end();
    });

});

router.post('/', (req, res) => {
    //Definiendo storage en memoria
    const storage = multer.memoryStorage();

    //Configurando multer
    const upload = multer({
        storage,
        limits: {
            fields: 8, // Parámetros extra que le pasaremos (el name y la url de la imagen)
            fileSize: 22000000, // Tamaño máximo del file (bites)
            files: 1, // Número de archivos a subir
            parts: 8 // Dos tipos de campos
        }
    });

    const callback = err => {
        //Gestión de errores antes de subir el archivo

        if (err) {
            console.log("err", err);
            return res.status(500).json({ message: err.message });
        }

        // else if (!req.body.title) {
        //     return res.status(400).json({ message: 'Track name required' });
        // }

        // let trackName = req.body.filename;
        let songId = req.body.id;
        let title = req.body.title;
        let artist = req.body.artist;
        let album = req.body.album;
        let image = req.body.image;
        let category = req.body.category;
        let userId = req.body.id_author;

        const readableTrackStream = new Readable();
        readableTrackStream.push(req.file.buffer);
        readableTrackStream.push(null);

        const GridFS = Grid(mongoose.connection.db, mongoose.mongo);

        //Campos del objeto como el nombre, categoria, etc.
        const writestream = GridFS.createWriteStream({
            filename: title,
        });

        const id = writestream.id;
        readableTrackStream.pipe(writestream);
        let erro = false;
        //Errores personalizados de la librería
        //Error si no se ha podido subir el archivo
        writestream.on('error', function (error) {
            erro = error
            if (error) {
                return res.status(500).json({ error });
            }
        });
        //El archivo se ha terminado de subir y se envía un mensaje de éxito
        writestream.on('close', function (file) {
            if (!erro) {
                const newSong = new song({ title: title, trackId: id, artist: artist, image: image, category: category, album: album, id_author: userId });
                newSong.save()
                    .then((result) => {
                        console.log(result);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                return res.status(201).json({ message: 'File uploaded successfully', id });
            }
        });
    };
    upload.single('file')(req, res, callback);
});

module.exports = {
    router,
}