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
const Registration = require("../Controllers/Registration");

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
  } catch (error) {
    return res.sendData(500, error.message);
  }
});

// route doctor
Router.get("/doctor", Doctor.get);
Router.post("/doctor", upload.single("photos"), Doctor.post);
Router.put("/doctor", upload.single("photos"), Doctor.put);
Router.delete("/doctor", upload.single("photos"), Doctor.delete);

// route user
Router.get("/user", User.get);
Router.post("/user", User.post);
Router.put("/user", User.put);
Router.put("/user/approve", User.approve);
Router.delete("/user", User.delete);

// route regionals
Router.get("/regionals", Regionals.get);

// route specialist
Router.get("/specialist", Specialist.get);
Router.post("/specialist", Specialist.post);
Router.put("/specialist", Specialist.put);
Router.delete("/specialist", Specialist.delete);

// route role
Router.get("/role", Role.get);
Router.post("/role", Role.post);
Router.put("/role", Role.put);
Router.delete("/role", Role.delete);

// route role access
Router.post("/role/group", Role.group);

// route booking
Router.get("/booking", Booking.get);
Router.post("/booking", Booking.post);
Router.put("/booking", Booking.put);
Router.put("/booking/done", Booking.done);

// sync access
Router.get("/sync", Sync.sync);

//route chatt
Router.get("/chatt", Chatt.get);
Router.post("/chatt", Chatt.post);
Router.delete("/chatt", Chatt.delete);

// add pasient
Router.get("/patient", Patient.get);
Router.post("/patient", Patient.post);
Router.put("/patient", Patient.put);
Router.delete("/patient", Patient.delete);

// registration
Router.get("/registration", Registration.get);
Router.post("/registration", Registration.post);
module.exports = Router;
