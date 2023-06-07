const DoctorSchema = require("../../schema/DoctorSchema");
const Pagination = require("../../utils/pagination");
const { removeFile } = require("../../utils/upload");
const Model = require("./../../models");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  get: async (req, res) => {
    try {
      const query = req.query;
      const pagination = new Pagination(query, Model.Doctor);

      let where = {};

      if (query.doctorID) {
        where.doctorID = query.doctorID;
      }

      const doctor = await Model.Doctor.findAndCountAll({
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
          {
            model: Model.Specialist,
            as: "specialist",
            required: false,
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

      const file = req.file;

      const { error, value } = DoctorSchema.validate({ ...body });
      if (error) {
        removeFile(file);
        return res.sendData(400, error);
      }

      const check = await Model.Doctor.findOne({
        where: {
          NIK: body.NIK,
        },
      });

      if (check) {
        removeFile(file);
        return res.sendData(400, "Data dokter telah terdaftar");
      }

      const doctor = await Model.Doctor.create({
        ...body,
        id: uuidv4(),
        photos: file.filename,
      });

      const address = await Model.Address.create({
        id: uuidv4(),
        parentID: doctor.id,
        provinceID: body.provinceID,
        districtID: body.districtID,
        subdistrictID: body.subdistrictID,
        villageID: body.villageID,
        rtrw: body.rtrw,
        type: body.type,
      });

      return res.sendData(200, "success", { doctor, address });
    } catch (error) {
      removeFile(req.file);
      return res.sendData(500, error.message);
    }
  },
  put: async (req, res) => {
    try {
      const query = req.query;
      const body = req.body;

      const { error, value } = DoctorSchema.validate({ ...body, ...query });

      if (error) {
        return res.sendData(400, error.message);
      }

      const doctor = await Model.Doctor.findByPk(query.doctorID);

      if (!doctor) {
        return res.sendData(404, "Data tidak ditemukan");
      }

      await doctor.update({
        ...body,
      });

      return res.sendData(200, "success", doctor);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  delete: async (req, res) => {
    try {
      const query = req.query;

      const doctor = await Model.Doctor.findByPk(query.doctorID);

      if (!doctor) {
        return res.sendData(404, "Data tidak ditemukan");
      }

      await doctor.destroy();

      return res.sendData(200, "success", doctor);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
};
