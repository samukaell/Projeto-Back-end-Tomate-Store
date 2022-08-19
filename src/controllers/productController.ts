import { faker } from "@faker-js/faker";
import { Request, Response } from "express";
import * as productService from "../services/productService.js"

export async function addProduct(req: Request, res: Response) {
    const product = req.body;
    await productService.addProduct({
        name:product.name,
        image:product.image,
        description:product.description,
        categoryId:product.categoryId,
        userId:res.locals.user.id,//Quem esta adicionando o produto
        amount:product.amount,
        price:product.price
    });

    res.sendStatus(201);
}
export async function createCategory(req: Request, res: Response) {
    const category = req.body;
    await productService.createCategory(category);
    res.sendStatus(200);
}
export async function getAllProduct(req: Request, res: Response) {
    const products = await productService.getAllProducts();
    res.send(products);
}

export async function getProductId(req: Request, res: Response) {
    const {id} = req.params;//Id do produtos
    const productId = parseInt(id);
    const product = await productService.getProductId(productId);
    res.send(product);
}