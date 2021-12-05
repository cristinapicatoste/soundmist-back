const { redactMiddleware } = require("./dataCleanupOnReads");

const {
  validationEntityMiddleware,
  validationEntityIdMiddleware,
} = require("./validation");

const { Router } = require("express");
const router = Router();

const models = require("../../mongo");

const buildRouter = () => {
  router.use("/:entity", validationEntityMiddleware);
  router.use("/:entity/:id", validationEntityIdMiddleware);
  router.use("/", redactMiddleware);

  router.get("/", (req, res) => {
    res.json({
      message: "Aloha, this is your database speaking",
    });
  });

  //Get one by ID
  router.get("/:entity/:id", (req, res) => {
    const Entity = models[req.params.entity];

    console.log(req.params.entity);

    if (req.params.entity === 'playlist') {
      return Entity.findById(req.params.id)
        .populate('id_owner')
        .then((result) => {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send();
          }
        })
        .catch((err) => {
          res.status(500).send({ error: err });
        });
    }

    if (req.params.entity === 'songsinplaylist') {
      return Entity.findById(req.params.id)
        .populate('id_song')
        .then((result) => {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send();
          }
        })
        .catch((err) => {
          res.status(500).send({ error: err });
        });
    }

    if (req.params.entity === 'favouritesongs') {
      return Entity.findById(req.params.id)
        .populate('id_song')
        .then((result) => {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send();
          }
        })
        .catch((err) => {
          res.status(500).send({ error: err });
        });
    }

    if (req.params.entity === 'favouriteplaylists') {
      return Entity.findById(req.params.id)
        .populate('id_playlist')
        .then((result) => {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send();
          }
        })
        .catch((err) => {
          res.status(500).send({ error: err });
        });
    }

    else {
      return Entity.findById(req.params.id)
        .then((result) => {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send();
          }
        })
        .catch((err) => {
          res.status(500).send({ error: err });
        });
    }

  });

  // Search
  router.get("/:entity", (req, res) => {

    console.log(req.params.entity);
    const Entity = models[req.params.entity];

    if (req.params.entity === 'songsinplaylist') {
      return Entity.find(req.query)
        .populate('id_song')
        .then((result) => {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send();
          }
        })
        .catch((err) => {
          res.status(500).send({ error: err });
        });
    }

    if (req.params.entity === 'favouritesongs') {
      return Entity.find(req.query)
        .populate('id_song')
        .then((result) => {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send();
          }
        })
        .catch((err) => {
          res.status(500).send({ error: err });
        });
    }


    if (req.params.entity === 'favouriteplaylists') {
      return Entity.find(req.query)
        .populate('id_playlist')
        .then((result) => {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send();
          }
        })
        .catch((err) => {
          res.status(500).send({ error: err });
        });
    }

    else {
      return Entity.find(req.query)
        .then((result) => {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send();
          }
        })
        .catch((err) => {
          res.status(500).send({ error: err });
        });
    }
  });

  // CREATE
  router.post("/:entity", (req, res) => {
    const Entity = models[req.params.entity];
    const newEntity = new Entity(req.body);
    return newEntity
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  });

  // UPDATE BY ID
  router.put("/:entity/:id", (req, res) => {
    const Entity = models[req.params.entity];
    return Entity.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((result) => {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send();
        }
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  });

  //DELETE
  router.delete("/:entity/:id", (req, res) => {
    const Entity = models[req.params.entity];
    return Entity.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  });
  return router;
};

module.exports = {
  buildRouter,
};
