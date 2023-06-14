const jwt = require("jsonwebtoken");
const fs = require("fs");

// const privateKey = fs.readFileSync("./private.key", "utf-8");
const JWT = {
  login: (user) => {
    const signOptions = {
      issuer: process.env.JWT_ISSUER || "PDIP",
      expiresIn: "12h",
      algorithm: "RS256",
    };
    const privateKey = fs.readFileSync("./private.key", "utf8");
    const token = jwt.sign({ user }, privateKey, signOptions);

    return token;
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
