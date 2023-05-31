const Pagination = require("../../utils/pagination");
const Model = require("./../../models");

module.exports = {
  get: async (req, res) => {
    try {
      const query = req.query;
      const pagination = new Pagination(query, Model.Doctor);

      const doctor = await Model.Doctor.findAndCountAll({
        ...pagination.getPagination(),
        where: {
          ...pagination.getSearch(),
        },
      });

      return res.sendData(200, "success", {
        ...doctor,
        page: pagination.getPagination().offset + 1,
        limit: pagination.getPagination().limit,
      });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
};
