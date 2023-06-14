const SHA256 = require("crypto-js/sha256");

const generateToken = (username, password) => {
  let encrypt = SHA256(username);

  return (
    "$" + new Date().getTime() + encrypt + new Date().getTime() + password + "="
  );
};

module.exports = generateToken;
