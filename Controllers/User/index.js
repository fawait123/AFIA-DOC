const LoginSchema = require("../../schema/LoginSchema");
const Pagination = require("../../utils/pagination");
const Model = require("./../../models");
const sha256 = require("js-sha256");
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

      const user = await Model.User.findAndCountAll({
        attributes: {
          exclude: ["token", "password"],
        },
        ...pagination.getPagination(),
        distinct: true,
        where: {
          ...pagination.getSearch(),
          ...where,
        },
        include: [
          {
            model: Model.Role,
            as: "role",
            required: false,
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
          },
        ],
      });

      return res.sendData(200, "success", {
        ...user,
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

      const { error, value } = LoginSchema.validate({ ...body });

      if (error) {
        return res.sendData(400, "validation errrors", error);
      }

      let hash = sha256.create();

      hash.update(body.password);

      const user = await Model.User.findOne({
        where: {
          username: body.username,
        },
      });

      if (user) {
        return res.sendData(400, "Akun sudah digunakan");
      }

      await Model.User.create({
        id: uuidv4(),
        username: body.username,
        password: "$" + hash.hex(),
        email: body.email,
        name: body.name,
        is_active: body.is_active,
      }).then((response) => {
        return res.sendData(200, "success", response);
      });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  put: async (req, res) => {
    try {
      const body = req.body;
      const query = req.query;

      const { error, value } = LoginSchema.validate({ ...body });

      if (error) {
        return res.sendData(400, "validation errrors", error);
      }

      const user = await Model.User.findOne({
        where: {
          username: query.id,
        },
      });

      if (!user) {
        return res.sendData(404, "Akun sudah digunakan");
      }

      await Model.User.update(
        {
          username: body.username,
          email: body.email,
          name: body.name,
          is_active: body.is_active,
        },
        {
          where: {
            id: query.id,
          },
        }
      ).then((response) => {
        return res.sendData(200, "success", response);
      });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  delete: async (req, res) => {
    try {
      const query = req.query;

      const user = await Model.User.findOne({
        where: {
          id: query.id,
        },
      });

      if (!user) {
        return res.sendData(404, "Data tidak ditemukan");
      }

      await Model.User.destroy({
        where: {
          id: query.id,
        },
      });

      return res.sendData(200, "success", {});
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  approve: async (req, res) => {
    try {
      const query = req.query;

      const user = await Model.User.findOne({
        where: {
          id: query.id,
        },
      });

      if (!user) {
        return res.sendData(404, "Data tidak ditemukan");
      }

      await Model.User.update(
        {
          is_active: !user.is_active,
        },
        {
          where: {
            id: query.id,
          },
        }
      );

      return res.sendData(200, "success", user);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
};
