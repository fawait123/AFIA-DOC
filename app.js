const express = require("express");
const cors = require("cors");
const bodyParse = require("body-parser");
const Router = require("./Router/public");
const decorators = require("./libraries/decorator");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

decorators(app);

// public route
app.use("/", Router);

app.use((req, res, next) => {
  return res.sendNotFound();
});

app.listen(PORT, () => {
  console.log("App listening on http://localhost:" + PORT);
});
