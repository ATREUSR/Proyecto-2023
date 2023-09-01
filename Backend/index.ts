import express from "express";

import router from "./router";

import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(router);

const PORT: Number = 3000;
app.listen(PORT, () => console.log("Alive on localhost: " + PORT));
