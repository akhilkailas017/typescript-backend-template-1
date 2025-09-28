import { Router } from 'express';
import { getAllUsers } from '../controllers/admin.controller';
import { authorizeAdmin } from '../middleware/auth.middleware';

const router = Router();
router.get('/users', authorizeAdmin, getAllUsers);

export default router;
