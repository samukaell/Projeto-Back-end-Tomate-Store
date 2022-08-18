import joi from 'joi';
import { CreateUserData } from '../services/userService';

const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
  name: joi.string().required(),
  image:joi
  .string()
  .pattern(/^[a-zA-Z0-9-_]+[:./\\]+([a-zA-Z0-9 -_./:=&"'?%+@#$!])+$/)
  .required(),
  addressId: joi.number()
});

export default userSchema;