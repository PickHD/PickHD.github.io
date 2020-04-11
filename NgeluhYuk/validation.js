//!IMPORT VALIDATION
const Joi = require("@hapi/joi");

//!Register validation
const registerValidation = (data) => {
  //create schema joi object
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    username: Joi.string().min(6).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(9).required(),
  }); //return data
  return schema.validate(data);
};

//!Login validation
const loginValidation = (data) => {
  //!create schema joi object
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }); //return data
  return schema.validate(data);
};

//!exports function
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
