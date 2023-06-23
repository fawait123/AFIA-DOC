"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("companies", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      provinceID: {
        type: Sequelize.STRING,
      },
      districtID: {
        type: Sequelize.STRING,
      },
      subdistrictID: {
        type: Sequelize.STRING,
      },
      villageID: {
        type: Sequelize.STRING,
      },
      optional: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM(["umum", "pribadi"]),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Clinics");
  },
};
