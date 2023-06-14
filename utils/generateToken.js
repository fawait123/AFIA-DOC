const sha256 = require("js-sha256");

const generateToken = (username, password) => {
  const hash = sha256.create();

  hash.update(password);

  return (
    "$" +
    new Date().getTime() +
    hash.hex() +
    new Date().getTime() +
    password +
    "="
  );
};

module.exports = generateToken;
