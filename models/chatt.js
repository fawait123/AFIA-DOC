"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chatt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chatt.belongsTo(models.User, {
        foreignKey: "senderID",
        as: "sender",
      });
      Chatt.belongsTo(models.User, {
        foreignKey: "receiverID",
        as: "receive",
      });
    }
  }
  Chatt.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      message: {
        type: DataTypes.TEXT,
      },
      senderID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      receiverID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
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
      modelName: "Chatt",
      tableName: "chatts",
      paranoid: true,
    }
  );
  return Chatt;
};
