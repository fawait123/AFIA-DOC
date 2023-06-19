const Joi = require("joi");

const ChattSchema = Joi.object({
  senderID: Joi.string().min(1),
  receiverID: Joi.string().min(1),
  message: Joi.string().min(1),
});

module.exports = ChattSchema;
