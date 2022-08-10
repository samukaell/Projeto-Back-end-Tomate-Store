import { PurchaseHistory } from "@prisma/client";
import dayjs from "dayjs"
import * as purchaseHistoryRepository from '../repositories/purchaseHistoryRespository.js'
import * as productRepository from '../repositories/productRepository.js'

//Type da interface User, que vem do Prisma
export type CreatePurchaseData = Omit<PurchaseHistory, "id">;

export async function purchaseHistory(amount: number, productId: any, userId: number) {
    //verificando o produto
    const product = await findProduct(productId);
    if(!product){
        throw { type: "not found", message: "never registered user" };
    }
    
    if(product.amount < amount){
        throw { type: "no products", message: "Not so many products available in stock" };
    }
    //FAZER COMPRA
    await makeBuy(amount,productId);
    //A data da compra
    const today = dayjs().format('YYYY-MM-DD HH:mm');

    await createPurchaseHistory({
        date: today,
        priceTotal: amount*product.price,
        productId: productId,
        userId: userId
    })
    
}

//_________________//
//Serviços secundarios
async function createPurchaseHistory(purchaseHistory: CreatePurchaseData) {
    await purchaseHistoryRepository.createPurchaseHistory(purchaseHistory);
}
async function findProduct(id: number) {
    return productRepository.findProductById(id);
}
async function makeBuy(amount: number, id: number) {
    await productRepository.buyProduct(amount,id)
}