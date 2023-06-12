const Joi = require("joi");

const BookingSchema = Joi.object({
  doctorID: Joi.string().min(1),
  date: Joi.string().min(1),
});

module.exports = BookingSchema;
