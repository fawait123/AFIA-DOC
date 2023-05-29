const Auth = require("../Controllers/Auth");

const Router = require("express").Router();

Router.post("/auth/register", Auth.register);
Router.post("/auth/login", Auth.login);

module.exports = Router;
