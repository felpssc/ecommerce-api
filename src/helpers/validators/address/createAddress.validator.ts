import joi from "joi";

const createAddressSchema = joi.object({
  street: joi.string().required(),
  district: joi.string().required(),
  number: joi.string().required(),
  cep: joi.string().min(8).max(8).required(),
});

export { createAddressSchema };
