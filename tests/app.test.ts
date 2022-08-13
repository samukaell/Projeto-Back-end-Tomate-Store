import { faker } from "@faker-js/faker";
import supertest from "supertest";

import app from "./../src/app.js";
import { prisma } from "./../src/database.js";

import {deleteAllData} from "./factories/scenarioFactory.js"
import userFactory from "./factories/userFactory.js";
import addressFactory from "./factories/addressfactory.js";
import categoryFactory from "./factories/categoryFactory.js";
import productFactory from "./factories/productFactory.js";


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

describe("Product Tests", () => {
    it("addition of a product", async () => {
        //Logar
        const token = await loginEasy();
        console.log("token->",token);
        //Definir a categoria
        const category = faker.animal.dog()
        const categoryId = await categoryFactory({name:category});
        
        //Dados dos produtos
        const product = {
            name: faker.commerce.product(),
            description:faker.commerce.productDescription(),
            categoryId:categoryId.id,
            amount:999,
            price:10.00
        }
        //Gerar os dados do produto
        const response = await agent
        .post("/addproduct")
        .set("Authorization", `Bearer ${token}`)
        .send(product);
        
        //Verificar se foi criado
        const productFinal = await prisma.product.findFirst({
            where:{name:product.name}
        })
        expect(response.status).toBe(201);
        //efeito colateral
        //expect(productFinal).not.toBeNull();
    });
});

describe("comment test", () => {
    it("Making a random product review about a product", async () => {
        //Gerar produto a ser comentado
        const productId = await addProductEasy();
        //Logar
        const token = await loginEasy();

        //Comentario
        const comment = {
            commit: faker.commerce.productDescription()
        }
        //Comentando
        const response = await agent
        .post(`/comment/${productId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(comment);

        expect(response.status).toBe(200);
    });
});

describe("test purchase", () => {
    it("Buying a random product", async () => {
        //Gerar produto a ser comentado
        const productId = await addProductEasy();
        //Logar
        const token = await loginEasy();

        //Comentario
        const amount = {
            amount: 5
        }
        //Comentando
        const response = await agent
        .post(`/buy/${productId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(amount);

        expect(response.status).toBe(200);
    });
});



//Auxiliar
async function loginEasy() {
    //Fazer um login automatico para poder abstrair isto dos proximos testes
    //Criar endereço
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

    const response = await agent.post("/signin").send({email:user.email,password:user.password});
    const { token } = response.body;

    console.log("token ->",token);
    
    return token;
}
async function addProductEasy() {
    //Usuario que adicionou o produto
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
    const userId = await userFactory(user);
    //Criando a categoria do produto
    const category = faker.animal.dog()
    const categoryId = await categoryFactory({name:category});
    //Dados dos produtos
    const product = {
        name: faker.commerce.product(),
        description:faker.commerce.productDescription(),
        categoryId:categoryId.id,
        userId: userId.id,
        amount:999,
        price:10.00
    }
    //Gerar os dados do produto
    const productId = await productFactory(product);
    return productId.id;
}

afterAll(async () => {
    await prisma.$disconnect();
});