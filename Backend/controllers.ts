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
  const posts = await prisma.post.findMany({
    where: {
      user_dni: dni,
    },
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
  });

  return res.json(posts);
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
        images: { select: { url: true } },
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
  const dniAlreadyExists = await prisma.user.findUnique({
    where: {
      dni,
    },
  });
  const emailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (emailExists) {
    if (dniAlreadyExists) {
      return res
        .status(400)
        .json("El DNI y el Email ya existen en la base de datos");
    } else
      return res.status(400).json("El Email ya existe en la base de datos");
  }
  if (dniAlreadyExists) {
    return res.status(400).json("El DNI ya existe en la base de datos");
  }
  const hashed_password = await bcrypt.hash(password, 10);
  const user = await prisma.user
    .create({
      data: {
        dni,
        name,
        surname,
        email,
        pfp_url,
        password: hashed_password,
      },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      throw res.status(400).json(err.message);
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
      throw new Error(err.message);
    });
  if (!user) {
    return res
      .status(401)
      .json("Ese Email no esta registrado en nuestra base de datos");
  }
  const passwordsMatch: boolean = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    return res.status(401).json("Contraseña incorrecta");
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
      throw res.status(400).json(err.message);
    });
  return res.status(201).json(post);
}
export async function createReview(req: Request, res: Response) {
  const { user_dni, review_score, review_body, publish_date } = req.body;

  const postId = parseInt(req.params.id);

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    return res
      .status(404)
      .json({ error: "No existe un post con el id: " + postId });
  }

  const review = await prisma.review.create({
    data: {
      user: {
        connect: {
          dni: user_dni,
        },
      },
      review_score,
      review_body,
      publish_date,
      post: {
        connect: {
          id: postId,
        },
      },
    },
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
