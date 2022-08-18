import joi from 'joi';
const productSchema = joi.object({
  name: joi.string().required(),
  image:joi
  .string()
  .pattern(/^[a-zA-Z0-9-_]+[:./\\]+([a-zA-Z0-9 -_./:=&"'?%+@#$!])+$/)
  .required(),
  description: joi.string().required(),
  categoryId: joi.number().required(),
  amount: joi.number().required(),
  price: joi.number().precision(2).required()//FLOAT
});

export default productSchema;