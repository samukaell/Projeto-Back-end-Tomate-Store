import {prisma}  from "../database.js"
import { CreateCategoryData, CreateProductData } from "../services/productService.js";

async function createProduct(product: CreateProductData) {
    await prisma.product.create({
        data:product
    })
}
async function findProductById(id: number) {
    return await prisma.product.findFirst({
        where:{id}
    });
}
async function createCategory(category: CreateCategoryData) {
    await prisma.category.create({
        data:category
    })
}

async function buyProduct(amount: number,id: number) {
    await prisma.product.update({
        where:{id},
        data:{
            amount:{ decrement:amount }
        }
    })
}

export{
    createProduct,
    createCategory,
    findProductById,
    buyProduct
}