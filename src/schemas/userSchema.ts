import joi from 'joi';
import { CreateUserData } from '../services/userService';

const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
  addressId: joi.number()
});

export default userSchema;