// const express = require("express");
// const morgan = require("morgan");
// const bodyParser = require("body-parser");
// const helmet = require("helmet");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const { configSecurity } = require("../src/controllers/jwt");
// const trackRouter = require('./controllers/trackController/');
// const followerRouter = require('./controllers/followers');
// require("dotenv").config();
//
// const buildDataRouter = require("../src/controllers/data").buildRouter;
//
// const app = express();
// const url = process.env.DATABASE_URL;
// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
//
// app.use(morgan("common"));
// app.use(helmet());
// app.use(cors());
// app.use(express.json());
//
// app.use("/data", buildDataRouter());
// app.use("/track", trackRouter);
// app.use("/follower", followerRouter);
//
// configSecurity(app);
//
// const port = process.env.PORT || 1337;
// app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}`);
//   console.log(`The URL of the database is ${url}`);
// });
