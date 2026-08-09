import { verifyMessage } from 'ethers';
import jwt from 'jsonwebtoken';

export interface UserIdentity {
  adanId: string;        // E.g., did:adan:0x123... or adan_user_99
  authMethod: 'OAUTH' | 'DID';
  did?: string;
  email?: string;
  roles: string[];
}

export class AdanIdAuthService {
  private static JWT_SECRET = process.env.JWT_SECRET || 'adanid-super-secret-key-2026';
  private static JWT_EXPIRY = '7d';

  /**
   * 1. OAuth / SSO Flow Token Generation
   */
  public static generateSessionToken(user: UserIdentity): string {
    const payload = {
      iss: 'https://adanid.ai',
      sub: user.adanId,
      did: user.did || null,
      email: user.email || null,
      authMethod: user.authMethod,
      roles: user.roles,
    };

    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: '7d' });
  }

  /**
   * 2. DID Authentication (Challenge-Response & Signature Verification)
   */
  public static async verifyDidAuth(
    did: string,
    nonce: string,
    signature: string,
    publicAddress: string
  ): Promise<string> {
    // Challenge verification message format
    const expectedMessage = `Sign in to ADANiD-AI Platform\nNonce: ${nonce}`;
    
    // Recover public address from signature
    const recoveredAddress = verifyMessage(expectedMessage, signature);

    if (recoveredAddress.toLowerCase() !== publicAddress.toLowerCase()) {
      throw new Error('Invalid DID signature: Verification failed.');
    }

    // Prepare unified user object
    const user: UserIdentity = {
      adanId: `did:adan:${publicAddress.toLowerCase()}`,
      did: did,
      authMethod: 'DID',
      roles: ['USER', 'DECENTRALIZED_MEMBER'],
    };

    // Return unified session JWT
    return this.generateSessionToken(user);
  }

  /**
   * 3. Validate Incoming JWT Token for Express Middleware
   */
  public static verifySessionToken(token: string): UserIdentity {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as Record<string, unknown>;
      return {
        adanId: decoded.sub as string,
        authMethod: decoded.authMethod as 'OAUTH' | 'DID',
        did: (decoded.did as string) || undefined,
        email: (decoded.email as string) || undefined,
        roles: (decoded.roles as string[]) || ['USER'],
      };
    } catch {
      throw new Error('Unauthorized access: Invalid or expired token');
    }
  }
}
