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
        user_dni: true,
        publish_date: true,
        price: true,
        description: true,
        defects: true,
        has_defects: true,
        images: {
          select: {
            url: true,
          },
        },
      },
    })

    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      res.status(400).json(err.message);
    });
  res.status(200).json(post);
}
export async function getUserReviews(req: Request, res: Response) {
  const dni = parseInt(req.params.dni);
  const review = await prisma.review
    .findMany({
      where: { user_dni: dni },
      select: {
        id: true,
        user_dni: true,
        review_score: true,
        review_body: true,
        publish_date: true,
        post_id: true,
      },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      res.status(400).json(err.message);
    });
  res.status(200).json(review);
}
export async function getPostReview(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const review = await prisma.review
    .findMany({
      where: { post_id: id },
      select: {
        id: true,
        user_dni: true,
        review_score: true,
        review_body: true,
        publish_date: true,
        post_id: true,
      },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      res.status(400).json(err.message);
    });
  res.status(200).json(review);
}
export async function getHome(req: Request, res: Response) {
  const dni = parseInt(req.params.dni);
  const user = await prisma.user
    .findUnique({
      where: { dni },
      select: {
        dni: true,
        name: true,
        surname: true,
        pfp_url: true,
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
export async function getPostsBySearch(req: Request, res: Response) {
  const { post_id } = req.params;
  const posts = await prisma.post
    .findMany({
      where: {
        id: parseInt(post_id),
      },
      select: {
        id: true,
        title: true,
        has_defects: true,
        price: true,
        publish_date: true,
        images: {
          select: {
            url: true,
          },
        },
      },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      res.status(400).json(err.message);
    });

  res.status(200).json(posts);
}
