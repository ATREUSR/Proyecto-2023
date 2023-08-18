import { Router } from "express";
import * as controllers from "./controllers";

const router = Router();

router.get("/user/:dni", controllers.getUser);
router.get("/user:dni/posts", controllers.getUserPosts);
router.get("/user/:dni/reviews", controllers.getPostReview);
router.get("/user/:dni/home", controllers.getHome);
router.get("/register", controllers.createUser);
router.get("/login", controllers.logInUser);
router.get("user/:dni/updateuser", controllers.updateUser);
router.get("/createpost", controllers.createPost);
router.get("/post/:id", controllers.getPostsBySearch);
router.get("/post/:id", controllers.createReview);
router.get("/post/:id", controllers.deletePost);
router.get("/user/:id", controllers.deleteUser);
router.get("/user/:dni", controllers.updateUser);


export default router;