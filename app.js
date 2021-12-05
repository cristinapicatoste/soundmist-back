const {configSecurity} = require("./src/controllers/jwt");
require('dotenv').config();

const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')
const buildDataRouter = require('./src/controllers/data').buildRouter;
const trackRouter = require('./src/controllers/trackController').router;

const app = express();

const port = process.env.PORT
app.use(cors())


app.use(bodyParser.json());

configSecurity(app);

app.use('/data', buildDataRouter());

app.use('/track', trackRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
