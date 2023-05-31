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

      await user.update({
        token: token,
      });

      delete user.dataValues.password;
      delete user.dataValues.token;

      return res.sendData(200, "success", { token, user });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  logout: async (req, res) => {
    try {
      let authorization = req.headers.authorization;
      if (!authorization) {
        return res.sendData(401, "Anauthenticate");
      }

      let token = authorization.split(" ")[1];

      await JWT.verify(token)
        .then(async (decode) => {
          let user = await Model.User.findOne({
            where: {
              id: decode.data.id,
            },
          });

          if (!user) {
            return res.sendData(401, "Anauthorize");
          }

          await user
            .update({
              token: null,
            })
            .then((result) => {
              return res.sendData(200, "Logout successfully");
            });
        })
        .catch((err) => {
          return res.sendData(401, err.message);
        });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
};

module.exports = Auth;
