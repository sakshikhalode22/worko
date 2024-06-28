const Joi = require('joi');

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  name: Joi.string(),
  age: Joi.number(),
  city: Joi.string(),
  zipCode: Joi.string().length(6).pattern(/^[0-9]+$/),
  password: Joi.string().required(),
  id: Joi.string(), 
  deletedAt: Joi.date().allow(null)
});


exports.validateCreateUser = (userData) => {
  return userSchema.validateAsync(userData);
}

exports.validateUpdateUser = (userData) => {
  return userSchema.validateAsync(userData);
}

exports.validateId = (id) => {
  const idSchema = Joi.string();
  return idSchema.validateAsync(id);
}