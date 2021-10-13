const { string } = require("joi");
const Joi = require("joi");

const userSchema = Joi.object({
  userName: Joi.string().alphanum().min(4).max(50).required(),
  phoneNumber: Joi.number(),
});
