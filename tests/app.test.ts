import { faker } from "@faker-js/faker";
import supertest from "supertest";

import app from "./../src/app.js";
import { prisma } from "./../src/database.js";

import {deleteAllData} from "./factories/scenarioFactory.js"
import userFactory from "./factories/userFactory.js";
import addressFactory from "./factories/addressfactory.js";

const agent = supertest(app);

beforeAll(async()=>{
    await deleteAllData(); //Apaga todos os dados
})
//testes
describe("user tests", () => {
    it("should create user", async () => {
        const address = {
            street: faker.address.street(),
            district: faker.address.state(),
            city: faker.address.cityName(),
            number: parseInt(faker.address.buildingNumber())
        }
        //criar o endereço
        const addressId = await addressFactory(address);
        
        const user = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            addressId: addressId.id
        };
        //Fazer a criação de user
        await agent.post("/signup").send(user);

        // efeitos colaterais
        const addressCreated = await prisma.user.findFirst({
            where: {email: user.email}
        });
        expect(addressCreated).not.toBeNull();
    });

    it("login with a user already registered in the bank", async () => {

        const address = {
            street: faker.address.street(),
            district: faker.address.state(),
            city: faker.address.cityName(),
            number: parseInt(faker.address.buildingNumber())
        }

        const addressId = await addressFactory(address);

        const user = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            addressId:addressId.id
        };

        const userCreate = await userFactory(user);
        console.log("User criado->",userCreate);
        

        const response = await agent.post("/signin").send({email:user.email,password:user.password});
        const { token } = response.body;
        
        let session = null
        if(token != undefined){
            session = await prisma.session.findFirst({
                where:{token:token}
            }) 
        }
        expect(session).not.toBeNull();
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});