import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from './auth-middleware';
import { CONFIG } from '../config/config';
import { VerificationResponse, VerificationRequest, UserData } from '../model/interface';

export class AuthController {
  static async verify(req: Request, res: Response<VerificationResponse>) {
    try {
      const { code } = req.body as VerificationRequest;

      if (code !== CONFIG.VERIFICATION_CODE) {
        return res.status(401).json({ valid: false });
      }

      const token = jwt.sign(
        { userId: 'johnDoe@example.com' },
        CONFIG.JWT_SECRET,
        { expiresIn: CONFIG.TOKEN_EXPIRY }
      );

      return res.status(200).json({
        valid: true,
        token
      });
    } catch (error) {
      console.error('Verification error:', error);
      return res.status(500).json({ valid: false });
    }
  }

  static async getUserData(req: AuthenticatedRequest, res: Response<UserData>) {
    try {
      // In production, fetch from database using req.user.userId
      const userData: UserData = {
        username: 'johnDoe',
        quote: 'Hello, World!',
        photo: 'https://example.com/image.jpg'
      };

      return res.status(200).json(userData);
    } catch (error) {
      console.error('Get user data error:', error);
      return res.status(500).json({
        error: 'Failed to fetch user data'
      } as any);
    }
  }
}