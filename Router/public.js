const Auth = require("../Controllers/Auth");
const Regionals = require("../Controllers/Regionals");

const Router = require("express").Router();

Router.post("/auth/register", Auth.register);
Router.post("/auth/login", Auth.login);
Router.post("/auth/logout", Auth.logout);

// push regionals to database
Router.post("/regionals/generate", Regionals.push);

module.exports = Router;
