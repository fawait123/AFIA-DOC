const { sequelize, Sequelize } = require("../../models");
const Model = require("../../models");

module.exports = {
  sync: async (req, res) => {
    try {
      sequelize
        .getQueryInterface()
        .showAllSchemas()
        .then(async (tableObj) => {
          let tables = tableObj.map((el) => el.Tables_in_afia_doc);
          tables = tables.filter((el) => el !== "sequelizemeta");

          tables = tables.map(async (tbl) => {
            let check = await Model.Access.findOne({
              where: {
                name: tbl,
              },
            });

            if (!check) {
              await Model.Access.create({
                name: tbl,
              });
            }
          });

          tables = await Promise.all(tables);

          return res.sendData(200, "success", tables);
        });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
};
