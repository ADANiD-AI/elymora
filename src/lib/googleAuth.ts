import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/documents');
provider.addScope('https://www.googleapis.com/auth/drive.file');
provider.addScope('https://www.googleapis.com/auth/gmail.send');
provider.addScope('https://www.googleapis.com/auth/gmail.compose');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google Sign-In');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    if (error?.code === 'auth/popup-closed-by-user') {
      console.info('Google Sign-In popup closed by user.');
      throw new Error('سائن ان ونڈو بند ہو گئی۔ براہِ کرم بٹن پر دوبارہ کلک کر کے سائن ان کی تصدیق کریں۔');
    } else if (error?.code === 'auth/popup-blocked') {
      console.warn('Google Sign-In popup blocked by browser.');
      throw new Error('پاپ اپ ونڈو براؤزر کی سیکیورٹی کی وجہ سے بلاک ہو گئی ہے۔ براہِ کرم پاپ اپس کی اجازت دیں۔');
    } else if (error?.code === 'auth/cancelled-popup-request') {
      throw new Error('سائن ان پاپ اپ کی پچھلی درخواست منسوخ ہو گئی۔');
    } else if (error?.code === 'auth/unauthorized-domain') {
      throw new Error('یہ ڈومین فائر بیس سیکیورٹی سیٹنگز کی والڈ لسٹ میں شامل کی جا رہی ہے۔');
    }

    console.error('Google Sign-In Error:', error);
    throw new Error(error?.message || 'گوگل سائن ان کے دوران کچھ غیر متوقع دشواری پیش آئی۔');
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logoutGoogle = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};
