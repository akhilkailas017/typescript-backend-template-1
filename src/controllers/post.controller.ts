import { Request, Response } from 'express';
import Post from '../models/post.model';

export const createPost = async (req: Request, res: Response) => {
  const post = await Post.create({ user: req.user!._id, content: req.body.content });
  res.status(201).json(post);
};

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find().populate('user', 'username email');
  res.status(200).json(posts);
};
