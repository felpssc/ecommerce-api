import joi from "joi";

const UpdateClientSchema = joi.object({
  name: joi.string().min(3),
  password: joi.string().min(8),
  phone: joi.string().pattern(/^\d{11}$/),
});

export { UpdateClientSchema };
