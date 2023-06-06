const SpecialistSchema = require("../../schema/SpecialistSchema");
const Pagination = require("../../utils/pagination");
const { removeFile } = require("../../utils/upload");
const Model = require("./../../models");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  get: async (req, res) => {
    try {
      const query = req.query;
      const pagination = new Pagination(query, Model.Doctor);

      let where = {};

      if (query.id) {
        where.id = query.id;
      }

      const doctor = await Model.Specialist.findAndCountAll({
        ...pagination.getPagination(),
        distinct: true,
        where: {
          ...pagination.getSearch(),
          ...where,
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
  post: async (req, res) => {
    try {
      const body = req.body;

      const { error, value } = SpecialistSchema.validate({ ...body });

      if (error) {
        return res.sendData(400, error.message);
      }

      const specialist = await Model.Specialist.create({
        name: body.name,
        id: uuidv4(),
      });

      return res.sendData(200, "success", specialist);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  put: async (req, res) => {
    try {
      const query = req.query;
      const body = req.body;

      const { error, value } = SpecialistSchema.validate({ ...body });

      if (error) {
        return res.sendData(400, error.message);
      }

      const specialist = await Model.Specialist.findOne({
        where: {
          id: query.id,
        },
      });

      if (!specialist) {
        return res.sendData(404, "Data tidak ditemukan");
      }

      await Model.Specialist.update(
        {
          name: body.name,
        },
        {
          id: query.id,
        }
      );

      return res.sendData(200, "success", specialist);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  delete: async (req, res) => {
    try {
      const query = req.query;

      const specialist = await Model.Specialist.findOne({
        where: {
          id: query.id,
        },
      });

      if (!specialist) {
        return res.sendData(404, "Data tidak ditemukan");
      }

      await Model.Specialist.destroy({
        where: {
          id: query.id,
        },
      });

      return res.sendData(200, "success", specialist);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
};
