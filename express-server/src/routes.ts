import { Router } from 'express';
import { AuthController } from './auth/auth-controller.js';
import { authenticateToken } from './auth/auth-middleware.js';

const router = Router();

router.post('/verify', AuthController.verify);
router.get('/auth', authenticateToken, AuthController.getUserData);

export default router;