const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("./private.key", "utf-8");
const JWT = {
  login: (user) => {
    return jwt.sign(
      {
        data: user,
      },
      privateKey,
      { algorithm: "RS256", expiresIn: "1h", issuer: "AFIA DOC" }
    );
  },
  verify: (token) => {
    return jwt.verify(token, privateKey);
  },
};

module.exports = JWT;
