import { Router } from "express";
import * as controllers from "./controllers";

const router = Router();

router.get("/user/:dni", controllers.getUser);
router.get("/user:dni/posts", controllers.getUserPosts);
router.get("/user/:dni/reviews", controllers.getPostReview);
router.get("/user/:dni/home", controllers.getHome);
router.get("/user/:dni/home/search", controllers.getPostsBySearch);

export default router;
