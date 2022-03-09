import joi from "joi";

const updateOrderSchema = joi.object().keys({
  status: joi.valid("pending", "delivered").required(),
});

export { updateOrderSchema };
