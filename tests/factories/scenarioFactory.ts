import { prisma } from "./../../src/database.js";

export async function deleteAllData() {
    await prisma.$transaction([
      prisma.$executeRaw`TRUNCATE TABLE comment`,
      prisma.$executeRaw`TRUNCATE TABLE users CASCADE`,
      prisma.$executeRaw`TRUNCATE TABLE address CASCADE`,
      prisma.$executeRaw`TRUNCATE TABLE session CASCADE`,
      prisma.$executeRaw`TRUNCATE TABLE category CASCADE`,
      prisma.$executeRaw`TRUNCATE TABLE product CASCADE`,
      prisma.$executeRaw`TRUNCATE TABLE "PurchaseHistory" CASCADE`,
    ]);
}