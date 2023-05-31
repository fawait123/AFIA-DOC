"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Addresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      parentID: {
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
      rtrw: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM(["Domisili", "KTP"]),
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
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Addresses");
  },
};
