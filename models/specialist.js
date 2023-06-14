"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specialist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Specialist.hasMany(models.Doctor, {
        foreignKey: "specialistID",
        as: "doctors",
      });
    }
  }
  Specialist.init(
    {
      name: DataTypes.STRING,
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Specialist",
      paranoid: true,
      tableName: "specialists",
    }
  );
  return Specialist;
};
