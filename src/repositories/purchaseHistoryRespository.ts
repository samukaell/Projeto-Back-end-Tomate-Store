import {prisma}  from "../database.js"
import { CreatePurchaseData } from "../services/purchaseHistoryService.js"

async function createPurchaseHistory(purchase: CreatePurchaseData) {
    await prisma.purchaseHistory.create({
        data:purchase
    })
}


export {
    createPurchaseHistory
}