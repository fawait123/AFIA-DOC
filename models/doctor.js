"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.hasMany(models.Address, {
        foreignKey: "parentID",
        as: "addresses",
      });
    }
  }
  Doctor.init(
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
      NIP: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      initialDegree: {
        type: DataTypes.STRING,
      },
      finalDegree: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      religion: {
        type: DataTypes.ENUM([
          "Islam",
          "Kristen",
          "Buddha",
          "Katholik",
          "Konghucu",
        ]),
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      photos: {
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
      modelName: "Doctor",
      paranoid: true,
    }
  );
  return Doctor;
};
