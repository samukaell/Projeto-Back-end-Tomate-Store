import { Request, Response } from "express";
import * as commentService from '../services/commentService.js'

export async function addComment(req: Request, res: Response) {
    const comment = req.body;
    const {id} = req.params
    const productId:number = parseInt(id);
    const userId = res.locals.user.id;
    await commentService.addComment(comment.commit, productId, userId);
    res.sendStatus(200);
}
export async function getComment(req: Request, res: Response) {
    const {id} = req.params;
    const productId = parseInt(id);
    console.log("Product Id",productId)
    const comment = await commentService.getCommentByProductId(productId);
    res.send(comment);
}