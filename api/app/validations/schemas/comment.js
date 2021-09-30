const Joi = require("joi");

const schema = Joi.object({
  content: Joi.string().required(),
  author_id: Joi.number(),
});

module.exports = schema;
