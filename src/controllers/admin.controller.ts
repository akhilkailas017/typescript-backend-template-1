import User from '../models/user.model';
import { Request, Response } from 'express';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().select('-password -refreshToken');
  res.status(200).json(users);
};
