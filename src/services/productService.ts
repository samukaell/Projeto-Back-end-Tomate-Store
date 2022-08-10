import { Category, Product } from "@prisma/client";
import * as productRepository from "../repositories/productRepository.js"

//Type da interface User, que vem do Prisma
export type CreateProductData = Omit<Product, "id">;
export type CreateCategoryData = Omit<Category, "id">;

//Serviços principais
export async function addProduct(product: CreateProductData) {
    await createProduct(product);
}
export async function createCategory(category: CreateCategoryData) {
    await productRepository.createCategory(category);
}
//_________________//
//Serviços secundarios
async function createProduct(product: CreateProductData) {
    await productRepository.createProduct(product);
}