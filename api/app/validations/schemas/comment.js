const Joi = require("joi");

const schema = Joi.object({
  content: Joi.string().min(3).max(280).required(),
  author_id: Joi.number(),
});

module.exports = schema;
