const ChattSchema = require("../../schema/ChattSchema");
const Model = require("./../../models");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const Pagination = require("../../utils/pagination");

module.exports = {
  post: async (req, res) => {
    try {
      const body = req.body;

      const { error, value } = ChattSchema.validate({ ...body });
      if (error) {
        return res.sendData(400, error.message);
      }

      let chatt = await Model.Chatt.create({
        id: uuidv4(),
        senderID: body.senderID,
        receiverID: body.receiverID,
        message: body.message,
        date: moment().format("YYYY-MM-DD"),
      });

      return res.sendData(200, "success", chatt);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  delete: async (req, res) => {
    try {
      const query = req.query;

      const chatt = await Model.Chatt.findOne({
        where: {
          id: query.id,
        },
      });

      if (!chatt) {
        return res.sendData(404, "Data tidak ditemukan");
      }

      await Model.Chatt.destroy({
        where: {
          id: query.id,
        },
      });

      return res.sendData(200, "success", {});
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  get: async (req, res) => {
    try {
      const query = req.query;
      const pagination = new Pagination(query, Model.Chatt);

      const chatt = await Model.Chatt.findAndCountAll({
        ...pagination.getPagination(),
        distinct: true,
        where: {
          ...pagination.getSearch(),
          receiverID: req.account.id,
        },
        include: [
          {
            model: Model.User,
            as: "sender",
            required: false,
          },
          {
            model: Model.User,
            as: "receive",
            required: false,
          },
        ],
      });

      return res.sendData(200, "success", {
        ...chatt,
        page: pagination.getPagination().offset + 1,
        limit: pagination.getPagination().limit,
      });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
};
