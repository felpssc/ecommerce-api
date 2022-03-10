import joi from "joi";

const updateAddressSchema = joi.object({
  street: joi.string(),
  district: joi.string(),
  number: joi.string(),
  cep: joi.string().min(8).max(8),
});

export { updateAddressSchema };
