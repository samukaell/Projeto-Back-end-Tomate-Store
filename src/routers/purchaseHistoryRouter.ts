import { Router } from "express";
import {createPurchaseHistory,getPurchaseHistory} from "../controllers/purchaseHistoryController.js"
import tokenValidator from "../middlewares/tokenValidator.js";
import validateSchema from "../middlewares/validatorSchema.js";
import purchaseHistory from "../schemas/purchaseHistorySchema.js";

const purchaseHistoryRouter = Router();

purchaseHistoryRouter.post("/buy/:id",validateSchema(purchaseHistory), tokenValidator, createPurchaseHistory);
purchaseHistoryRouter.get("/historic", tokenValidator, getPurchaseHistory);
export default purchaseHistoryRouter;