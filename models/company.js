"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.belongsTo(models.Regionals, {
        foreignKey: "provinceID",
        as: "province",
      });

      Company.belongsTo(models.Regionals, {
        foreignKey: "districtID",
        as: "district",
      });

      Company.belongsTo(models.Regionals, {
        foreignKey: "subdistrictID",
        as: "subdistrict",
      });

      Company.belongsTo(models.Regionals, {
        foreignKey: "villageID",
        as: "village",
      });
    }
  }
  Company.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: {
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
      optional: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM(["umum", "pribadi"]),
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
      modelName: "Company",
      tableName: "companies",
    }
  );
  return Company;
};
