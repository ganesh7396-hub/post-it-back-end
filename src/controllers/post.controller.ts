import { Response, NextFunction } from "express";
import {
  createPost,
  removePost,
  updatePost,
  fetchPosts,
  fetchSelfPosts,
} from "../services/post.service";
import { AuthRequest } from "../middlewares/auth"; // ✅ Import custom request type

// ✅ Add Post
export const addPost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        status: false,
        data: [],
        message: "Unauthorized: No user found",
      });
      return;
    }

    const post = await createPost(req.user.id, req.body);
    res.status(201).json({
      status: true,
      data: [post],
      message: "Post created successfully",
    });
  } catch (error: any) {
    next(error); // ✅ Use next() to forward errors to Express error handler
  }
};

// ✅ Edit Post
export const editPost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        status: false,
        data: [],
        message: "Unauthorized: No user found",
      });
      return;
    }

    const updatedPost = await updatePost(req.user.id, req.params.id, req.body);
    res.status(200).json({
      status: true,
      data: [updatedPost],
      message: "Post updated successfully",
    });
  } catch (error: any) {
    console.log("error=", error);
    next(error);
  }
};

// ✅ Delete Post
export const deletePost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        status: false,
        data: [],
        message: "Unauthorized: No user found",
      });
      return;
    }

    await removePost(req.user.id, req.params.id);
    res.status(200).json({
      status: true,
      data: [],
      message: "Post deleted successfully",
    });
  } catch (error: any) {
    next(error);
  }
};

// ✅ Get All Posts (Paginated)
export const getPosts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const posts = await fetchPosts(page, limit);
    res.status(200).json({
      status: true,
      data: posts,
      message: "Posts fetched successfully",
    });
  } catch (error: any) {
    next(error);
  }
};

// ✅ Get Self Posts
export const getSelfPosts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        status: false,
        data: [],
        message: "Unauthorized: No user found",
      });
      return;
    }

    const posts = await fetchSelfPosts(req.user.id);
    res.status(200).json({
      status: true,
      data: posts,
      message: "Your posts fetched successfully",
    });
  } catch (error: any) {
    next(error);
  }
};
