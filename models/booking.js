"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: "userID",
        as: "user",
      });

      Booking.belongsTo(models.Doctor, {
        foreignKey: "doctorID",
        as: "doctor",
      });
    }
  }
  Booking.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      userID: {
        type: DataTypes.STRING,
      },
      doctorID: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM(["proccess", "done", "reschedule"]),
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
      modelName: "Booking",
      tableName: "bookings",
    }
  );
  return Booking;
};
