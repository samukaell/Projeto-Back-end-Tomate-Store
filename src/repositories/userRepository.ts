import {prisma}  from "../database.js"
import { CreateAddressData, CreateUserData } from "../services/userService.js";

async function findUserByEmail(email: string) {
    return await prisma.user.findFirst({
        where: {
            email:{
                equals:email
            }
        },
    });
}
async function findUserById(id: number) {
    return await prisma.user.findFirst({
        where: {
            id:{
                equals:id
            }
        },
    });
}
async function createUser(user:CreateUserData) {
    await prisma.user.create({
        data:user,
    })
}
async function createAddress(address: CreateAddressData) {
     return await prisma.address.create({
        data:address
    })
}
async function getAddress(id: number) {
    return await prisma.address.findFirst({
       where:{id}
   })
}
async function getUserByEmail(email: string) {
    return await prisma.user.findFirst({
        where:{email}
    })
}
async function getUserById(id: number) {
    return await prisma.user.findFirst({
        where:{id}
    })
}

export {
    findUserByEmail,
    findUserById,
    createUser,
    createAddress,
    getAddress,
    getUserByEmail,
    getUserById
};