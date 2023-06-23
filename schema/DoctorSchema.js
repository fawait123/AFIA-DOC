const Joi = require("joi");

const DoctorSchema = Joi.object({
  name: Joi.string().min(1),
  initialDegree: Joi.string().min(1),
  finalDegree: Joi.string().min(1),
  gender: Joi.string().min(1),
  religion: Joi.string().min(1),
  email: Joi.string().min(1).email(),
  phone: Joi.string().min(1),
  birthdate: Joi.string().min(1),
  placebirth: Joi.string().min(1),
  provinceID: Joi.string().min(1),
  districtID: Joi.string().min(1),
  subdistrictID: Joi.string().min(1),
  villageID: Joi.string().min(1),
  type: Joi.string().min(1),
  rtrw: Joi.string().min(1),
  NIK: Joi.string().min(1).max(16),
  NIP: Joi.string().min(4),
  company_provinceID: Joi.string().min(1),
  company_districtID: Joi.string().min(1),
  company_subdistrictID: Joi.string().min(1),
  company_villageID: Joi.string().min(1),
  company_type: Joi.string().min(1),
  company_name: Joi.string().min(1),
  company_optional: Joi.string(),
});

module.exports = DoctorSchema;
