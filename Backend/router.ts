import { Router } from "express";
import * as controllers from "./controllers";

const router = Router();

router.get("/user/:id", controllers.getUser);
router.get("/user/:id/posts", controllers.getUserPosts);
router.get("/post/:id/reviews", controllers.getPostReview);
router.get("/user/:id/home", controllers.getHome);
router.post("/register", controllers.createUser);
router.post("/login", controllers.logInUser);
router.patch("/user/:id/update", controllers.updateUser)
router.patch("/user/:id/updatePassword", controllers.updatePassword);
router.post("/createpost", controllers.createPost);
router.get("/posts", controllers.getPostsBySearch);
router.post("/post/:id", controllers.createReview);
router.delete("/post/:id", controllers.deletePost);
router.delete("/user/:id", controllers.deleteUser);

export default router;