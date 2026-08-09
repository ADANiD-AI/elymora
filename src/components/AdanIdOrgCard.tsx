import React, { useState } from 'react';
import { ShieldCheck, Cpu, GitBranch, ExternalLink, Copy, Check, Globe, Mail, Terminal, Layers, Users, Lock, Zap, Workflow, Key, Database, ArrowRight } from 'lucide-react';

export const AdanIdOrgCard: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'architecture' | 'auth_service' | 'middleware' | 'client_sdk' | 'cicd' | 'helm' | 'k8s_manifests' | 'summary'>('architecture');

  const helmValuesYaml = `# helm/values.yaml - ADANiD-AI Ecosystem Helm Chart
global:
  environment: production
  domain: adanid.ai

identityApi:
  enabled: true
  replicaCount: 2
  image:
    repository: ghcr.io/adanid-ai/identity-api
    tag: latest
    pullPolicy: Always
  service:
    type: ClusterIP
    port: 3000
  env:
    NODE_ENV: production
    PORT: "3000"
  resources:
    limits:
      cpu: 500m
      memory: 512Mi
    requests:
      cpu: 250m
      memory: 256Mi

ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
  tls:
    - secretName: adanid-tls-cert
      hosts:
        - api.adanid.ai`;

  const k8sManifestsYaml = `# k8s/identity-api-k8s.yaml - Kubernetes Production Manifests
apiVersion: apps/v1
kind: Deployment
metadata:
  name: adanid-identity-api
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      app: identity-api
  template:
    metadata:
      labels:
        app: identity-api
    spec:
      containers:
        - name: identity-api
          image: ghcr.io/adanid-ai/identity-api:latest
          ports:
            - containerPort: 3000
          envFrom:
            - configMapRef:
                name: identity-api-config
            - secretRef:
                name: identity-api-secret
          resources:
            requests:
              cpu: "250m"
              memory: "256Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
---
apiVersion: v1
kind: Service
metadata:
  name: adanid-identity-api
spec:
  type: ClusterIP
  ports:
    - port: 3000
      targetPort: 3000
  selector:
    app: identity-api`;

  const authServiceCode = `// src/services/AdanIdAuthService.ts
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

  public static generateSessionToken(user: UserIdentity): string {
    const payload = {
      iss: 'https://adanid.ai',
      sub: user.adanId,
      did: user.did || null,
      email: user.email || null,
      authMethod: user.authMethod,
      roles: user.roles,
    };

    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRY });
  }

  public static async verifyDidAuth(
    did: string,
    nonce: string,
    signature: string,
    publicAddress: string
  ): Promise<string> {
    const expectedMessage = \`Sign in to ADANiD-AI Platform\\nNonce: \${nonce}\`;
    const recoveredAddress = verifyMessage(expectedMessage, signature);

    if (recoveredAddress.toLowerCase() !== publicAddress.toLowerCase()) {
      throw new Error('Invalid DID signature check failed.');
    }

    const user: UserIdentity = {
      adanId: \`did:adan:\${publicAddress.toLowerCase()}\`,
      did: did,
      authMethod: 'DID',
      roles: ['USER', 'DECENTRALIZED_MEMBER'],
    };

    return this.generateSessionToken(user);
  }

  public static verifySessionToken(token: string): UserIdentity {
    const decoded = jwt.verify(token, this.JWT_SECRET) as any;
    return {
      adanId: decoded.sub,
      authMethod: decoded.authMethod,
      did: decoded.did,
      email: decoded.email,
      roles: decoded.roles,
    };
  }
}`;

  const middlewareCode = `// src/middleware/adanIdAuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { AdanIdAuthService } from '../services/AdanIdAuthService';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const requireAdanIdAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Missing authorization token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = AdanIdAuthService.verifySessionToken(token);
    req.user = user;
    next();
  } catch (err: any) {
    return res.status(403).json({ success: false, message: err.message });
  }
};`;

  const clientSdkCode = `// src/sdk/AdanIdClient.ts
export class AdanIdClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://api.adanid.ai') {
    this.baseUrl = baseUrl;
  }

  public async getAuthNonce(did: string): Promise<string> {
    const res = await fetch(\`\${this.baseUrl}/v1/auth/nonce?did=\${encodeURIComponent(did)}\`);
    const data = await res.json();
    return data.nonce;
  }

  public async loginWithDID(did: string, signature: string, nonce: string, address: string) {
    const response = await fetch(\`\${this.baseUrl}/v1/auth/did-login\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ did, signature, nonce, address }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    
    return result.accessToken; // Unified JWT
  }
}`;

  const k8sDeployYaml = `name: Build Docker Image and Deploy to Kubernetes

on:
  push:
    branches:
      - main
    tags:
      - 'v*.*.*'

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}
  KUBECONFIG: \${{ secrets.KUBE_CONFIG }}

jobs:
  build-and-push:
    name: Build & Push Docker Image
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/\${{ github.repository }}:latest

  deploy-to-k8s:
    name: Deploy to Kubernetes Cluster
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: azure/setup-kubectl@v3
      - name: Deploy Image to K8s
        run: |
          kubectl set image deployment/adanid-identity-api identity-api=ghcr.io/\${{ github.repository }}:commit-\${GITHUB_SHA:0:7}
          kubectl rollout status deployment/adanid-identity-api -n default`;

  const orgName = "ADANiD-AI";
  const orgWebsite = "https://adanid.ai";
  const orgEmail = "admin@adanid.com";
  const orgGithubUrl = "https://github.com/ADANiD-AI";

  const gitRemoteCommands = `# 1. Set Remote URL to ADANiD-AI Organization Repository
git remote set-url origin https://github.com/ADANiD-AI/elymora.git

# 2. Verify Remote Setup
git remote -v

# 3. Push main branch and tags to ADANiD-AI
git push -u origin main
git push origin --tags`;

  const mobileCiYaml = `name: Build Mobile Apps

on:
  push:
    branches: [ main ]

jobs:
  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install Dependencies
        run: npm ci
      - name: Build Android Bundle/APK
        run: npx react-native build-android --mode=release`;

  const ssoSnippet = `// adan-id-opencloud Single Sign-On (SSO) & DID Authentication Protocol
import { AdanIdSDK } from '@adanid/opencloud-sdk';

export const adanIdAuth = new AdanIdSDK({
  appId: 'elymora-studio-v1',
  network: 'mainnet',
  didResolver: 'https://did.adanid.ai/resolve',
  enableERC4337Wallet: true,
});

// Single Sign-On Handler across elymora, mobi_verse, and QuranLab
export async function authenticateUserSession() {
  const session = await adanIdAuth.connectWalletAndDID();
  console.log('✅ Authenticated ADANiD-AI DID:', session.did);
  return session;
}`;

  const repositories = [
    { name: 'elymora', lang: 'TypeScript', role: 'Mobile/Web Front-end & AI Suite', action: 'GitHub Pages + Android Release Pipelines' },
    { name: 'adan-id-opencloud', lang: 'JavaScript', role: 'Identity & Auth Layer (DIDs/VCs)', action: 'Single Sign-On (SSO) API کا قیام' },
    { name: 'mobi_verse', lang: 'Java', role: 'Java/Android Smart Wallet Engine', action: 'Shared Identity Modules کی انٹیگریشن' },
    { name: 'QuranLab', lang: 'JavaScript', role: 'Knowledge / EdTech Engine', action: 'OpenCloud SDK کے ساتھ ڈیٹا کا تبادلہ' },
    { name: 'metamask-docs', lang: 'MDX', role: 'Web3 Wallet Docs & Developer Portal', action: 'DApp Developers Guide Update' },
  ];

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 shadow-2xl space-y-5 text-right" dir="rtl">
      {/* Organization Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600/20 border border-emerald-500/40 rounded-xl text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">آرگنائزیشن روڈ میپ (ADANiD-AI Ecosystem Hub)</h3>
              <span className="bg-emerald-900/60 border border-emerald-500/50 text-emerald-300 font-mono text-[11px] px-2.5 py-0.5 rounded-full font-bold">
                @ADANiD-AI
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              تمام ایپس (<strong>elymora</strong>, <strong>adan-id-opencloud</strong>, <strong>mobi_verse</strong>, <strong>QuranLab</strong>) کو محفوظ اور مربوط کرنے کا مکمل روڈ میپ۔
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={orgGithubUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/20"
          >
            <Users className="w-3.5 h-3.5 text-slate-950" />
            <span>ADANiD-AI Organization</span>
            <ExternalLink className="w-3 h-3 text-slate-950" />
          </a>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold gap-1">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activeTab === 'architecture' ? 'bg-emerald-600 text-slate-950 shadow-md font-extrabold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>1. Architecture & SSO</span>
        </button>

        <button
          onClick={() => setActiveTab('auth_service')}
          className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activeTab === 'auth_service' ? 'bg-emerald-600 text-slate-950 shadow-md font-extrabold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>2. Auth Service (OAuth + DID)</span>
        </button>

        <button
          onClick={() => setActiveTab('middleware')}
          className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activeTab === 'middleware' ? 'bg-emerald-600 text-slate-950 shadow-md font-extrabold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>3. Express Middleware</span>
        </button>

        <button
          onClick={() => setActiveTab('client_sdk')}
          className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activeTab === 'client_sdk' ? 'bg-emerald-600 text-slate-950 shadow-md font-extrabold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>4. Client SDK</span>
        </button>

        <button
          onClick={() => setActiveTab('cicd')}
          className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activeTab === 'cicd' ? 'bg-emerald-600 text-slate-950 shadow-md font-extrabold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Workflow className="w-3.5 h-3.5" />
          <span>5. CI/CD & Deploy</span>
        </button>

        <button
          onClick={() => setActiveTab('helm')}
          className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activeTab === 'helm' ? 'bg-emerald-600 text-slate-950 shadow-md font-extrabold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>6. Helm Chart</span>
        </button>

        <button
          onClick={() => setActiveTab('k8s_manifests')}
          className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activeTab === 'k8s_manifests' ? 'bg-emerald-600 text-slate-950 shadow-md font-extrabold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>7. K8s Manifests</span>
        </button>

        <button
          onClick={() => setActiveTab('summary')}
          className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activeTab === 'summary' ? 'bg-emerald-600 text-slate-950 shadow-md font-extrabold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>8. Roadmap Summary</span>
        </button>
      </div>

      {/* TAB 1: Architecture & SSO */}
      {activeTab === 'architecture' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-emerald-400" />
                <span>Unified Authentication Architecture (OAuth 2.0 / OIDC + W3C DID):</span>
              </span>
              <button
                onClick={() => copyToClipboard(ssoSnippet, 'sso')}
                className="bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
              >
                {copiedKey === 'sso' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'sso' ? 'کاپی ہو گیا!' : 'کوڈ کاپی کریں'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              `adan-id-opencloud` کے تحت OAuth 2.0 / OIDC اور W3C DID (Decentralized Identifier) پروٹوکولز کو یکجا کیا گیا ہے تاکہ تمام ایپس (<strong>elymora</strong>, <strong>mobi_verse</strong>, <strong>QuranLab</strong>) بغیر پاسورڈ کے محفوظ اور یکساں JWT سیشنز استعمال کر سکیں۔
            </p>

            <pre className="bg-slate-950 p-3 rounded-lg text-emerald-300 font-mono text-[11px] ltr text-left border border-slate-800 overflow-x-auto">
              {ssoSnippet}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 2: Auth Service Code */}
      {activeTab === 'auth_service' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>1. Unified Authentication Service (`src/services/AdanIdAuthService.ts`):</span>
              </span>
              <button
                onClick={() => copyToClipboard(authServiceCode, 'auth_service')}
                className="bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
              >
                {copiedKey === 'auth_service' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'auth_service' ? 'کاپی ہو گیا!' : 'کوڈ کاپی کریں'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300">
              یہ سروس OAuth 2.0 سیشنز اور Web3 / DID ڈیجیٹل سگنیچرز کو ویریفائی کر کے مشترکہ JWT جاری کرتی ہے۔
            </p>

            <pre className="bg-slate-950 p-3 rounded-lg text-emerald-300 font-mono text-[11px] ltr text-left border border-slate-800 overflow-x-auto max-h-96">
              {authServiceCode}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: Middleware Code */}
      {activeTab === 'middleware' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>2. Express Authentication Middleware (`src/middleware/adanIdAuthMiddleware.ts`):</span>
              </span>
              <button
                onClick={() => copyToClipboard(middlewareCode, 'middleware')}
                className="bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
              >
                {copiedKey === 'middleware' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'middleware' ? 'کاپی ہو گیا!' : 'کوڈ کاپی کریں'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300">
              اس مڈل ویئر کو تمام مائیکرو سروسز میں ای پی آئی روٹس کو محفوظ بنانے کے لیے استعمال کیا جاتا ہے۔
            </p>

            <pre className="bg-slate-950 p-3 rounded-lg text-emerald-300 font-mono text-[11px] ltr text-left border border-slate-800 overflow-x-auto max-h-80">
              {middlewareCode}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 4: Client SDK Code */}
      {activeTab === 'client_sdk' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>3. Client Integration SDK (`src/sdk/AdanIdClient.ts`):</span>
              </span>
              <button
                onClick={() => copyToClipboard(clientSdkCode, 'client_sdk')}
                className="bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
              >
                {copiedKey === 'client_sdk' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'client_sdk' ? 'کاپی ہو گیا!' : 'کوڈ کاپی کریں'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300">
              یہ کلائنٹ ایس ڈی کے React, React Native اور ویب کلائنٹس کو ADANiD-AI گیٹ وے سے جوڑتا ہے۔
            </p>

            <pre className="bg-slate-950 p-3 rounded-lg text-emerald-300 font-mono text-[11px] ltr text-left border border-slate-800 overflow-x-auto max-h-80">
              {clientSdkCode}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 2: Multi-App CI/CD */}
      {activeTab === 'cicd' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Workflow className="w-4 h-4 text-emerald-400" />
                <span>موبائل و ویب ملٹی ایپ CI/CD پروسیس (`.github/workflows/mobile-ci.yml`):</span>
              </span>
              <button
                onClick={() => copyToClipboard(mobileCiYaml, 'mobile_ci')}
                className="bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
              >
                {copiedKey === 'mobile_ci' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'mobile_ci' ? 'کاپی ہو گیا!' : 'YAML کاپی کریں'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300">
              یہ خودکار ورک فلو پروژیکٹ میں <code className="text-emerald-300 bg-slate-950 px-1 rounded font-mono">.github/workflows/mobile-ci.yml</code> کے طور پر سیو کر دیا گیا ہے۔ یہ React Native اور Android APKs کو خودکار بلڈ کرتا ہے۔
            </p>

            <pre className="bg-slate-950 p-3 rounded-lg text-emerald-300 font-mono text-[11px] ltr text-left border border-slate-800 overflow-x-auto max-h-60">
              {mobileCiYaml}
            </pre>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Docker Image Build & Kubernetes Rollout Pipeline (`.github/workflows/docker-k8s-deploy.yml`):</span>
              </span>
              <button
                onClick={() => copyToClipboard(k8sDeployYaml, 'k8s_deploy')}
                className="bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
              >
                {copiedKey === 'k8s_deploy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'k8s_deploy' ? 'کاپی ہو گیا!' : 'YAML کاپی کریں'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300">
              یہ ورک فلو GitHub Container Registry (ghcr.io) پر Docker Image بلڈ کرتا ہے اور خودکار طور پر Kubernetes Cluster پر نیا ورژن Rollout کرتا ہے۔
            </p>

            <pre className="bg-slate-950 p-3 rounded-lg text-emerald-300 font-mono text-[11px] ltr text-left border border-slate-800 overflow-x-auto max-h-72">
              {k8sDeployYaml}
            </pre>
          </div>
        </div>
      )}

      {/* TAB: Helm Chart */}
      {activeTab === 'helm' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>ADANiD-AI Ecosystem Helm Chart (`helm/values.yaml`):</span>
              </span>
              <button
                onClick={() => copyToClipboard(helmValuesYaml, 'helm_values')}
                className="bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
              >
                {copiedKey === 'helm_values' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'helm_values' ? 'کاپی ہو گیا!' : 'YAML کاپی کریں'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300">
              یہ پریمیم ہیلم چارٹ تمام مائیکرو سروسز، کلسٹر آئی پی سروسز، اینگریس روٹس، اور SSL سلیبس کی خودکار کنفیگریشن سنبھالتا ہے۔
            </p>

            <pre className="bg-slate-950 p-3 rounded-lg text-emerald-300 font-mono text-[11px] ltr text-left border border-slate-800 overflow-x-auto max-h-80">
              {helmValuesYaml}
            </pre>
          </div>
        </div>
      )}

      {/* TAB: Kubernetes Manifests */}
      {activeTab === 'k8s_manifests' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Production Kubernetes Bundle (`k8s/identity-api-k8s.yaml`):</span>
              </span>
              <button
                onClick={() => copyToClipboard(k8sManifestsYaml, 'k8s_manifests')}
                className="bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
              >
                {copiedKey === 'k8s_manifests' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'k8s_manifests' ? 'کاپی ہو گیا!' : 'YAML کاپی کریں'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300">
              اس مینی فیسٹ فائل میں Deployment, ConfigMap, Secret, ClusterIP Service, اور Horizontal Pod Autoscaler (HPA) شامل ہیں۔
            </p>

            <pre className="bg-slate-950 p-3 rounded-lg text-emerald-300 font-mono text-[11px] ltr text-left border border-slate-800 overflow-x-auto max-h-80">
              {k8sManifestsYaml}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: Smart Contracts & ERC-4337 */}
      {activeTab === 'smartcontracts' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Smart Contracts & Cross-Chain Gateway Setup (ERC-4337 & sBTC):</span>
            </span>

            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Account Abstraction (ERC-4337):</strong> صارفین کو بغیر گیس فیس کی پیچیدگی کے والیٹ فراہم کرنے کے لیے سمارٹ والیٹس کی سہولت۔</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Chainlink / Stacks Integration:</strong> sBTC گیٹ وے کے لیے اوریکل نوڈز کا قیام تاکہ محفوظ کراس چین پورٹ فولیو مینجمنٹ ممکن ہو سکے۔</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 4: Summary Table Roadmap */}
      {activeTab === 'summary' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-xs text-right">
              <thead className="bg-slate-900 text-emerald-300 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">ایپ / ریپوزیٹری</th>
                  <th className="p-3">مرکزی ذمہ داری</th>
                  <th className="p-3">لازمی اقدام (Action Roadmap)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950 text-slate-300">
                {repositories.map((item) => (
                  <tr key={item.name} className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono font-bold text-emerald-400">{item.name}</td>
                    <td className="p-3 text-slate-300">{item.role}</td>
                    <td className="p-3 font-semibold text-amber-300">{item.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sync Commands */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>گٹ ریموٹ کنفیگریشن کمانڈز (Git Commands for ADANiD-AI):</span>
          </span>
          <button
            onClick={() => copyToClipboard(gitRemoteCommands, 'git_remote')}
            className="bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
          >
            {copiedKey === 'git_remote' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>کمانڈز کاپی ہو گئیں!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>کمانڈز کاپی کریں</span>
              </>
            )}
          </button>
        </div>

        <pre className="bg-slate-950 p-3 rounded-lg text-emerald-300 font-mono text-[11px] ltr text-left border border-slate-800 overflow-x-auto">
          {gitRemoteCommands}
        </pre>
      </div>
    </div>
  );
};
