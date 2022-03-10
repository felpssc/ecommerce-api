import joi from "joi";

const createClientSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  phone: joi
    .string()
    .pattern(/^\d{11}$/)
    .required(),
});

export { createClientSchema };
