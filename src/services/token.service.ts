import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import config from '../config';

const ACCESS_SECRET: Secret = config.JWT_ACCESS_SECRET as string;
const REFRESH_SECRET: Secret = config.JWT_REFRESH_SECRET as string;

const ACCESS_TOKEN_EXPIRES_SEC = 15 * 60;
const REFRESH_TOKEN_EXPIRES_SEC = 7 * 24 * 60 * 60;

export const generateAccessToken = (userId: string): string => {
  const payload = { id: userId };
  const options: SignOptions = { expiresIn: ACCESS_TOKEN_EXPIRES_SEC };
  return jwt.sign(payload, ACCESS_SECRET, options);
};

export const generateRefreshToken = (userId: string): string => {
  const payload = { id: userId };
  const options: SignOptions = { expiresIn: REFRESH_TOKEN_EXPIRES_SEC };
  return jwt.sign(payload, REFRESH_SECRET, options);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};
