const RoleSchema = require("../../schema/RoleSchema");
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

      const Role = await Model.Role.findAndCountAll({
        ...pagination.getPagination(),
        distinct: true,
        where: {
          ...pagination.getSearch(),
          ...where,
        },
        include: [
          {
            model: Model.RoleAccess,
            as: "roleaccesses",
            required: false,
            include: [
              {
                model: Model.Access,
                as: "access",
                required: false,
              },
            ],
          },
        ],
      });

      return res.sendData(200, "success", {
        ...Role,
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

      const { error, value } = RoleSchema.validate({ ...body });

      if (error) {
        return res.sendData(400, error.message);
      }

      const role = await Model.Role.create({ id: uuidv4(), ...body });

      return res.sendData(200, "success", role);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  put: async (req, res) => {
    try {
      const body = req.body;
      const query = req.query;

      const { error, value } = RoleSchema.validate({ ...body });

      if (error) {
        return res.sendData(400, error.message);
      }

      const role = await Model.Role.findOne({
        where: {
          id: query.id,
        },
      });

      if (!role) {
        return res.sendData(404, "Data tidak ditemukan");
      }
      await Model.Role.update(
        { ...body },
        {
          where: {
            id: query.id,
          },
        }
      );

      return res.sendData(200, "success", role);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  delete: async (req, res) => {
    try {
      const query = req.query;
      const role = await Model.Role.findOne({
        where: {
          id: query.id,
        },
      });

      if (!role) {
        return res.sendData(404, "Data tidak ditemukan");
      }

      await Model.Role.destroy({
        where: {
          id: query.id,
        },
      });

      return res.sendData(200, "success", {});
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  group: async (req, res) => {
    try {
      const body = req.body;

      let roleaccess = await Model.RoleAccess.findOne({
        where: {
          roleID: body.roleID,
          accessID: body.accessID,
        },
      });

      if (!roleaccess) {
        roleaccess = await Model.RoleAccess.create({
          roleID: body.roleID,
          accessID: body.accessID,
          id: uuidv4(),
        });
      }

      return res.sendData(200, "success", roleaccess);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
};
