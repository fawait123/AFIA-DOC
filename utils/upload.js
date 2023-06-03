const multer = require("multer");
const fs = require("fs");
const moment = require("moment");

// function to setting multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("./public/uploads")) {
      fs.mkdirSync("./public/uploads", { recursive: true });
    }

    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, moment().format("YYYYMMDDHHmmss") + file.originalname);
  },
});

const removeFile = (file) => {
  if (fs.existsSync(file.destination + "/" + file.filename)) {
    fs.unlinkSync(file.destination + "/" + file.filename);
  }
};
const upload = multer({ storage: storage });

module.exports = { upload, removeFile };
