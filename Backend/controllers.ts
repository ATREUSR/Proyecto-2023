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
export async function getUserPosts(req: Request, res: Response) {
  const dni = parseInt(req.params.dni);
  const post = await prisma.post
    .findMany({
      where: { user_dni: dni },
      select: {
        id: true,
        title: true,
        good_image: true,
        defective_image: true,
        user_dni: true,
        publish_date: true,
        price: true,
        description: true,
        defects: true,
        has_defects: true
      },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      res.status(400).json(err.message);
    });

}
