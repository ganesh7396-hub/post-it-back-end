import Post from "../models/post.model";
import { Types } from "mongoose";

export const createPost = async (
  userId: string,
  postData: { title: string; description: string }
) => {
  return await Post.create({ ...postData, postedBy: userId });
};

export const updatePost = async (
  userId: string,
  postId: string,
  postData: { title?: string; description?: string }
) => {
  const post = await Post.findOneAndUpdate(
    { _id: postId, postedBy: userId },
    { $set: postData },
    { new: true }
  );

  if (!post) {
    throw new Error("Post not found or unauthorized");
  }

  return post;
};

export const removePost = async (userId: string, postId: string) => {
  const post = await Post.findOneAndDelete({ _id: postId, postedBy: userId });

  if (!post) {
    throw new Error("Post not found or unauthorized");
  }

  return post;
};

export const fetchPosts = async (page: number, limit: number) => {
  return await Post.find().populate({ path: "postedBy", select: "userName mail" })
    .sort({ createdAt: -1 }) // Fetch latest posts first
    .skip((page - 1) * limit)
    .limit(limit).lean(); // Convert Mongoose objects to plain JSON

};

export const fetchSelfPosts = async (userId: string) => {
  return await Post.find({ postedBy: userId }).sort({ createdAt: -1 });
};
