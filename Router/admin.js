const Booking = require("../Controllers/Booking");
const Doctor = require("../Controllers/Doctor");
const Regionals = require("../Controllers/Regionals");
const Role = require("../Controllers/Role");
const Specialist = require("../Controllers/Specialist");
const Sync = require("../Controllers/Sync");
const User = require("../Controllers/User");
const { accessMiddleware } = require("../middleware/access");
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
Router.post("/booking", Booking.post);
Router.put("/booking", Booking.put);

// sync access
Router.get("/sync", accessMiddleware, Sync.sync);
module.exports = Router;
