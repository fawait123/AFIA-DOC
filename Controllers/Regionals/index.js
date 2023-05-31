const fs = require("fs");
const path = require("path");
const Model = require("./../../models");
const { v4: uuidv4 } = require("uuid");

const importProvince = async () => {
  let province = fs.readFileSync("./regionals/provinces.csv", "utf8");
  province = province.split("\n");
  province = province.map((el) => {
    let split = el.split(",");
    return {
      id: uuidv4(),
      code: split[0],
      name: split[1],
      type: "province",
    };
  });

  await Model.Regionals.bulkCreate(province);
};

const importDistrict = async () => {
  let district = fs.readFileSync("./regionals/regencies.csv", "utf8");
  district = district.split("\n");
  district = district.map((el) => {
    let split = el.split(",");
    return {
      id: uuidv4(),
      code: split[0],
      parentID: split[1],
      name: split[2],
      type: "district",
    };
  });

  await Model.Regionals.bulkCreate(district);
};

const importSubDistrict = async () => {
  let subdistrict = fs.readFileSync("./regionals/districts.csv", "utf8");
  subdistrict = subdistrict.split("\n");
  subdistrict = subdistrict.map((el) => {
    let split = el.split(",");
    return {
      id: uuidv4(),
      code: split[0],
      parentID: split[1],
      name: split[2],
      type: "subdistrict",
    };
  });

  await Model.Regionals.bulkCreate(subdistrict);
};

const importVillage = async () => {
  let village = fs.readFileSync("./regionals/villages.csv", "utf8");
  village = village.split("\n");
  village = village.map((el) => {
    let split = el.split(",");
    return {
      id: uuidv4(),
      code: split[0],
      parentID: split[1],
      name: split[2],
      type: "village",
    };
  });

  await Model.Regionals.bulkCreate(village);
};

module.exports = {
  push: async (req, res) => {
    try {
      const query = req.query;

      if (query.type == "province") {
        await importProvince();
      } else if (query.type == "district") {
        await importDistrict();
      } else if (query.type == "subdistrict") {
        await importSubDistrict();
      } else if (query.type == "village") {
        await importVillage();
      }

      return res.sendData(200, "success", {});
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  get: async (req, res) => {
    try {
      const query = req.query;

      let dataWhere = {};
      if (query.type == "province") {
        dataWhere.type = query.type;
      }

      if (query.parentID) {
        dataWhere.parentID = query.parentID;
      }

      const regionals = await Model.Regionals.findAll({
        where: {
          ...dataWhere,
        },
      });

      return res.sendData(200, "success", regionals);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
};
