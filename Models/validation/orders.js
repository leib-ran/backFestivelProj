const Joi = require("joi");

const orderSchema = Joi.object({
  firstName: Joi.string().required().min(2).max(50).trim().messages({
    "string.empty": '"firstName" The field is required',
    "string.min": '"firstName" the field require minimum of 2 charcter',
    "string.max": '"firstName" Please enter maximum 50 characters',
  }),
  lastName: Joi.string().required().min(2).max(50).trim().messages({
    "string.empty": '"lastName" The field is required',
    "string.min": '"lastName" the field require minimum of 2 charcter',
    "string.max": '"lastName" Please enter maximum 50 characters',
  }),
  streetName: Joi.string().required().min(2).max(200).trim().messages({
    "string.empty": '"streetName" The field is required',
    "string.min": '"streetName" the field require minimum of 2 charcters',
    "string.max": '"streetName" Please enter maximum 200 characters',
  }),

  houseNumber: Joi.number().required().messages({
    "string.empty": '"houseNumber" The field is required',
  }),
  city: Joi.string().required().min(2).max(200).trim().messages({
    "string.empty": '"streetName" The field is required',
    "string.min": '"streetName" the field require minimum of 2 charcters',
    "string.max": '"streetName" Please enter maximum 200 characters',
  }),
  note: Joi.string().required().min(2).max(200).trim().messages({
    "string.empty": '"streetName" The field is required',
    "string.min": '"streetName" the field require minimum of 2 charcters',
    "string.max": '"streetName" Please enter maximum 200 characters',
  }),
});

module.exports = orderSchema;
