const Joi = require("joi");

const schema = Joi.object({
  firstname: Joi.string().min(2).max(50),

  lastname: Joi.string().min(2).max(50),

  username: Joi.string().alphanum().min(2).max(50),

  email: Joi.string(),

  password: Joi.string(),

  password_confirmation: Joi.valid(Joi.ref("password")),

  avatar_url: Joi.string(),

  bio: Joi.string().min(2).max(500),

  city: Joi.string().min(2).max(50),

  zipcode: [Joi.string(), Joi.number()],

  created_at: Joi.date(),
  updated_at: Joi.date(),

  token: [Joi.string(), Joi.number()],
})


module.exports = schema;
