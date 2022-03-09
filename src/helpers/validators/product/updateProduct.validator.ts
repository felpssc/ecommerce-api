import joi from "joi";

const updateProductSchema = joi.object().keys({
  name: joi.string(),
  price: joi.number().positive().precision(2).min(0.01),
  characteristics: joi.string(),
  code: joi.string(),
});

export { updateProductSchema };
