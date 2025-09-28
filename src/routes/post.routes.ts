import { Router } from 'express';
import { createPost, getPosts } from '../controllers/post.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
router.post('/', authenticate, createPost);
router.get('/', authenticate, getPosts);

export default router;
