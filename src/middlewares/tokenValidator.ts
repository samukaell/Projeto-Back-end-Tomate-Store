import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import * as userRepository from "../repositories/userRepository.js"

export default async function tokenValidator(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers
	const token = authorization?.replace('Bearer ', '').trim()

	if (!token) return res.status(422).send('Token not found.');

    const decode = await jwt.verify(token, process.env.TOKENKEY);
    //buscar pelo user 
    const user = await userRepository.findUserByEmail(decode.user.email);
    if(!user){
        //Usuario não encontrado
        return res.status(422).send('User not found.');
    }
	next()
}