import joi from "joi";

const createProductSchema = joi.object().keys({
  name: joi.string().required(),
  price: joi.number().required().positive().precision(2).min(0.01),
  characteristics: joi.string().required(),
  code: joi.string().required(),
});

export { createProductSchema };
