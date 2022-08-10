import { Router } from "express";
import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import commentRouter from "./commentRouter.js";
import purchaseHistoryRouter from "./purchaseHistoryRouter.js";

const router = Router();
router.use(userRouter);
router.use(productRouter);
router.use(commentRouter);
router.use(purchaseHistoryRouter);

export default router;