const Booking = require("../Controllers/Booking");
const Doctor = require("../Controllers/Doctor");
const Regionals = require("../Controllers/Regionals");
const Role = require("../Controllers/Role");
const Specialist = require("../Controllers/Specialist");
const Sync = require("../Controllers/Sync");
const User = require("../Controllers/User");
const Model = require("./../models");
const { accessMiddleware } = require("../middleware/access");
const JWT = require("../utils/jwt");
const { upload } = require("../utils/upload");
const Chatt = require("../Controllers/Chatt");
const Patient = require("../Controllers/Patient");

const Router = require("express").Router();

Router.use(async (req, res, next) => {
  try {
    let authorization = req.headers.authorization;
    if (!authorization) {
      return res.sendData(401, "Anauthenticate");
    }

    let token = authorization.split(" ")[1];

    const check = await Model.User.findOne({
      where: {
        token: token,
      },
    });

    if (!check) {
      return res.sendData(401, "Anauthenticate");
    }

    req.account = check;

    return next();

    // await JWT.verify(token)
    //   .then((data) => {
    //     req.account = data.data;
    //     return next();
    //   })
    //   .catch((err) => {
    //     return res.sendData(401, err.message);
    //   });
  } catch (error) {
    return res.sendData(500, error.message);
  }
});

// route doctor
Router.get("/doctor", accessMiddleware, Doctor.get);
Router.post("/doctor", accessMiddleware, upload.single("photos"), Doctor.post);
Router.put("/doctor", accessMiddleware, upload.single("photos"), Doctor.put);
Router.delete(
  "/doctor",
  [accessMiddleware, upload.single("photos")],
  Doctor.delete
);

// route user
Router.get("/user", accessMiddleware, User.get);
Router.post("/user", accessMiddleware, User.post);
Router.put("/user", accessMiddleware, User.put);
Router.put("/user/approve", accessMiddleware, User.approve);
Router.delete("/user", accessMiddleware, User.delete);

// route regionals
Router.get("/regionals", accessMiddleware, Regionals.get);

// route specialist
Router.get("/specialist", accessMiddleware, Specialist.get);
Router.post("/specialist", accessMiddleware, Specialist.post);
Router.put("/specialist", accessMiddleware, Specialist.put);
Router.delete("/specialist", accessMiddleware, Specialist.delete);

// route role
Router.get("/role", accessMiddleware, Role.get);
Router.post("/role", accessMiddleware, Role.post);
Router.put("/role", accessMiddleware, Role.put);
Router.delete("/role", accessMiddleware, Role.delete);

// route role access
Router.post("/role/group", accessMiddleware, Role.group);

// route booking
Router.get("/booking", Booking.get);
Router.post("/booking", Booking.post);
Router.put("/booking", Booking.put);
Router.put("/booking/done", Booking.done);

// sync access
Router.get("/sync", accessMiddleware, Sync.sync);

//route chatt
Router.get("/chatt", Chatt.get);
Router.post("/chatt", Chatt.post);
Router.delete("/chatt", Chatt.delete);

// add pasient
Router.get("/patient", Patient.get);
Router.post("/patient", Patient.post);
Router.put("/patient", Patient.put);
Router.delete("/patient", Patient.delete);
module.exports = Router;
