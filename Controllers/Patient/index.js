const PatientSchema = require("../../schema/PatientScheema");
const Pagination = require("../../utils/pagination");
const Model = require("./../../models");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  get: async (req, res) => {
    try {
      const query = req.query;

      const pagination = new Pagination(query, Model.Doctor);

      let where = {
        userID: req.account.id,
      };

      if (query.id) {
        where.id = query.id;
      }

      const doctor = await Model.Patient.findAndCountAll({
        ...pagination.getPagination(),
        distinct: true,
        where: {
          ...pagination.getSearch(),
          ...where,
        },
        include: [
          {
            model: Model.Address,
            as: "addresses",
            required: false,
            include: [
              {
                model: Model.Regionals,
                as: "province",
                required: false,
              },
              {
                model: Model.Regionals,
                as: "district",
                required: false,
              },
              {
                model: Model.Regionals,
                as: "subdistrict",
                required: false,
              },
              {
                model: Model.Regionals,
                as: "village",
                required: false,
              },
            ],
          },
        ],
      });

      return res.sendData(200, "success", {
        ...doctor,
        page: pagination.getPagination().offset + 1,
        limit: pagination.getPagination().limit,
      });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  post: async (req, res) => {
    try {
      const body = req.body;

      const { error, value } = PatientSchema.validate({ ...body });

      if (error) {
        return res.sendData(400, error);
      }

      const check = await Model.Patient.findOne({
        where: {
          NIK: body.NIK,
        },
      });

      if (check) {
        return res.sendData(400, "Data pasien telah terdaftar");
      }

      const patient = await Model.Patient.create({
        ...body,
        id: uuidv4(),
        userID: req.account.id,
      });

      const address = await Model.Address.create({
        id: uuidv4(),
        parentID: patient.id,
        provinceID: body.provinceID,
        districtID: body.districtID,
        subdistrictID: body.subdistrictID,
        villageID: body.villageID,
        rtrw: body.rtrw,
        type: body.type,
      });

      return res.sendData(200, "success", { patient, address });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  put: async (req, res) => {
    try {
      const body = req.body;
      const query = req.query;

      const { error, value } = PatientSchema.validate({ ...body });

      if (error) {
        return res.sendData(400, error);
      }

      const check = await Model.Patient.findOne({
        where: {
          id: query.id,
        },
      });

      if (!check) {
        return res.sendData(404, "Data tidak ditemukan");
      }

      const patient = await Model.Patient.update(
        { ...body },
        {
          where: {
            id: query.id,
          },
        }
      );

      const address = await Model.Address.update(
        {
          provinceID: body.provinceID,
          districtID: body.districtID,
          subdistrictID: body.subdistrictID,
          villageID: body.villageID,
          rtrw: body.rtrw,
          type: body.type,
        },
        {
          where: {
            parentID: query.id,
          },
        }
      );

      return res.sendData(200, "success", { patient, address });
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  delete: async (req, res) => {
    try {
      const query = req.query;

      const patient = await Model.Patient.findOne({
        where: {
          id: query.id,
        },
      });

      if (!patient) {
        return res.sendData(404, "Data tidak ditemukan");
      }

      await Model.Patient.destroy({
        where: {
          id: query.id,
        },
      });

      return res.sendData(200, "success", patient);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
};
