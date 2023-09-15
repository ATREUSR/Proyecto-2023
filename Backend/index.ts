import express from "express";

import router from "./router";

import cors from "cors";

import cookieParser from "cookie-parser";

import { v2 as cloudinaryV2 } from "cloudinary";

cloudinaryV2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);

const PORT: Number = 3000;
app.listen(PORT, () => console.log("Alive on localhost: " + PORT));
