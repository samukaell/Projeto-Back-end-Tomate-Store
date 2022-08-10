import { Router } from "express";
import {createPurchaseHistory} from "../controllers/purchaseHistoryController.js"
import tokenValidator from "../middlewares/tokenValidator.js";
import validateSchema from "../middlewares/validatorSchema.js";
import purchaseHistory from "../schemas/purchaseHistorySchema.js";

const purchaseHistoryRouter = Router();

purchaseHistoryRouter.post("/buy/:id",validateSchema(purchaseHistory), tokenValidator, createPurchaseHistory);

export default purchaseHistoryRouter;