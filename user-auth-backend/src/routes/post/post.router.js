import express from "express";
import {
  createPost,
  getFeedPosts,
  likePost,
  editPost,
  deletePost,
} from "./post.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const postRoutes = express.Router();
postRoutes.use(authMiddleware)
// Route to create a new post
postRoutes.post("/", createPost);

// Route to fetch posts for the feed
postRoutes.get("/feed", getFeedPosts);

// Route to like/unlike a post
postRoutes.post("/:id/like", likePost);

// Route to edit a post
postRoutes.patch("/:id", editPost);

// Route to delete a post
postRoutes.delete("/:id", deletePost);

export default postRoutes;
