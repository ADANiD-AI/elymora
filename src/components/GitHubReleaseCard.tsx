import React, { useState } from 'react';
import { GitPullRequest, Copy, Check, ExternalLink, Smartphone, Globe, Terminal, Sparkles, UploadCloud } from 'lucide-react';

export const GitHubReleaseCard: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const releaseTag = "v0.1.0-alpha";
  const releaseTitle = "Elymora Web Preview & Initial Android Draft - v0.1.0-alpha";
  const webPagesUrl = "https://Adnanmd76.github.io/elymora/";
  const githubRepoUrl = "https://github.com/Adnanmd76/elymora";
  const newReleaseUrl = `${githubRepoUrl}/releases/new`;

  const releaseMarkdown = `## 🚀 Elymora Initial Alpha Release (v0.1.0-alpha)

### 🌟 What's Included:
- **Web Interface:** Live initial dashboard & landing page design hosted via GitHub Pages.
- **Android Support (Draft/APK):** Initial package configuration and setup for cross-platform integration.
- **AI Conference Engine Architecture:** Core configuration models and API client specs.

### 📌 Deployment Details:
- **Web App:** ${webPagesUrl}
- **Target Environments:** Web / Android / iOS`;

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  return (
    <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 shadow-2xl space-y-5 text-right" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-600/20 border border-purple-500/40 rounded-xl text-purple-400">
            <GitPullRequest className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">گٹ ہب پرائمری ریلیز مینیجر (GitHub Release Manager)</h3>
              <span className="bg-purple-900/60 border border-purple-500/50 text-purple-300 font-mono text-[11px] px-2 py-0.5 rounded-full font-bold">
                {releaseTag}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              پروژیکٹ <strong>Elymora</strong> کی گٹ ہب پر پہلی آفیشل الفا ریلیز (v0.1.0-alpha) اور اینڈرائیڈ پیکیج گائیڈ۔
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={newReleaseUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-purple-600/20"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>گٹ ہب ریلیز پیج کھولیں</span>
          </a>
        </div>
      </div>

      {/* Step-by-Step GitHub Release Guide */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>ریلیز فارم پر بھرنے کی تیار کردہ معلومات (1-Click Copy Ready):</span>
          </h4>
          <span className="text-[11px] text-slate-400">تمام فارم ڈیٹا کاپی کے لیے تیار ہے</span>
        </div>

        {/* 3 Main Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Field 1: Tag */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">1. Choose a tag:</span>
              <button
                onClick={() => copyToClipboard(releaseTag, 'tag')}
                className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1 bg-slate-950 px-2 py-1 rounded border border-slate-700 cursor-pointer"
              >
                {copiedSection === 'tag' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'tag' ? 'کاپی ہو گیا!' : 'کاپی کریں'}</span>
              </button>
            </div>
            <code className="block bg-slate-950 p-2 rounded text-emerald-400 font-mono text-xs ltr text-left">
              {releaseTag}
            </code>
          </div>

          {/* Field 2: Release Title */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">2. Release title:</span>
              <button
                onClick={() => copyToClipboard(releaseTitle, 'title')}
                className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1 bg-slate-950 px-2 py-1 rounded border border-slate-700 cursor-pointer"
              >
                {copiedSection === 'title' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'title' ? 'کاپی ہو گیا!' : 'کاپی کریں'}</span>
              </button>
            </div>
            <code className="block bg-slate-950 p-2 rounded text-blue-300 font-mono text-xs ltr text-left truncate">
              {releaseTitle}
            </code>
          </div>
        </div>

        {/* Field 3: Markdown Release Description */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">3. Release description (مارک ڈاؤن متن):</span>
            <button
              onClick={() => copyToClipboard(releaseMarkdown, 'markdown')}
              className="bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-200 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
            >
              {copiedSection === 'markdown' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>مارک ڈاؤن کاپی ہو گیا!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>مکمل مارک ڈاؤن کاپی کریں</span>
                </>
              )}
            </button>
          </div>

          <pre className="bg-slate-950 p-3 rounded-lg text-slate-300 font-mono text-[11px] leading-relaxed overflow-x-auto ltr text-left border border-slate-800">
            {releaseMarkdown}
          </pre>
        </div>

        {/* Step Checklist */}
        <div className="bg-purple-950/40 border border-purple-500/30 rounded-xl p-4 space-y-2 text-xs">
          <p className="font-bold text-purple-200 border-b border-purple-800/50 pb-2">
            ✓ گٹ ہب پر ریلیز پبلش کرنے کی اہم ہدایات:
          </p>
          <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
            <li>فارم پر Tag نام <strong className="text-emerald-300">{releaseTag}</strong> لکھ کر <strong>Create new tag</strong> منتخب کریں۔</li>
            <li>ریلیز کا عنوان <strong className="text-blue-300">{releaseTitle}</strong> درج کریں۔</li>
            <li>ڈسکرپشن والے باکس میں اوپر دیا گیا مارک ڈاؤن پیسٹ کریں۔</li>
            <li>اگر اینڈرائیڈ کی ٹیسٹنگ ڈرافٹ فائل (APK/AAB) موجود ہو تو اسے ڈریگ اینڈ ڈراپ کر کے اپلوڈ کریں۔</li>
            <li>یہ پہلی الفا ٹیسٹنگ ریلیز ہے اس لیے <strong className="text-amber-300">"Set as a pre-release"</strong> کا خانے چیک کر دیں۔</li>
            <li>سبز رنگ کے بٹن <strong className="text-emerald-400">"Publish release"</strong> پر کلک کر دیں۔</li>
          </ul>
        </div>

        {/* Android Build Commands Helper */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>2. Android APK/AAB پیکیج بلڈ کرنے کی لوکل کمانڈز (Local Commands):</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span className="font-bold text-indigo-300">React Native / Expo</span>
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <code className="block text-emerald-400 font-mono text-[11px] ltr text-left pt-1">
                npx eas build -p android --profile preview
              </code>
            </div>

            <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span className="font-bold text-sky-300">Flutter Build</span>
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <code className="block text-emerald-400 font-mono text-[11px] ltr text-left pt-1">
                flutter build apk --release
              </code>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <a
            href={webPagesUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition shadow-md"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>لائیو ویب سائٹ (GitHub Pages)</span>
          </a>

          <a
            href={githubRepoUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition border border-slate-700"
          >
            <UploadCloud className="w-3.5 h-3.5 text-purple-400" />
            <span>مرکزی گٹ ہب ریپوزیٹری (Repository)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
