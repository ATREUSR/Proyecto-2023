import { Router } from "express";
import * as controllers from "./controllers";

const router = Router();

router.get("/user/:dni", controllers.getUser);
router.get("/user/:dni/posts", controllers.getUserPosts);
router.get("/post/:id/reviews", controllers.getPostReview);
router.get("/user/:dni/home", controllers.getHome);
router.post("/register", controllers.createUser);
router.post("/login", controllers.logInUser);
router.patch("user/:dni/update", controllers.updateUser)
router.post("/createpost", controllers.createPost);
router.get("/post/:id", controllers.getPostsBySearch);
router.post("/post/:id", controllers.createReview);
router.delete("/post/:id", controllers.deletePost);
router.delete("/user/:dni", controllers.deleteUser);

export default router;
