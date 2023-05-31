const { Op } = require("sequelize");

class Pagination {
  constructor(query, model) {
    this.query = query;
    this.model = model;
  }

  getPagination() {
    return {
      offset: this.query.page ? parseInt(this.query.page) : 0,
      limit: this.query.limit ? parseInt(this.query.limit) : 10,
    };
  }

  getAttributes() {
    return Object.keys(this.model.getAttributes());
  }

  getSearch() {
    let search = this.getAttributes().map((attr) => {
      return {
        [attr]: {
          [Op.like]: "%" + this.query.search + "%",
        },
      };
    });

    return this.query.search && this.query.search != ""
      ? { [Op.or]: search }
      : {};
  }
}

module.exports = Pagination;
