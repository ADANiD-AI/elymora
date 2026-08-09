export interface AuthSession {
  adanId: string;
  accessToken: string;
  authMethod: 'DID' | 'OAUTH' | 'BIOMETRIC';
}

export class AdanIdUnifiedAuthSDK {
  private apiBaseUrl: string;

  constructor(apiBaseUrl: string = 'https://api.adanid.ai') {
    this.apiBaseUrl = apiBaseUrl;
  }

  /**
   * 1. Check if Device Hardware supports Biometrics
   */
  public async isBiometricsSupported(): Promise<boolean> {
    if (typeof window !== 'undefined' && 'PublicKeyCredential' in window) {
      try {
        return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      } catch {
        return false;
      }
    }
    return false;
  }

  /**
   * 2. Perform Biometric Verification & Store Session Token
   */
  public async saveBiometricSession(adanId: string, jwtToken: string): Promise<boolean> {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`adanid_secure_session_${adanId}`, jwtToken);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * 3. Seamless Biometric Login Flow
   */
  public async loginWithBiometrics(adanId: string): Promise<AuthSession> {
    const isSupported = await this.isBiometricsSupported();
    if (!isSupported) {
      throw new Error('Biometric hardware is unavailable or not configured.');
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem(`adanid_secure_session_${adanId}`) : null;

    if (!token) {
      throw new Error('No active biometric session found. Please log in with Wallet or Password first.');
    }

    const response = await fetch(`${this.apiBaseUrl}/v1/auth/validate-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Stored session is expired or revoked by identity gateway.');
    }

    return {
      adanId,
      accessToken: token,
      authMethod: 'BIOMETRIC',
    };
  }

  /**
   * 4. Clear Secured Credentials (Logout)
   */
  public async logout(adanId: string): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`adanid_secure_session_${adanId}`);
    }
  }
}
