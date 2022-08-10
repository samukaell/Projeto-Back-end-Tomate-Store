import {prisma}  from "../database.js"
import { CreateCommentData } from "../services/commentService.js"

async function createComment(comment: CreateCommentData) {
    await prisma.comment.create({
        data:comment
    })
}

export{
    createComment,
}