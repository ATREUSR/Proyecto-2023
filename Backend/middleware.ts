import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";
import { response } from "express";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model == "User" && params.action == "create") {
    params.args.data.password = await bcrypt.hash(params.args.data.password,10);
  }
  return next(params);
});

prisma.$use(async (params, next) => {
    if (params.model == "User" && params.action == "findUnique") {
      const user = await prisma.user.findUnique({
        where: {
          email: params.args.where.email,
        },
      });
  
      if (!user) {
        throw new Error("Ese Email no esta registrado en nuestra base de datos");
      }
  
      const passwordMatch = await bcrypt.compare(
        params.args.where.password,
        user.password
      );
  
      if (!passwordMatch) {
        throw new Error("Invalid email or password");
      }
      const session = {
        userId: user.id,
        name: user.name,
        email: user.email,
      };
  
      const secret = process.env.SECRET;
      const options = {
        httpOnly: true,
        signed: true,
      };
  
      response.cookie("session", session, options);
    return next(params);
    }
    });

export default prisma;