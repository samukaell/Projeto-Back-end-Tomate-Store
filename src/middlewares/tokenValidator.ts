import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import * as sessionRepository from "../repositories/sessionRepository.js"

export default async function tokenValidator(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers
	const token = authorization?.replace('Bearer ', '').trim()

	if (!token) return res.status(422).send('Token not found.');

    const decode = jwt.verify(token, process.env.TOKENKEY);
	res.locals.user = decode.user
    
    //buscar pelo user na session
    const user = await sessionRepository.findUserByEmail(decode.user.email);
    if(!user){
        //Usuario não encontrado
        return res.status(422).send('User not found.');
    }
	next()
}