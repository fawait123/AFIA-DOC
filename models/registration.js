"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Registration.belongsTo(models.Patient, {
        foreignKey: "patientID",
        as: "patient",
      });

      Registration.belongsTo(models.Doctor, {
        foreignKey: "doctorID",
        as: "doctor",
      });
    }
  }
  Registration.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      userID: {
        type: DataTypes.STRING,
      },
      patientID: {
        type: DataTypes.STRING,
      },
      doctorID: {
        type: DataTypes.STRING,
      },
      registrationID: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      time: {
        type: DataTypes.TIME,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      modelName: "Registration",
      paranoid: true,
      tableName: "registrations",
    }
  );
  return Registration;
};
