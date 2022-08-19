import {prisma}  from "../database.js"
import { CreatePurchaseData } from "../services/purchaseHistoryService.js"

async function createPurchaseHistory(purchase: CreatePurchaseData) {
    await prisma.purchaseHistory.create({
        data:purchase
    })
}
async function getPurchaseHistory(userId: number) {
    return await prisma.purchaseHistory.findMany({
        where:{userId}
    })
}

export {
    createPurchaseHistory,
    getPurchaseHistory
}