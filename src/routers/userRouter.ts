import { Router } from "express";
import { singUp,singIn,createAddress,returnUser } from "../controllers/userControler.js";
import validateSchema from "../middlewares/validatorSchema.js";
import addressSchema from "../schemas/addressSchema.js";
import userSchema from "../schemas/userSchema.js";
import loginSchema from "../schemas/loginSchema.js";
import getUserSchema from "../schemas/getUserSchema.js";

const userRouter = Router();

userRouter.post("/signup",validateSchema(userSchema), singUp);
userRouter.post("/signin",validateSchema(loginSchema), singIn);
userRouter.post("/user",validateSchema(getUserSchema), returnUser);
userRouter.post("/address",validateSchema(addressSchema), createAddress);

export default userRouter;