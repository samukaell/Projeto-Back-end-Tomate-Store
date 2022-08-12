import { prisma } from "../../src/database.js";
import  {CreateAddressData}  from "../../src/services/userService.js";

export default async function addressFactory(address: CreateAddressData) {
    return await prisma.address.create({
       data:address
   })
}
