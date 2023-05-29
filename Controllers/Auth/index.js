const sha256 = require("js-sha256");
const { v4: uuidv4 } = require("uuid");
const Model = require("./../../models");
const LoginSchema = require("../../schema/LoginSchema");
const JWT = require("../../utils/jwt");

const Auth = {
  register: async (req, res) => {
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
      }).then((response) => {
        return res.sendData(200, "success", response);
      });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  login: async (req, res) => {
    try {
      const body = req.body;

      const hash = sha256.create();

      hash.update(body.password);

      const user = await Model.User.findOne({
        where: {
          username: body.username,
        },
      });

      if (!user) {
        return res.sendData(404, "Username atau password tidak ditemukan");
      }

      const hashPassword = "$" + hash.hex();
      if (hashPassword != user.password) {
        return res.sendData(404, "Username atau password tidak ditemukan");
      }

      let token = JWT.login(user);

      delete user.dataValues.password;

      return res.sendData(200, "success", { token, user });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
};

module.exports = Auth;
