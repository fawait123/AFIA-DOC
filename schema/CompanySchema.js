const Joi = require("joi");

const CompanySchema = Joi.object({
  provinceID: Joi.string().min(1),
  districtID: Joi.string().min(1),
  subdistrictID: Joi.string().min(1),
  villageID: Joi.string().min(1),
  name: Joi.string().min(1),
  type: Joi.string().min(1),
  optional: Joi.string(),
});

module.exports = CompanySchema;
