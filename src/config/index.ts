import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  WHITELIST_ORIGINS: ['https://localhost.com'],
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/test',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'supersecretaccess',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'supersecretrefresh',
  ACCESS_TOKEN_EXPIRES: '15m',
  REFRESH_TOKEN_EXPIRES: '7d',
  ADMIN_API_KEY: process.env.ADMIN_API_KEY || 'superadminapikey',
};

export default config;
