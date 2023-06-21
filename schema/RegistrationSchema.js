const Joi = require("joi");

const RegistrationSchema = Joi.object({
  doctorID: Joi.string().min(1),
  patientID: Joi.string().min(1),
});

module.exports = RegistrationSchema;
