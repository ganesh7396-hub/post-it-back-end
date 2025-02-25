import express from "express";
import {
  addPost,
  deletePost,
  editPost,
  getPosts,
  getSelfPosts,
} from "../controllers/post.controller";
import  {authenticateToken}  from "../middlewares/auth";

const router = express.Router();

// Routes with JWT validation middleware
router.post("/add", authenticateToken, addPost);
router.put("/edit/:id", authenticateToken, editPost);
router.delete("/delete/:id", authenticateToken, deletePost);
router.get("/all", authenticateToken, getPosts);
router.get("/self", authenticateToken, getSelfPosts);

export default router;
