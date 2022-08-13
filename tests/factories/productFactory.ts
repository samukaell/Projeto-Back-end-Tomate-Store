import { prisma } from "../../src/database.js";
import { CreateProductData } from "../../src/services/productService.js";


export default async function productFactory(product: CreateProductData) {
    return await prisma.product.create({
        data:product
    })
}
