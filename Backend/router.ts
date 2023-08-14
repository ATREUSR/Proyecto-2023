import { Router } from "express";
import * as controllers from "./controllers";

const router = Router();

router.get("/user/:dni", controllers.getUser);

export default router;
