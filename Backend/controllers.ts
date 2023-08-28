import { Request, Response } from "express";

import { PrismaClient, User, Review, Post, Prisma } from "@prisma/client";

const bcrypt = require("bcrypt");

const prisma: PrismaClient = new PrismaClient();

export async function getUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const user = await prisma.user
    .findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        pfp_url: true,
        address: true,
        comapny: true,
        phone: true,
        posts: {
          select: {
            id: true,
            title: true,
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
        },
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
  const id = parseInt(req.params.id);
  const posts = await prisma.post.findMany({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
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
  const id = parseInt(req.params.id);
  const review = await prisma.review
    .findMany({
      where: { id },
      select: {
        id: true,
        user_id: true,
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
        user_id: true,
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
  const id = parseInt(req.params.id);
  const user = await prisma.user
    .findUnique({
      where: { id },
      select: {
        id: true,
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
  const { q } = req.query;

  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: q as string } },
        { description: { contains: q as string } },
      ],
    },
  });

  return res.status(200).json(posts);
}
export async function createUser(req: Request, res: Response) {
  const {
    dni,
    id,
    name,
    surname,
    email,
    pfp_url,
    password,
    phone,
    address,
    comapny,
  } = req.body;
  const emailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (emailExists) {
    return res.status(400).json("El Email ya existe en la base de datos");
  }
  const hashed_password = await bcrypt.hash(password, 10);
  const user = await prisma.user
    .create({
      data: {
        dni,
        id,
        name,
        surname,
        email,
        pfp_url,
        password: hashed_password,
        phone,
        address,
        comapny,
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
  const { title, user_id, publish_date, price, description, defects, has_defects} = req.body;
  const post = await prisma.post
    .create({
      data: {
        title,
        user_id,
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
  const { user_id, review_score, review_body, publish_date } = req.body;

  const post_id = parseInt(req.params.id);

  const post = await prisma.post.findUnique({
    where: { id: post_id },
  });

  if (!post) {
    return res
      .status(404)
      .json({ error: "No existe un post con el id: " + post_id });
  }

  const review = await prisma.review.create({
    data: {
      user: {
        connect: {
          id: user_id,
        },
      },
      review_score,
      review_body,
      publish_date,
      post: {
        connect: {
          id: post_id,
        },
      },
    },
  });

  return res.status(201).json(review);
}
export async function updateUser(req: Request, res: Response) {
  const id = req.params.id;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const { name, surname, email, pfp_url } = req.body;

  const data: any = {};

  if (name) {
    data.name = name;
  }

  if (surname) {
    data.surname = surname;
  }

  if (email) {
    data.email = email;
  }

  if (pfp_url) {
    data.pfp_url = pfp_url;
  }

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data,
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
      pfp_url: true,
    },
  });

  return res.status(200).json(updatedUser);
}
export async function deleteUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const user = await prisma.user
    .delete({
      where: { id },
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
export async function updatePassword(req: Request, res: Response) {
  const { email, password, new_password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.status(400).json("El Email no existe en la base de datos");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json("Contraseña incorrecta");
  }
  const hashed_password = await bcrypt.hash(new_password, 10);

  await prisma.user.update({
    where: { email },
    data: {
      password: hashed_password,
    },
  });

  return res.status(200).json("Contraseña actualizada correctamente");
}
