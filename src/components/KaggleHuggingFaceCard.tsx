import React, { useState } from 'react';
import { Sparkles, Copy, Check, ExternalLink, Terminal, Cpu, Database, Share2, UploadCloud, ShieldCheck, ArrowRight } from 'lucide-react';

export const KaggleHuggingFaceCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kaggle' | 'huggingface' | 'github'>('huggingface');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const githubRepoUrl = "https://github.com/Adnanmd76/elymora";
  const hfSpaceUrl = "https://huggingface.co/spaces";
  const kaggleUrl = "https://www.kaggle.com/code";

  // Kaggle Dataset Metadata
  const kaggleMetadataJson = `{
  "title": "Elymora AI Studio Dataset & Model Weights",
  "id": "adnanmd76/elymora-ai-studio",
  "licenses": [{ "name": "CC0-1.0" }],
  "keywords": ["ai", "react", "typescript", "meeting-summarizer", "gemini"]
}`;

  // Kaggle Python Notebook Setup Script
  const kagglePythonScript = `# Elymora AI Studio - Kaggle Environment Setup
import os
import json

print("🚀 Setting up Elymora AI Suite on Kaggle GPU / TPU...")
# Install required Node.js / Python integration packages
os.system("pip install --quiet google-genai kagglehub transformers torch")

print("✅ Kaggle environment ready for Elymora AI processing!")
`;

  // Hugging Face Space README.md (YAML header)
  const hfReadmeYaml = `---
title: Elymora AI Studio
emoji: ⚡
colorFrom: purple
colorTo: indigo
sdk: docker
app_port: 3000
pinned: false
license: mit
---

# Elymora AI Studio - Luxury & Meeting Intelligence Platform
Deploying Elymora AI Suite on Hugging Face Spaces using Docker.
`;

  // Hugging Face Git Push Commands
  const hfGitCommands = `# 1. Add Hugging Face Space as Git Remote (Replace USERNAME with your Hugging Face username)
git remote add hf https://huggingface.co/spaces/Adnanmd76/elymora

# 2. Push code directly to Hugging Face Space
git push hf main`;

  // GitHub Sync & Push Commands
  const githubPushCommands = `# 1. Add all changes
git add .

# 2. Commit changes
git commit -m "feat: Add Kaggle dataset integration and Hugging Face Spaces Docker deployment"

# 3. Push to main GitHub repository
git push origin main`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="bg-slate-950 border border-indigo-500/30 rounded-2xl p-5 shadow-2xl space-y-5 text-right" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600/20 border border-indigo-500/40 rounded-xl text-indigo-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">کیگل، ہگنگ فیس اور گٹ ہب سنک ہب (Kaggle & Hugging Face Hub)</h3>
              <span className="bg-indigo-900/60 border border-indigo-500/50 text-indigo-300 font-mono text-[11px] px-2 py-0.5 rounded-full font-bold">
                Deploy Suite
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              پروژیکٹ <strong>Elymora</strong> کو Kaggle پر چلانے، Hugging Face Spaces پر لائیو اپلوڈ کرنے اور GitHub پر پش کرنے کا مکمل سیٹ اپ۔
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={hfSpaceUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-orange-500/20"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Hugging Face Spaces</span>
          </a>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
        <button
          onClick={() => setActiveTab('huggingface')}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === 'huggingface'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          <span>🤗 Hugging Face Spaces (ہگنگ فیس)</span>
        </button>

        <button
          onClick={() => setActiveTab('kaggle')}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === 'kaggle'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>📊 Kaggle Integration (کیگل)</span>
        </button>

        <button
          onClick={() => setActiveTab('github')}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === 'github'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>🚀 GitHub Git Push (گٹ ہب)</span>
        </button>
      </div>

      {/* TAB 1: Hugging Face Spaces */}
      {activeTab === 'huggingface' && (
        <div className="space-y-4">
          <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-amber-200 text-xs leading-relaxed space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>ہگنگ فیس (Hugging Face Spaces) پر ہوسٹ کرنے کا آسان طریقہ:</span>
            </p>
            <p className="text-[11px] text-amber-200/90">
              ہگنگ فیس ڈوکر (Docker) کو سپورٹ کرتا ہے۔ ہم نے آپ کے لیے پروژیکٹ میں <code className="text-white bg-slate-950 px-1 rounded font-mono">Dockerfile</code> بنا دی ہے جو پورٹ 3000 پر سرور کو لائیو چلاتا ہے۔
            </p>
          </div>

          {/* Step 1 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">
                مرحلہ 1: Hugging Face پر نیا Space بنائیں (Docker SDK چنیں)
              </span>
              <a
                href="https://huggingface.co/new-space"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 underline"
              >
                <span>نیو اسپیس کھولیں</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-xs text-slate-400">
              - Space Name میں <strong>elymora</strong> لکھیں۔
              <br />
              - Select SDK میں <strong>Docker</strong> منتخب کریں (Blank template)۔
            </p>
          </div>

          {/* Step 2: README.md Header */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">
                مرحلہ 2: Space کی README.md فائل میں یہ مینی فیسٹ (YAML Header) رکھیں:
              </span>
              <button
                onClick={() => copyToClipboard(hfReadmeYaml, 'hf_readme')}
                className="bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/50 text-indigo-200 text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
              >
                {copiedKey === 'hf_readme' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'hf_readme' ? 'کاپی ہو گیا!' : 'کاپی کریں'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 p-3 rounded-lg text-emerald-300 font-mono text-[11px] ltr text-left border border-slate-800 overflow-x-auto">
              {hfReadmeYaml}
            </pre>
          </div>

          {/* Step 3: Git Push to HF */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">
                مرحلہ 3: اپنے لوکل پروژیکٹ کو Hugging Face پر پش کریں:
              </span>
              <button
                onClick={() => copyToClipboard(hfGitCommands, 'hf_git')}
                className="bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/50 text-indigo-200 text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
              >
                {copiedKey === 'hf_git' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'hf_git' ? 'کاپی ہو گیا!' : 'کمانڈ کاپی کریں'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 p-3 rounded-lg text-blue-300 font-mono text-[11px] ltr text-left border border-slate-800 overflow-x-auto">
              {hfGitCommands}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 2: Kaggle Requirements */}
      {activeTab === 'kaggle' && (
        <div className="space-y-4">
          <div className="p-3 bg-blue-950/40 border border-blue-500/40 rounded-xl text-blue-200 text-xs leading-relaxed space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-blue-300">
              <Database className="w-4 h-4 text-blue-400" />
              <span>کیگل (Kaggle) انٹیگریشن و نوٹ بک رننگ:</span>
            </p>
            <p className="text-[11px] text-blue-200/90">
              Kaggle GPUs (T4/P100) پر Elymora کے ماڈلز اور ڈیٹاسیٹس کو پروسیس کرنے کے لیے ضروری کنفیگریشنز۔
            </p>
          </div>

          {/* Dataset Metadata */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">
                1. Kaggle Dataset Metadata (`dataset-metadata.json`):
              </span>
              <button
                onClick={() => copyToClipboard(kaggleMetadataJson, 'kaggle_meta')}
                className="bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-200 text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
              >
                {copiedKey === 'kaggle_meta' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'kaggle_meta' ? 'کاپی ہو گیا!' : 'JSON کاپی کریں'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 p-3 rounded-lg text-amber-300 font-mono text-[11px] ltr text-left border border-slate-800 overflow-x-auto">
              {kaggleMetadataJson}
            </pre>
          </div>

          {/* Kaggle Python Integration Script */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">
                2. Kaggle Notebook Python Initializer Script:
              </span>
              <button
                onClick={() => copyToClipboard(kagglePythonScript, 'kaggle_script')}
                className="bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-200 text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
              >
                {copiedKey === 'kaggle_script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'kaggle_script' ? 'کاپی ہو گیا!' : 'اسکرپٹ کاپی کریں'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 p-3 rounded-lg text-emerald-300 font-mono text-[11px] ltr text-left border border-slate-800 overflow-x-auto">
              {kagglePythonScript}
            </pre>
          </div>

          <div className="flex items-center justify-end">
            <a
              href={kaggleUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition shadow-md"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Kaggle Notebooks پر جائیں</span>
            </a>
          </div>
        </div>
      )}

      {/* TAB 3: GitHub Push */}
      {activeTab === 'github' && (
        <div className="space-y-4">
          <div className="p-3 bg-purple-950/40 border border-purple-500/40 rounded-xl text-purple-200 text-xs leading-relaxed space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-purple-300">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span>گٹ ہب (GitHub Repository Sync) پر کوڈ پش کرنے کے مرحلے:</span>
            </p>
            <p className="text-[11px] text-purple-200/90">
              اپنے کوڈ بیس کی تازہ ترین چینجز اور Kaggle / Hugging Face کنفیگریشنز کو گٹ ہب ریپوزیٹری پر اپلوڈ کریں۔
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">
                GitHub Git Push Commands:
              </span>
              <button
                onClick={() => copyToClipboard(githubPushCommands, 'github_push')}
                className="bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-200 text-xs px-3 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
              >
                {copiedKey === 'github_push' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'github_push' ? 'کاپی ہو گیا!' : 'کمانڈز کاپی کریں'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 p-3 rounded-lg text-purple-300 font-mono text-[11px] ltr text-left border border-slate-800 overflow-x-auto">
              {githubPushCommands}
            </pre>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <a
              href={githubRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition shadow-md"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>GitHub Repository (Adnanmd76/elymora) دیکھالیں</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
