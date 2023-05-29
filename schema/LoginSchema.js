const Joi = require("joi");

const LoginSchema = Joi.object({
  username: Joi.string().min(5),
  password: Joi.string().min(8),
  email: Joi.string().min(5).email(),
  name: Joi.string().min(5),
});

module.exports = LoginSchema;
