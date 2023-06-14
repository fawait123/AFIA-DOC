const BookingSchema = require("../../schema/BookingSchema");
const Pagination = require("../../utils/pagination");
const Model = require("./../../models");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  get: async (req, res) => {
    try {
      const query = req.query;

      const pagination = new Pagination(query, Model.Booking);

      const booking = await Model.Booking.findAll({
        where: {
          ...pagination.getSearch(),
          userID: req.account.id,
        },
        include: [
          {
            model: Model.User,
            as: "user",
            required: false,
          },
          {
            model: Model.Doctor,
            as: "doctor",
            required: false,
          },
        ],
      });
      return res.sendData(200, "success", booking);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  post: async (req, res) => {
    try {
      const body = req.body;

      const { error, value } = BookingSchema.validate({ ...body });

      if (error) {
        return res.sendData(400, error.message);
      }

      let booking = await Model.Booking.create({
        id: uuidv4(),
        date: body.date,
        doctorID: body.doctorID,
        userID: req.account.id,
        status: "proccess",
      });

      return res.sendData(200, "success", booking);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  put: async (req, res) => {
    try {
      const body = req.body;
      const query = req.query;

      const booking = await Model.Booking.findOne({
        where: {
          id: query.id,
        },
      });

      if (!booking) {
        return res.sendData(404, "Data tidak ditemukan");
      }

      await Model.Booking.update(
        {
          date: body.date,
          status: "reschedule",
        },
        {
          where: {
            id: query.id,
          },
        }
      );
      return res.sendData(200, "success", booking);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
  done: async (req, res) => {
    try {
      const body = req.body;
      const query = req.query;

      const booking = await Model.Booking.findOne({
        where: {
          id: query.id,
        },
      });

      if (!booking) {
        return res.sendData(404, "Data tidak ditemukan");
      }

      await Model.Booking.update(
        {
          status: "done",
        },
        {
          where: {
            id: query.id,
          },
        }
      );
      return res.sendData(200, "success", booking);
    } catch (error) {
      return res.sendData(500, error.message);
    }
  },
};
