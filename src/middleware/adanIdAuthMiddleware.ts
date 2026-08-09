import { Request, Response, NextFunction } from 'express';
import { AdanIdAuthService, UserIdentity } from '../services/AdanIdAuthService';

export interface AuthenticatedRequest extends Request {
  user?: UserIdentity;
}

export const requireAdanIdAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Missing authorization bearer token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = AdanIdAuthService.verifySessionToken(token);
    req.user = user;
    next();
  } catch (err: unknown) {
    const error = err as Error;
    return res.status(403).json({ success: false, message: error.message });
  }
};
