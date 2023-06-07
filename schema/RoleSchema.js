const Joi = require("joi");

const RoleSchema = Joi.object({
  name: Joi.string().min(1),
  display_name: Joi.string().min(1),
});

module.exports = RoleSchema;
