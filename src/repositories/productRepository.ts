import {prisma}  from "../database.js"
import { CreateCategoryData, CreateProductData } from "../services/productService.js";

async function createProduct(product: CreateProductData) {
    await prisma.product.create({
        data:product
    })
}
async function createCategory(category: CreateCategoryData) {
    await prisma.category.create({
        data:category
    })
}

export{
    createProduct,
    createCategory
}