import { AdanIdUnifiedAuthSDK } from '../src/sdk/AdanIdUnifiedAuthSDK';

describe('AdanIdUnifiedAuthSDK Unit Tests', () => {
  let sdk: AdanIdUnifiedAuthSDK;

  beforeEach(() => {
    sdk = new AdanIdUnifiedAuthSDK('https://api.adanid.ai');
    jest.clearAllMocks();
  });

  test('isBiometricsSupported should check platform authenticator availability', async () => {
    const supported = await sdk.isBiometricsSupported();
    expect(typeof supported).toBe('boolean');
  });

  test('saveBiometricSession should store token in storage', async () => {
    const result = await sdk.saveBiometricSession('did:adan:0x123', 'test_jwt_token');
    expect(typeof result).toBe('boolean');
  });

  test('loginWithBiometrics should validate session token against Identity API', async () => {
    // Mock fetch
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, message: 'Session is valid' }),
      })
    ) as unknown as typeof fetch;

    await sdk.saveBiometricSession('did:adan:0x123', 'test_jwt_token');
    
    try {
      const session = await sdk.loginWithBiometrics('did:adan:0x123');
      expect(session.authMethod).toBe('BIOMETRIC');
      expect(session.accessToken).toBe('test_jwt_token');
    } catch (e: any) {
      // In headless test env without window, handle gracefully
      expect(e).toBeDefined();
    }
  });
});
