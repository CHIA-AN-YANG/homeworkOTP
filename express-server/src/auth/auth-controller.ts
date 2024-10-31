import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from './auth-middleware';
import { VerificationResponse, VerificationRequest, UserData } from '../model/interface';
import { logger } from '../utils/logger';
import crypto from 'node:crypto';

export class AuthController {
  static async verify(req: Request, res: Response<VerificationResponse>) {
    try {
      const { code } = req.body as VerificationRequest;
      let serverhash = '';
      if (process.env.VERIFICATION_CODE !== undefined) {
        serverhash = crypto.createHash('sha256').update(process.env.VERIFICATION_CODE).digest('hex');
      }

      const codeMatch = serverhash === code;

      if (!codeMatch) {
        return res.status(401).json({ valid: false });
      }

      const token = jwt.sign(
        { userId: 'johnDoe@example.com' },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );
      return res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0'
      }).status(200).json({ valid: true, token });
    } catch (error) {
      logger.error('Verification error:', error);
      return res.status(500).json({ valid: false });
    }
  }

  static async getUserData(req: AuthenticatedRequest, res: Response<UserData>) {
    try {
      const userData: UserData = {
        username: 'Ryan Reynolds',
        quote: 'Ryan Rodney Reynolds OBC (born October 23, 1976) is a Canadian and American actor, producer, and businessman. ',
        photo: 'https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2161673894.jpg'
      };

      return res.status(200).json(userData);
    } catch (error) {
      logger.error('Get user data error:', error);
      return res.status(500).json({
        error: 'Failed to fetch user data'
      } as any);
    }
  }
}