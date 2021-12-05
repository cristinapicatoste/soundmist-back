var jwt = require("jsonwebtoken");

const jwtMiddleware = require("express-jwt");
const passwordHash = require("password-hash");
const { user: User } = require("../mongo");
const { jwtSecret } = require("../config/config");
const { redactMiddleware } = require("./data/dataCleanupOnReads");
const pathToRegexp = require('path-to-regexp');

const unprotected = [
  pathToRegexp('/login*'),
  pathToRegexp('/track*'),
  pathToRegexp('/register*'),
  pathToRegexp('/data/song*'),
]
const configSecurity = (app) => {
  app.use(
    jwtMiddleware({ secret: jwtSecret, algorithms: ["HS256"] }).unless({
      path: unprotected,
    })
  );
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const users = await User.find({ email });

    if (
      users.length === 1 &&
      passwordHash.verify(password, users[0].password)
    ) {
      const user = users[0];
      const token = jwt.sign({ id: user._id }, jwtSecret);
      res.status(200).send({ token });
    } else {
      res.status(401).send({ message: "Username or password incorrect" });
    }
  });

  app.post("/register", async (req, res) => {
    const password = passwordHash.generate(req.body.password);
    const userData = {
      name: req.body.name,
      email: req.body.email,
      image: req.body.image,
      password
    }
    const newUser = new User(userData);
    newUser
      .save()
      .then((result) => {
        const token = jwt.sign({ id: result._id }, jwtSecret);
        res.status(200).send({ token });
      })
      .catch((e) => {
        res.status(500).send({ error: e });
      });
  });

  app.patch('/editprofile/:id', async (req, res) => {
    const { password } = req.body;
    const newPassword = passwordHash.generate(password);
    user.findByIdAndUpdate(req.params.id, { password: newPassword })
      .then(result => {
        const token = jwt.sign({ id: result._id }, jwtSecret);
        res.send({ token });
      }).catch(e => {
        res.status(500).send({ error: e.message });
      });
  });

};

module.exports = {
  configSecurity,
};
