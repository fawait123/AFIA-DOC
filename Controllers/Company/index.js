const CompanySchema = require("../../schema/CompanySchema");
const Pagination = require("../../utils/pagination");
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

      const Company = await Model.Company.findAndCountAll({
        ...pagination.getPagination(),
        distinct: true,
        where: {
          ...pagination.getSearch(),
          ...where,
        },
        include: [
          {
            model: Model.Regionals,
            as: "province",
            required: false,
          },
          {
            model: Model.Regionals,
            as: "district",
            required: false,
          },
          {
            model: Model.Regionals,
            as: "subdistrict",
            required: false,
          },
          {
            model: Model.Regionals,
            as: "village",
            required: false,
          },
        ],
      });

      return res.sendData(200, "success", {
        ...Company,
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
      const { error, value } = CompanySchema.validate({ ...body });

      if (error) {
        return res.sendData(400, error.message);
      }

      const company = await Model.Company.create({
        ...body,
        id: uuidv4(),
      });

      return res.sendData(200, "success", company);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  put: async (req, res) => {
    try {
      const body = req.body;
      const query = req.query;
      const { error, value } = CompanySchema.validate({ ...body });

      if (error) {
        return res.sendData(400, error.message);
      }

      const check = await Model.Company.findOne({
        where: {
          id: query.id,
        },
      });

      if (!check) {
        return res.sendData(404, "Data tidak ditemukan");
      }

      const company = await Model.Company.update(
        {
          ...body,
        },
        {
          where: {
            id: check.id,
          },
        }
      );

      return res.sendData(200, "success", company);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  delete: async (req, res) => {
    try {
      const query = req.query;

      const company = await Model.Company.findOne({
        where: {
          id: query.id,
        },
      });

      if (!company) {
        return res.sendData(404, "Data tidak ditemukan");
      }

      await Model.Company.destroy({
        where: {
          id: query.id,
        },
      });

      return res.sendData(200, "success", company);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  getDoctor: async (req, res) => {
    try {
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
};
