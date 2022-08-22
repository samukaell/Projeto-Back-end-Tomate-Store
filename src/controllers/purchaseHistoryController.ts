import { Request, Response } from "express";
import * as purchaseHistoryService from '../services/purchaseHistoryService.js'

export async function createPurchaseHistory(req: Request, res: Response) {
    const purchase = req.body;
    const {id} = req.params;
    const productId = parseInt(id)
    
    const userId = res.locals.user.id;
    await purchaseHistoryService.purchaseHistory(
        purchase.amount,
        productId,
        userId
    )
    res.sendStatus(200);
}

export async function getPurchaseHistory(req: Request, res: Response) {
    const userId = res.locals.user.id
    const purchaseHistory = await purchaseHistoryService.getPurchaseHistory(userId);
    res.send(purchaseHistory);
}