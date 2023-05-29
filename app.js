const express = require("express");
const cors = require("cors");
const bodyParse = require("body-parser");
const Router = require("./Router/public");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParse.urlencoded({ extended: false }));

// public route
app.use("/", Router);

app.listen(PORT, () => {
  console.log("App listening on http://localhost:" + PORT);
});
