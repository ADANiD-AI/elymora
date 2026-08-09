import { Router, Response } from 'express';
import { requireAdanIdAuth, AuthenticatedRequest } from '../middleware/adanIdAuthMiddleware';

const router = Router();

/**
 * Endpoint: POST /v1/auth/validate-session
 * Validates active JWT session during Biometric login
 */
router.post('/validate-session', requireAdanIdAuth, (req: AuthenticatedRequest, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Session is valid',
    user: req.user,
  });
});

export default router;
