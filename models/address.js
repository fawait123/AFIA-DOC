"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      parentID: {
        type: DataTypes.STRING,
      },
      provinceID: {
        type: DataTypes.STRING,
      },
      districtID: {
        type: DataTypes.STRING,
      },
      subdistrictID: {
        type: DataTypes.STRING,
      },
      villageID: {
        type: DataTypes.STRING,
      },
      rtrw: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM(["Domisili", "KTP"]),
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
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Address",
      paranoid: true,
    }
  );
  return Address;
};
