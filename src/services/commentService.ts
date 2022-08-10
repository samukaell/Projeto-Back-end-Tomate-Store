import { Comment } from "@prisma/client";
import * as commentRepository from "../repositories/commentRepository.js"
//Type da interface User, que vem do Prisma
export type CreateCommentData = Omit<Comment, "id">;

//Serviços principais
export async function addComment(comment: string, productId: number, userId: number) {
    await createComment({
        commit:comment,
        userId:userId,
        productId: productId
    });
}

//_________________//
//Serviços secundarios
async function createComment(comment: CreateCommentData) {
    await commentRepository.createComment(comment);
}