import { celebrate } from 'celebrate';
import { Router } from 'express';
import { getUserInfo, login, logout } from '../controllers/authController.js';
import { authenticate } from '../middleware/authenticate.js';
import { loginSchema } from '../validation/authValidation.js';

const router = Router();

router.post('/login', celebrate(loginSchema), login);
router.get('/logout', authenticate, logout);
router.get('/user-info', authenticate, getUserInfo);

export default router;
