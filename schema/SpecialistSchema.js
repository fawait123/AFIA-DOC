const Joi = require("joi");

const SpecialistSchema = Joi.object({
  name: Joi.string().min(5),
});

module.exports = SpecialistSchema;
