import express from "express";

import router from "./router";

import cors from "cors";

import cookieParser from "cookie-parser";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
  rejectUnauthorized: false,
});

async function testCloudinaryConnection() {
  try {
    const result = await cloudinary.api.ping();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

testCloudinaryConnection();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);

const PORT: Number = 3000;
app.listen(PORT, () => console.log("Alive on localhost: " + PORT));
