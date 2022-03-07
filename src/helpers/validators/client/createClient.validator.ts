import joi from "joi";

const createClientSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  phone: joi
    .string()
    .pattern(/^\d{11}$/)
    .required(),
  address: joi.object({
    street: joi.string().required(),
    district: joi.string().required(),
    number: joi.string().required(),
    cep: joi.string().min(8).max(8).required(),
  }),
});

export { createClientSchema };
