import { prisma } from "../../src/database.js";
import { CreateCategoryData } from "../../src/services/productService.js";


export default async function categoryFactory(category: CreateCategoryData) {
    return await prisma.category.create({
        data:category
    })
}
