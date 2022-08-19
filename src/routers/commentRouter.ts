import { Router } from "express";
import {addComment,getComment} from "../controllers/commentController.js"
import tokenValidator from "../middlewares/tokenValidator.js";
import validateSchema from "../middlewares/validatorSchema.js";
import commentSchema from "../schemas/commentSchema.js";

const commentRouter = Router();

commentRouter.post("/comment/:id",validateSchema(commentSchema), tokenValidator, addComment);
commentRouter.get("/comment/:id",getComment);//buscar comentarios de um produto

export default commentRouter;