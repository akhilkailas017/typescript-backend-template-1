import mongoose from 'mongoose';
import config from './config';
import logger from './utils/logger';
import app from './app';

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info('MongoDB connected');
    app.listen(config.PORT, () => logger.info(`Server running on port ${config.PORT}`));
  })
  .catch((err) => {
    logger.error('MongoDB connection error:', err);
    process.exit(1);
  });
