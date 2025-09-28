import { Request, Response } from 'express';
import { Types } from 'mongoose';
import User from '../models/user.model';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../services/token.service';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  const userId = (user._id as Types.ObjectId).toString();
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  user.refreshToken = refreshToken;
  await user.save();
  res.status(201).json({ user, accessToken, refreshToken });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const userId = (user._id as Types.ObjectId).toString();
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  user.refreshToken = refreshToken;
  await user.save();
  res.status(200).json({ user, accessToken, refreshToken });
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'No refresh token provided' });

  try {
    const decoded: any = verifyRefreshToken(token);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const userId = (user._id as Types.ObjectId).toString();
    const accessToken = generateAccessToken(userId);
    const newRefreshToken = generateRefreshToken(userId);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Token required' });

  try {
    const decoded: any = verifyRefreshToken(token);
    const user = await User.findById(decoded.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
