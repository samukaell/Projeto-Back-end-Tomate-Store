import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { Address, Session, User } from "@prisma/client";
import * as userRepository from "../repositories/userRepository.js"
import * as sessionRepository from "../repositories/sessionRepository.js"

//Type da interface User, que vem do Prisma
export type CreateUserData = Omit<User, "id">;
export type CreateAddressData = Omit<Address, "id">;
export type CreateSessionData = Omit<Session, "id">;

//Serviços Principais
export async function signUp(user:any) {
    //verificar se o email ja foi cadastrado
    const emailUser = await finduser(user.email);
    if(emailUser){
        throw { type: "conflict", message: "user already registered" };
    }   
    //Verificar se o endereço foi passado
    if(user.addressId === undefined){
        return createUser({
            email:user.email,
            password:user.password,
            name:user.name,
            image:user.image,
            addressId:1
        })
    }else{
        //Cadastrar
        return await createUser(user);
    }
}
export async function signIn(login) {
    //verificar se o email existe
    const user = await finduser(login.email);
    if(!user){
        throw { type: "not found", message: "never registered user" };
    }
    //Verificar se o user ja esta logado
    const session = await findUserSession(login.email);
    if(session){
        //Remover a sessao e da conflito
        await quitSession(session.id);
        throw { type: "conflict", message: "The user is already logged in" };
    }
    //Comparar as senhas
    if (user && bcrypt.compareSync(login.password, user.password)) {
        //OK, logando e retornando o token
        //gerando o token
        const token = jwt.sign({user:user},process.env.TOKENKEY);
        //Logando
        await logIn({
            email:user.email,
            token:token
        })
        return token;        
    }
    else {
        throw { type: "conflict", message: "incompatible password" };
    }
}
export async function createAddress(address: CreateAddressData) {
   const addressNew = await userRepository.createAddress(address);
   const id = addressNew.id;
   return id.toString();
   
}
export async function getAddress(id: number) {
    return await userRepository.getAddress(id);
}
export async function getUser(email: string) {
    return await returnUser(email);
}
export async function getUserById(id: number) {
    const user = await userRepository.getUserById(id);
    return{
        name:user.name,
        image:user.image,
        email:user.email,
        id:user.id,
        addressId:user.addressId
    }
}
export async function disconnect(email: string) {
    const session = await sessionRepository.findUserByEmail(email);
    await sessionRepository.deleteUserSessionById(session.id);
}
//_________________________________________//
//Auxiliar 
async function finduser(email: string) {
    return await userRepository.findUserByEmail(email);
}
async function createUser(user: CreateUserData) {
    const SALT = 10;
	const passwordHash = bcrypt.hashSync(user.password, SALT);
    //Senha crip...
    await userRepository.createUser({
        email:user.email,
        password: passwordHash,
        name:user.name,
        image:user.image,
        addressId: user.addressId
    });

    return "Registered user"
}
async function findUserSession(email: string) {
    return await sessionRepository.findUserByEmail(email);
}
async function logIn(session: CreateSessionData) {
    await sessionRepository.createSession(session);
}
async function returnUser(email: string) {
    const user = await userRepository.getUserByEmail(email);
    return{
        name:user.name,
        image:user.image,
        id:user.id
    }
}
async function quitSession(id: number) {
    await sessionRepository.deleteUserSessionById(id)
}