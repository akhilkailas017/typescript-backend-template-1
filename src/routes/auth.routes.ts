import { Router } from 'express';
import { register, login, refreshToken, logout } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../validators/auth.validator';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

export default router;
