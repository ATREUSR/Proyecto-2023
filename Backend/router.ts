import { Router } from "express";
import * as controllers from "./controllers";

const router = Router();

router.get("/user/:dni", controllers.getUser);
router.get("/user:dni/posts", controllers.getUserPosts);
router.get("/user/:dni/reviews", controllers.getPostReview);
router.get("/user/:dni/home", controllers.getHome);
router.post("/register", controllers.createUser);
router.get("/login", controllers.logInUser);
router.patch("user/:dni/updateuser", controllers.updateUser);
router.post("/createpost", controllers.createPost);
router.get("/post/:id", controllers.getPostsBySearch);
router.post("/post/:id", controllers.createReview);
router.delete("/post/:id", controllers.deletePost);
router.delete("/user/:id", controllers.deleteUser);
router.patch("/user/:dni", controllers.updateUser);

export default router;
