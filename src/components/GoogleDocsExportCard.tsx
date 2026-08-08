import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, getAccessToken, logoutGoogle } from '../lib/googleAuth';
import { createOrUpdateGoogleDocument, sendGmailEmail, MASTER_DOC_TITLE } from '../lib/googleDocsExport';
import { FileText, LogOut, ExternalLink, Mail, CheckCircle2, RefreshCw, AlertCircle, Save, Send, Eye, ShieldCheck } from 'lucide-react';

interface GoogleDocsExportCardProps {
  gbpData: {
    businessName: string;
    category: string;
    description: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    website: string;
    keywords: string;
  };
}

export const GoogleDocsExportCard: React.FC<GoogleDocsExportCardProps> = ({ gbpData }) => {
  const [user, setUser] = useState<User | null>(null);
  const [recipientEmail, setRecipientEmail] = useState<string>('adnanMd76@gmail.com');
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [isGeneratingDoc, setIsGeneratingDoc] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  
  const [docResult, setDocResult] = useState<{ documentId: string; docUrl: string; updated: boolean } | null>(null);
  const [emailStatus, setEmailStatus] = useState<{ sent: boolean; messageId?: string; error?: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = initAuth(
      (u) => {
        setUser(u);
        if (u.email) setRecipientEmail(u.email);
        setIsAuthChecking(false);
      },
      () => {
        setUser(null);
        setIsAuthChecking(false);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setErrorMsg(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        if (res.user.email) setRecipientEmail(res.user.email);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'گوگل سائن ان میں کچھ دشواری پیش آئی۔');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await logoutGoogle();
    setUser(null);
    setDocResult(null);
    setEmailStatus(null);
  };

  const triggerGmailSend = async (token: string, docUrl: string) => {
    setIsSendingEmail(true);
    try {
      const subject = `[Elymora Studio] ${MASTER_DOC_TITLE}`;
      const body = `السلام علیکم،\n\nایلیمورا اسٹوڈیو کی ماسٹر پروجیکٹ رپورٹ کامیابی سے گوگل ڈرائیو میں اپ ڈیٹ کر دی گئی ہے۔\n\nمرکزی گوگل ڈاکومنٹ لنک:\n${docUrl}\n\nتفصیلات:\n- بزنس نام: ${gbpData.businessName || 'Elymora Digital'}\n- شہر: ${gbpData.city || 'Lahore'}\n- تاریخ: ${new Date().toLocaleString()}\n\nشکریہ،\nElymora Digital AI Suite`;
      
      const emailRes = await sendGmailEmail(token, recipientEmail, subject, body);
      setEmailStatus({ sent: true, messageId: emailRes.messageId });
    } catch (err: any) {
      console.warn('Gmail API auto send failed:', err);
      setEmailStatus({ sent: false, error: err.message || 'خودکار جی میل ارسال نہ ہو سکی۔' });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleExportToGoogleDocs = async () => {
    setIsGeneratingDoc(true);
    setErrorMsg(null);
    setEmailStatus(null);

    try {
      let token = getAccessToken();
      if (!token) {
        const res = await googleSignIn();
        if (!res?.accessToken) {
          throw new Error('براہِ کرم گوگل سائن ان کر کے ایکسس ٹوکن حاصل کریں۔');
        }
        setUser(res.user);
        if (res.user.email) setRecipientEmail(res.user.email);
        token = res.accessToken;
      }

      const formattedDate = new Date().toLocaleDateString('ur-PK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const docRes = await createOrUpdateGoogleDocument(token, {
        ...gbpData,
        generatedDate: formattedDate,
      });

      setDocResult(docRes);
      setShowPreview(true);

      // Automatically trigger Gmail send
      await triggerGmailSend(token, docRes.docUrl);

    } catch (err: any) {
      setErrorMsg(err.message || 'گوگل ڈاکومنٹ یا جی میل سنک میں ناکامی ہوئی۔');
    } finally {
      setIsGeneratingDoc(false);
    }
  };

  const handleManualEmailSend = async () => {
    if (!docResult) return;
    let token = getAccessToken();
    if (!token) {
      const res = await googleSignIn();
      if (!res?.accessToken) return;
      token = res.accessToken;
    }
    await triggerGmailSend(token, docResult.docUrl);
  };

  const gmailComposeUrl = docResult
    ? `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(
        `${MASTER_DOC_TITLE}`
      )}&body=${encodeURIComponent(
        `السلام علیکم،\n\n${MASTER_DOC_TITLE} کی جدید ترین فائل گوگل ڈرائیو میں اپ ڈیٹ ہو چکی ہے۔ آپ اسے درج ذیل لنک پر دیکھ سکتے ہیں:\n\n${docResult.docUrl}\n\nشکریہ۔`
      )}`
    : '#';

  return (
    <div className="bg-slate-950 border border-blue-500/30 rounded-2xl p-5 shadow-2xl space-y-5 text-right" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600/20 border border-blue-500/40 rounded-xl text-blue-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>مرکزی گوگل ڈاکومنٹ سنک و جی میل آٹو سینڈ (Google Docs & Gmail Hub)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              یہ ہب آپ کے پورے پروجیکٹ کو ڈرائیو کی ایک فائل <strong className="text-amber-300">"{MASTER_DOC_TITLE}"</strong> میں سنک کرتا ہے اور خود بخود جی میل پر ای میل بھیجتا ہے۔
            </p>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-200 font-medium">{user.displayName || user.email}</span>
            <button
              onClick={handleSignOut}
              className="text-rose-400 hover:text-rose-300 p-1 mr-1 transition cursor-pointer"
              title="سائن آؤٹ"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="p-3 bg-rose-950/80 border border-rose-500/40 rounded-xl text-rose-200 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Auth state or Actions */}
      {!user ? (
        <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-300 space-y-1">
            <p className="font-bold text-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>گوگل اکاؤنٹ سے منسلک کریں:</span>
            </p>
            <p className="text-[11px] text-slate-400">
              گوگل ڈرائیو میں اسی مرکزی فائل میں ایڈٹ اور جی میل سے خودکار ای میل کے لیے سائن ان کریں۔
            </p>
          </div>

          <button
            onClick={handleSignIn}
            disabled={isSigningIn || isAuthChecking}
            className="gsi-material-button cursor-pointer flex-shrink-0"
            style={{
              backgroundColor: '#131314',
              borderRadius: '12px',
              border: '1px solid #4285F4',
              color: '#FFFFFF',
              padding: '10px 18px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            </svg>
            <span>{isSigningIn ? 'سائن ان ہو رہا ہے...' : 'Sign in with Google'}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Recipient Email Input & Trigger */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-medium text-slate-300 block">
                جی میل موصول کنندہ کا ای میل ایڈریس (Recipient Email):
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="adnanMd76@gmail.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 ltr text-left"
                  dir="ltr"
                />
              </div>
            </div>

            <button
              onClick={handleExportToGoogleDocs}
              disabled={isGeneratingDoc || isSendingEmail}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold px-4 py-2.5 rounded-lg text-xs transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingDoc ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>ڈاکومنٹ و جی میل سنک...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-emerald-300" />
                  <span>سنک و جی میل ارسال کریں</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Document Card Result */}
          {docResult && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-emerald-800/60 pb-3">
                <span className="text-xs font-bold text-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    {docResult.updated
                      ? `گوگل ڈرائیو میں مرکزی فائل "${MASTER_DOC_TITLE}" اپ ڈیٹ ہو گئی ہے!`
                      : `گوگل ڈرائیو میں نئی مرکزی فائل "${MASTER_DOC_TITLE}" تخلیق کر دی گئی ہے!`}
                  </span>
                </span>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700">
                  ID: {docResult.documentId.substring(0, 12)}...
                </span>
              </div>

              {/* Status Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-lg flex items-center justify-between">
                  <span className="text-slate-300 font-medium">گوگل ڈرائیو فائل status:</span>
                  <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    ✓ Updated in Drive
                  </span>
                </div>

                <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-lg flex items-center justify-between">
                  <span className="text-slate-300 font-medium">جی میل آٹو سینڈ (Gmail API):</span>
                  {isSendingEmail ? (
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      ارسال ہو رہا ہے...
                    </span>
                  ) : emailStatus?.sent ? (
                    <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      ✓ Sent to {recipientEmail}
                    </span>
                  ) : (
                    <span className="text-amber-300 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                      {emailStatus?.error ? 'توجہ طلب' : 'Manual Ready'}
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex flex-wrap gap-2">
                  <a
                    href={docResult.docUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>گوگل ڈاکس (Docs) میں دیکھالیں</span>
                  </a>

                  <button
                    onClick={handleManualEmailSend}
                    disabled={isSendingEmail}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>دوبارہ جی میل ای میل بھیجیں (Gmail API)</span>
                  </button>

                  <a
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-md"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>جی میل ویب ایپ ڈرافٹ (Compose)</span>
                  </a>
                </div>

                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-xs text-blue-300 hover:text-blue-200 underline flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showPreview ? 'لائیو پریویو چھپائیں' : 'لائیو پریویو دکھائیں'}</span>
                </button>
              </div>

              {/* Embedded Live Google Doc Preview */}
              {showPreview && (
                <div className="mt-3 space-y-2 border-t border-emerald-800/60 pt-3">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>براہ راست گوگل ڈاکومنٹ لائیو ویو (Live Google Doc Screen):</span>
                    </span>
                    <span className="text-[11px] text-slate-400">اپ ڈیٹ شدہ فائل یہاں اسکرین پر دکھائی جا رہی ہے</span>
                  </div>

                  <div className="w-full h-[450px] rounded-xl overflow-hidden border border-slate-700 bg-white shadow-2xl relative">
                    <iframe
                      src={`https://docs.google.com/document/d/${docResult.documentId}/preview`}
                      className="w-full h-full border-none"
                      title="Google Doc Live Viewer"
                      allow="autoplay"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
