import { Router } from 'express';
import { AuthController } from './auth/auth-controller';
import { authenticateToken } from './auth/auth-middleware';

const router = Router();

router.post('/verify', AuthController.verify);
router.get('/auth', authenticateToken, AuthController.getUserData);

export default router;