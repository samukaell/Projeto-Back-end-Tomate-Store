import bcrypt from "bcrypt";
import { prisma } from "../../src/database.js";
import  {CreateUserData}  from "../../src/services/userService.js";

export default async function userFactory(user: CreateUserData) {
  return prisma.user.create({
    data: {
      email:user.email,
      password: bcrypt.hashSync(user.password, 10),
      name:user.name,
      image:user.image,
      addressId:user.addressId
    },
  });
}