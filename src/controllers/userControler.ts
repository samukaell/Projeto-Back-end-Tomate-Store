import { Request, Response } from "express";
import * as userService from "../services/userService.js"

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
export async function returnUser(req: Request, res: Response) {
    const {email} = req.body; 
    const user = await userService.getUser(email);
    res.send(user);
}
export async function returnUserById(req: Request, res: Response) {
    const {id} = req.params; 
    const userId = parseInt(id);
    const user = await userService.getUserById(userId);
    res.send(user);
}
export async function createAddress(req: Request, res: Response) {
    const address:userService.CreateAddressData = req.body
    const addressId = await userService.createAddress(address);;
    res.status(200).send({addressId});
}
export async function getAddress(req: Request, res: Response) {
    const addressId = res.locals.user.addressId;
    const address = await userService.getAddress(addressId);
    res.send(address);
}
export async function disconnect(req: Request, res: Response) {
    const email = res.locals.user.email;
    await userService.disconnect(email);
    res.sendStatus(200);
}
