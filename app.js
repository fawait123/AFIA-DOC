const express = require("express");
const cors = require("cors");
const bodyParse = require("body-parser");
const Router = require("./Router/public");
const Admin = require("./Router/admin");
const decorators = require("./libraries/decorator");
const socketIo = require("./socket/config");
const http = require("http");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const server = http.createServer(app);

app.use(cors());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
// app.use(bodyParse(){li});

decorators(app);

// public route
app.use("/", Router);
app.use("/admin", Admin);

app.use((req, res, next) => {
  return res.sendNotFound();
});

// app.listen(PORT, () => {
//   console.log("App listening on http://localhost:" + PORT);
// });
server.listen(PORT, () => {
  console.log("App listening on http://localhost:" + PORT);
});

socketIo(server);
