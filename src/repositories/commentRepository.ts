import {prisma}  from "../database.js"
import { CreateCommentData } from "../services/commentService.js"

async function createComment(comment: CreateCommentData) {
    await prisma.comment.create({
        data:comment
    })
}
async function getCommentByProductId(productId: number) {
    return prisma.comment.findMany({
        where:{productId}
    })
}

export{
    createComment,
    getCommentByProductId
}