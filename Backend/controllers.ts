import { Request, Response } from "express";

import { PrismaClient, User, Review, Post, Prisma } from "@prisma/client";

const bcrypt = require("bcrypt");

const prisma: PrismaClient = new PrismaClient();

export async function getUser(req: Request, res: Response) {
  const dni = parseInt(req.params.dni);
  const user = await prisma.user
    .findUnique({
      where: { dni: dni },
      select: {
        dni: true,
        name: true,
        surname: true,
        email: true,
        pfp_url: true,
      },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      return res.status(400).json(err.message);
    });

  if (!user) {
    return res.status(404).json("User not found");
  }
  return res.status(200).json(user);
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
      return res.status(400).json(err.message);
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
      return res.status(400).json(err.message);
    });
  return res.status(200).json(review);
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
      return res.status(400).json(err.message);
    });
  return res.status(200).json(review);
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
      return res.status(400).json(err.message);
    });

  if (!user) {
    return res.status(404).json("User not found");
  }
  return res.status(200).json(user);
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
      return res.status(400).json(err.message);
    });
  return res.status(200).json(posts);
}
export async function createUser(req: Request, res: Response) {
  const { dni, name, surname, email, pfp_url, password } = req.body;
  const user = await prisma.user
    .create({
      data: {
        dni,
        name,
        surname,
        email,
        pfp_url,
        password,
      },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      return res.status(400).json(err.message);
    });
  return res.status(201).json(user);
}
export async function logInUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await prisma.user
    .findUnique({
      where: {
        email,
      },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      return res.status(400).json(err.message);
    });
  if (!user) {
    return res.status(404).json("User not found");
  }
  const passwordsMatch = await bcrypt.compare(password, req.body.password);
  if (!passwordsMatch) {
    return res.status(401).json("Wrong password");
  }
  return res.status(200).json(user);
}
export async function createPost(req: Request, res: Response) {
  const {
    title,
    user_dni,
    publish_date,
    price,
    description,
    defects,
    has_defects,
  } = req.body;
  const post = await prisma.post
    .create({
      data: {
        title,
        user_dni,
        publish_date,
        price,
        description,
        defects,
        has_defects,
      },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      return res.status(400).json(err.message);
    });
  return res.status(201).json(post);
}
export async function createReview(req: Request, res: Response) {
  const { user_dni, review_score, review_body, publish_date, post_id } =
    req.body;
  const review = await prisma.review
    .create({
      data: {
        user_dni,
        review_score,
        review_body,
        publish_date,
        post_id,
      },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      return res.status(400).json(err.message);
    });
  return res.status(201).json(review);
}
export async function updateUser(req: Request, res: Response) {
  const { dni, name, surname, email, pfp_url, password } = req.body;
  const user = await prisma.user
    .update({
      where: { dni },
      data: {
        name,
        surname,
        email,
        pfp_url,
        password,
      },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      return res.status(400).json(err.message);
    });
  return res.status(200).json(user);
}
export async function deleteUser(req: Request, res: Response) {
  const dni = parseInt(req.params.dni);
  const user = await prisma.user
    .delete({
      where: { dni },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      return res.status(400).json(err.message);
    });
  return res.status(200).json(user);
}
export async function deletePost(req: Request, res: Response) {
  const { post_id } = req.params;
  const posts = await prisma.post
    .delete({
      where: { id: parseInt(post_id) },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      return res.status(400).json(err.message);
    });
  return res.status(200).json("Operation succesful");
}