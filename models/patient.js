"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasMany(models.Address, {
        foreignKey: "parentID",
        as: "addresses",
      });
    }
  }
  Patient.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      NIK: {
        type: DataTypes.STRING,
      },
      userID: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      religion: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      birthdate: {
        type: DataTypes.STRING,
      },
      placebirth: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Patient",
      paranoid: true,
      tableName: "patients",
    }
  );
  return Patient;
};
