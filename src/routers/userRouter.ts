import { Router } from "express";
import { singUp,singIn,createAddress } from "../controllers/userControler.js";
import validateSchema from "../middlewares/validatorSchema.js";
import addressSchema from "../schemas/addressSchema.js";
import userSchema from "../schemas/userSchema.js";
import loginSchema from "../schemas/loginSchema.js";

const userRouter = Router();

userRouter.post("/signup",validateSchema(userSchema), singUp);
userRouter.post("/signin",validateSchema(loginSchema), singIn);
userRouter.post("/address",validateSchema(addressSchema), createAddress);

export default userRouter;