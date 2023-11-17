import { Router } from "express";

import * as controllers from "./controllers";

const router = Router();

router.get("/search", controllers.getPostsBySearch);
router.post("/register", controllers.createUser);
router.post("/login", controllers.logInUser);
router.get("/user/:id", controllers.getUser);
router.get("/user/:id/posts", controllers.getUserPosts);
router.delete("/user/:id/delete", controllers.deleteUser);
router.get("/user/:id/home", controllers.getHome);
router.patch("/user/:id/updateUser", controllers.updateUser);
router.patch("/user/:id/updatePassword", controllers.updatePassword);
router.get("/post/:id", controllers.getPost);
router.post("/post/:id", controllers.postLike);
router.get("/post/:id/reviews", controllers.getPostReviews);
router.post("/post/createPost", controllers.createPost);
router.post("/post/:id/createReview", controllers.createReview);
router.patch("/post/:id/updatePost", controllers.updatePost);
router.delete("/post/:id/deletePost", controllers.deletePost);
router.delete("/post/:id/deleteReview", controllers.deleteReview);

router.get("/random/:cant", controllers.getRandomPosts);


export default router;
