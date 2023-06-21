const moment = require("moment");

module.exports = (prefix, number) => {
  number = number + 1;
  return prefix + "-" + moment().format("YYYYMMDD") + "." + number;
};
