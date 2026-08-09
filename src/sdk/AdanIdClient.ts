export class AdanIdClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://api.adanid.ai') {
    this.baseUrl = baseUrl;
  }

  // Request a unique Nonce for Web3 DID Challenge
  public async getAuthNonce(did: string): Promise<string> {
    const res = await fetch(`${this.baseUrl}/v1/auth/nonce?did=${encodeURIComponent(did)}`);
    const data = await res.json();
    return data.nonce;
  }

  // Submit Signature & complete DID Authentication
  public async loginWithDID(did: string, signature: string, nonce: string, address: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/v1/auth/did-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ did, signature, nonce, address }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'DID login failed');
    
    return result.accessToken; // Unified JWT
  }

  // Login via OAuth 2.0 / Single Sign-On Code Exchange
  public async loginWithOAuthCode(code: string, provider: string = 'adanid-sso'): Promise<string> {
    const response = await fetch(`${this.baseUrl}/v1/auth/oauth/callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, provider }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'OAuth login failed');

    return result.accessToken;
  }
}
