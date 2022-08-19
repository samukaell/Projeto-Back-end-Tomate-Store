import { Router } from "express";
import {addProduct,createCategory,getAllProduct,getProductId} from "../controllers/productController.js"
import tokenValidator from "../middlewares/tokenValidator.js";
import validateSchema from "../middlewares/validatorSchema.js";
import categorySchema from "../schemas/categorySchema.js";
import productSchema from "../schemas/productSchema.js";
const productRouter = Router();

productRouter.post("/addproduct",validateSchema(productSchema), tokenValidator, addProduct);
productRouter.post("/addcategory",validateSchema(categorySchema),  createCategory);
productRouter.get("/product", getAllProduct);
productRouter.get("/product/:id", getProductId);

export default productRouter;