const RegistrationSchema = require("../../schema/RegistrationSchema");
const Model = require("./../../models");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const autoGenerate = require("../../utils/autoGenerate");

module.exports = {
  get: async (req, res) => {
    try {
      const query = req.query;

      const registration = await Model.Registration.findAll({
        where: {
          userID: req.account.id,
        },
        include: [
          {
            model: Model.Patient,
            as: "patient",
            required: false,
          },
          {
            model: Model.Doctor,
            as: "doctor",
            required: false,
          },
        ],
      });

      return res.sendData(200, "success", registration);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  post: async (req, res) => {
    try {
      const body = req.body;

      const { error, value } = RegistrationSchema.validate({ ...body });

      if (error) {
        return res.sendData(400, error.message);
      }

      const check = await Model.Registration.findOne({
        where: {
          patientID: body.patientID,
          date: moment().format(),
        },
      });

      if (check) {
        return res.sendData(400, "Pasien sudah didaftarkan");
      }

      let number = await Model.Registration.count({
        where: {
          doctorID: body.doctorID,
          date: moment().format(),
        },
      });

      const registration = await Model.Registration.create({
        id: uuidv4(),
        patientID: body.patientID,
        doctorID: body.doctorID,
        date: moment().format(),
        time: moment().format("HH:mm:ss"),
        price: null,
        registrationID: autoGenerate("RGT", number),
        userID: req.account.id,
      });

      return res.sendData(200, "success", registration);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
};
