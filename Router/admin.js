const Doctor = require("../Controllers/Doctor");
const Regionals = require("../Controllers/Regionals");
const JWT = require("../utils/jwt");
const { upload } = require("../utils/upload");

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

// route doctor
Router.get("/doctor", Doctor.get);
Router.post("/doctor", upload.single("photos"), Doctor.post);
Router.put("/doctor", upload.single("photos"), Doctor.put);
Router.delete("/doctor", upload.single("photos"), Doctor.delete);

// route regionals
Router.get("/regionals", Regionals.get);

module.exports = Router;
