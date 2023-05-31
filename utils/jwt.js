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
    return new Promise((resolve, reject) => {
      jwt.verify(token, privateKey, function (err, decoded) {
        if (err) reject(err);

        resolve(decoded);
      });
    });
  },
};

module.exports = JWT;
