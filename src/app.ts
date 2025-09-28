import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import config from './config';
import { limiter } from './middleware/rateLimit.middleware';
import { errorHandler } from './middleware/error.middleware';

import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';
import adminRoutes from './routes/admin.routes';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.WHITELIST_ORIGINS }));
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

export default app;
