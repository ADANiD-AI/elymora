import { AdanIdUnifiedAuthSDK, AuthSession } from './sdk/AdanIdUnifiedAuthSDK';

export class AppController {
  private sdk: AdanIdUnifiedAuthSDK;

  constructor() {
    this.sdk = new AdanIdUnifiedAuthSDK('https://api.adanid.ai');
  }

  // 1. Initial Launch Test Check
  public async initializeApp(): Promise<boolean> {
    try {
      const isBiometricReady = await this.sdk.isBiometricsSupported();
      console.log('Biometric Hardware Available:', isBiometricReady);
      return true;
    } catch (error) {
      console.error('App initialization check failed:', error);
      return false;
    }
  }

  // 2. Fast Biometric Login Flow
  public async handleBiometricLogin(adanId: string = 'did:adan:user'): Promise<{ success: boolean; session?: AuthSession; error?: string }> {
    try {
      const session = await this.sdk.loginWithBiometrics(adanId);
      return { success: true, session };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // 3. Complete Wallet Sign-In Flow & Save Session
  public async handleWalletAuth(address: string, signature: string, nonce: string) {
    try {
      const response = await fetch('https://api.adanid.ai/v1/auth/did-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          did: `did:adan:${address.toLowerCase()}`,
          address,
          signature,
          nonce,
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.accessToken) {
        // Secure Token in Biometric Vault for Next Logins
        await this.sdk.saveBiometricSession(`did:adan:${address.toLowerCase()}`, data.accessToken);
        return { success: true, token: data.accessToken };
      }
      
      throw new Error(data.message || 'Login failed');
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
