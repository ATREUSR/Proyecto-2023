import { Request, Response } from "express";

import { PrismaClient, User, Review, Post, Prisma } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export async function getUser(req: Request, res: Response) {
  const dni = parseInt(req.params.dni);
  const user = await prisma.user
    .findUnique({
      where: { dni },
      select: {
        dni: true,
        name: true,
        surname: true,
        email: true,
        pfp_url: true,
        password: false,
      },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      res.status(400).json(err.message);
    });

  if (!user) {
    res.status(404).json("User not found");
    return;
  }

  res.status(200).json(user);
}
