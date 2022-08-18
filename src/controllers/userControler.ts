import { Request, Response } from "express";
import * as userService from "../services/userService.js"
import { faker } from "@faker-js/faker";

export async function singIn(req: Request, res: Response) {
    const login = req.body
    const token = await userService.signIn(login);
    res.status(200).send({token});
}

export async function singUp(req: Request, res: Response) {
    const user = req.body;
    await userService.signUp(user);
    res.sendStatus(200);
}

export async function createAddress(req: Request, res: Response) {
    const address:userService.CreateAddressData = req.body
    const addressId = await userService.createAddress(address);;
    res.status(200).send({addressId});
}