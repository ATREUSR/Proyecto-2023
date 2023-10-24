import { Request, Response } from "express";

import { v2 as cloudinary } from "cloudinary";

import {
  PrismaClient,
  User,
  Review,
  Post,
  Prisma,
  Image,
  ImageType,
} from "@prisma/client";

const bcrypt = require("bcrypt");

import { v4 as uuidv4 } from "uuid";

const prisma: PrismaClient = new PrismaClient();

export async function getUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const user = await prisma.user
    .findUnique({
      where: { id },
      select: {
        Image: {
          where: { image_id: id },
          select: {
            image_type: true,
            url: true,
          },
        },
        id: true,
        name: true,
        surname: true,
        email: true,
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
            Image: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      throw res.status(400).json(err.message);
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
      Image: {
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
      throw res.status(400).json(err.message);
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
        Image: { select: { url: true } },
      },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      return res.status(400).json(err.message);
    });
  return res.status(200).json(review);
}

export async function getHome(req: Request, res: Response) {
  const id = parseInt(req.params.id!);
  const user_exist = await prisma.user.findUnique({
    where: { id },
  });
  if (!user_exist) {
    return res.status(404).json("El usuario no existe");
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        surname: true,
        Image: {
          where: { image_id: id },
          select: {
            url: true,
            image_type: true,
          },
        },
      },
    });
    if (!user) {
      return res.status(404).json("User not found");
    }
    return res.status(200).json(user);
  } catch (err: any) {
    return res.status(400).json(err.message);
  }
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
        Image: {
          create: [
            {
              url: pfp_url,
              image_type: "PFP",
            } ] },
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
  const sessionId = uuidv4();
  res.cookie('sessionId', sessionId, { httpOnly: true });

  const pfp = await prisma.image.findUnique({
    where: { image_id: user.id, image_type: "PFP" },
  });

  return res.status(200).json({
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    pfp_url: pfp?.url,
  });
}

export async function createPost(req: Request, res: Response) {
  const {
    title,
    user_id,
    publish_date,
    price,
    description,
    defects,
    has_defects,
    image_type,
    file,
  } = req.body;

  let url;

  if (file) {
    try {
      const result = await cloudinary.uploader.upload(file.path);
      url = result.secure_url;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error uploading image" });
    }
  }
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
        Image: {
          create: [
            {
              url: url || "",
              image_type,
            },
          ],
        },
      },
    })
    .catch((err: Prisma.PrismaClientKnownRequestError) => {
      throw res.status(400).json(err.message);
    });
  return res.status(201).json(post);
}

export async function createReview(req: Request, res: Response) {
  const { user_id, review_score, review_body, publish_date, files, image_types } = req.body;

  const post_id = parseInt(req.params.id);

  const post = await prisma.post.findUnique({ where: { id: post_id } });

  let urls: string[] = [];

  if (files)
    try {
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path);
        urls.push(result.secure_url);
      }} 
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error uploading image" }); 
    }

  if (!post) return res.status(404).json({ error: "No existe un post con el id: " + post_id });

  const images = image_types.map(( type: ImageType, index: number ) => {
    return { url: urls[index] || "" , image_type: type } } );

  const review = await prisma.review.create({
    data: {
      user: { connect: { id: user_id } },
      review_score,
      review_body,
      publish_date,
      post: { connect: { id: post_id } },
      Image: {
        create: images } } } );

  return res.status(201).json(review);
}

export async function updateUser(req: Request, res: Response) {
  const id = req.params.id;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) } } );

  if (!user) return res.status(400).json({ message: "User not found" });

  const { name, surname, email, file } = req.body;

  let pfp_url = file.url;

  if (req.file)
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      pfp_url = result.secure_url;
      const image = await prisma.image.create({
        data: { url: pfp_url, image_type: "PFP" } } );

      console.log("Image created: ", image);

    } 
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error uploading image" });
    }

  const data: any = {};

  if (name) data.name = name;

  if (surname) data.surname = surname;

  if (email) data.email = email;
  

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) }, data } );

  return res.status(200).json(updatedUser);
}

export async function deleteUser(req: Request, res: Response) {
  const { email, password } = req.body;

  const emailExists = await prisma.user.findUnique({
    where: { email } } );

  if (!emailExists) return res.status(400).json("El Email no existe en la base de datos");

  const passwword_comapre = await bcrypt.compare( password, emailExists.password );

  if (!passwword_comapre) return res.status(400).json("Contraseña incorrecta");

  const userr = await prisma.user.findUnique({
    where: { email },
    select: { id: true } } );

  const id = userr?.id;
  const user = await prisma.user.delete({
      where: { id },
      }).catch((err: Prisma.PrismaClientKnownRequestError) => {
      throw res.status(400).json(err.message);
    });

  return res.status(200).json("El usuario ah sido eliminado correctamente");
}

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params;
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { email: true, password: true } } );

  if (
    !user ||
    email !== user.email ||
    !(await bcrypt.compare(password, user.password))
  ) return res.status(400).json("Credenciales invalidas");

  const postId = parseInt(id);

  if (isNaN(postId)) return res.status(400).json("El id de la publicacion no es valido");

  const postExist = await prisma.post.findUnique({
    where: { id: postId } } );

  if (!postExist) return res.status(404).json("La publicacion no existe");

  await prisma.post.delete({
    where: { id: postId },
  });
  return res.status(200).json("La publicacion ah sido eliminada correctamente");
}

export async function updatePassword(req: Request, res: Response) {
  const { email, password, new_password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email } } );
    
  if (!user) return res.status(400).json("El Email no existe en la base de datos");
  
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) return res.status(400).json("Contraseña incorrecta");

  const hashed_password = await bcrypt.hash(new_password, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashed_password } } );

  return res.status(200).json("Contraseña actualizada correctamente");
}

export async function deleteReview(req: Request, res: Response) {
  const { id } = req.params;
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { email: true, password: true },
  });

  if ( !user ||
     email !== user.email || 
    !(await bcrypt.compare( password, user.password)  ) ) 
    return res.status(400).json("Credenciales invalidas");

  const reviewId = parseInt(id);
  if (isNaN(reviewId)) return res.status(400).json("El id de la publicacion no es valido");

  const reviewExist = await prisma.review.findUnique({
    where: { id: reviewId } } );

  if (!reviewExist) return res.status(404).json("La publicacion no existe");

  await prisma.review.delete({
    where: { id: reviewId } } );

  return res.status(200).json("La publicacion ah sido eliminada correctamente");
}

export async function getPost(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const post = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        publish_date: true,
        price: true,
        description: true,
        defects: true,
        has_defects: true,
        Image: {
          select: {
            url: true } } },
    }).catch((err: Prisma.PrismaClientKnownRequestError) => {
      throw res.status(400).json(err.message);
    });

  if (!post) return res.status(404).json("Post not found");

  return res.status(200).json(post);
}

export async function postLike(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const like = await prisma.liked.create({
      data: {
        user_id: userId,
        post_id: parseInt(id)
      }
    });

    return res.status(201).json(like);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al likear el producto"});  
  }
}
