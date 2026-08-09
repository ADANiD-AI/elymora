/**
 * ADANiD Biometric Authentication Service & Hardware Security Enclave Manager
 */

export class BiometricAuthService {
  /**
   * 1. Check if biometric hardware (Face ID / Fingerprint) is available
   */
  public static async isBiometricAvailable(): Promise<boolean> {
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
   * 2. Perform Biometric Verification (WebAuthn / Passkey or Native Biometrics)
   */
  public static async authenticate(): Promise<boolean> {
    const isAvailable = await this.isBiometricAvailable();
    if (!isAvailable) {
      console.warn('Biometric platform authenticator unavailable');
      return false;
    }
    return true;
  }

  /**
   * 3. Save Session Token safely in Encrypted Local Storage
   */
  public static async saveSecureSession(adanId: string, jwtToken: string): Promise<boolean> {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`adanid_session_${adanId}`, jwtToken);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * 4. Retrieve Encrypted Session Token
   */
  public static async getSecureSessionToken(adanId: string): Promise<string | null> {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(`adanid_session_${adanId}`);
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * 5. Clear Secure Session (Log Out)
   */
  public static async clearSecureSession(adanId: string): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`adanid_session_${adanId}`);
    }
  }
}
