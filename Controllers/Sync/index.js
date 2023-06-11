const { sequelize, Sequelize } = require("../../models");
const Model = require("../../models");
const { v4: uuidv4 } = require("uuid");
const app = require("express")();

module.exports = {
  sync: async (req, res) => {
    try {
      let router = app._router;

      return res.send({ router });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
};
