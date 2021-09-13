const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(50),
  description: Joi.string().min(3).max(280),
  geog: Joi.array().items(Joi.number()),
  date: Joi.date(),
  max_participants: Joi.number(),
  is_published: Joi.boolean(),
  image_url: Joi.string(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  author_id: Joi.number()
});

module.exports = schema;
