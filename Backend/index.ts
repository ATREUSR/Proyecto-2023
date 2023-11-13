import express from "express";
import router from "./router";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors  from "cors";

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

const allowedOrigins = [  'http://localhost:3000', 'http://localhost:8080', 'http://localhost:0080', 'http://localhost:80', 'http://localhost' ];
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    //console.log(origin);
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(router);

const PORT: Number = 3000;
app.listen(PORT, () => console.log("Alive on localhost: " + PORT));