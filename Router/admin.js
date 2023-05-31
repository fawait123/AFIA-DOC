const Doctor = require("../Controllers/Doctor");
const Regionals = require("../Controllers/Regionals");
const JWT = require("../utils/jwt");

const Router = require("express").Router();

Router.use(async (req, res, next) => {
  try {
    let authorization = req.headers.authorization;
    if (!authorization) {
      return res.sendData(401, "Anauthenticate");
    }

    let token = authorization.split(" ")[1];

    await JWT.verify(token)
      .then((data) => {
        req.account = data.data;
        return next();
      })
      .catch((err) => {
        return res.sendData(401, err.message);
      });
  } catch (error) {
    return res.sendData(500, error.message);
  }
});

Router.get("/doctor", Doctor.get);

Router.get("/regionals", Regionals.get);

module.exports = Router;
