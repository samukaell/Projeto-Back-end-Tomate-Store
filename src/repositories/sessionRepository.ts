import {prisma}  from "../database.js"
import { CreateSessionData } from "../services/userService.js";

async function findUserByEmail(email: string) {
    return await prisma.session.findFirst({
        where:{
            email:{
                equals:email
            }
        }
    });
}
async function createSession(user: CreateSessionData) {
    await prisma.session.create({
        data:user,
    })
}

async function deleteUserSessionById(id: number){
    await prisma.session.delete({
        where:{id}
    })
}



export{
    findUserByEmail,
    createSession,
    deleteUserSessionById
}
