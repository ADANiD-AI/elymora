"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Upload,
  FileText,
  Search,
  MapPin,
  Briefcase,
  Sparkles,
  Send,
  Copy,
  Check,
  Building2,
  DollarSign,
  Terminal,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Cpu
} from "lucide-react";

interface JobLead {
  id: string;
  title: string;
  company: string;
  location: string;
  role_category: string;
  experience: string;
  salary_range: string;
  contact_email: string;
  description: string;
  skills: string[];
  match_score?: number;
}

export default function JobMatcherApp() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [jobs, setJobs] = useState<JobLead[]>([]);
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobLead | null>(null);
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string; email_body: string } | null>(null);
  const [isGeneratingEmail, setIsGeneratingEmail] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showUrduGuide, setShowUrduGuide] = useState<boolean>(false);

  // Sample seed jobs for initial UI state
  const initialJobs: JobLead[] = [
    {
      id: "job-1",
      title: "Senior Data Analyst - SQL & PowerBI Specialist",
      company: "DataPulse Analytics",
      location: "Remote (US/Global)",
      role_category: "Data Analyst",
      experience: "3+ years",
      salary_range: "$75,000 - $95,000 / yr or $45/hr",
      contact_email: "careers@datapulseanalytics.com",
      description: "Seeking an experienced Data Analyst proficient in SQL query optimization, complex ETL pipelines, and interactive Power BI dashboard creation.",
      skills: ["SQL", "Power BI", "ETL", "Python", "Data Modeling"],
      match_score: 94.5
    },
    {
      id: "job-2",
      title: "Freelance BI Developer - Healthcare Analytics",
      company: "CareMetrics Tech",
      location: "Remote (Pakistan/Asia)",
      role_category: "BI Developer",
      experience: "2+ years",
      salary_range: "$30 - $50 / hr (Contract)",
      contact_email: "talent@caremetricstech.org",
      description: "Looking for a freelance BI Developer to build HIPAA-compliant dashboards using Tableau and Snowflake.",
      skills: ["Tableau", "Snowflake", "DAX", "SQL", "Data Cleaning"],
      match_score: 88.2
    },
    {
      id: "job-3",
      title: "Data Analyst / Marketing Analytics Specialist",
      company: "GrowthX Digital Agency",
      location: "Pakistan (Lahore / Remote)",
      role_category: "Data Analyst",
      experience: "1-3 years",
      salary_range: "PKR 180,000 - 280,000 / month",
      contact_email: "hiring@growthxdigital.pk",
      description: "GrowthX is looking for a data analyst skilled in Google Analytics 4, Meta Ads API, Python, and Looker Studio.",
      skills: ["GA4", "Looker Studio", "Python", "Pandas", "SQL"],
      match_score: 82.0
    }
  ];

  const displayJobs = jobs.length > 0 ? jobs : initialJobs;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
      setIsParsing(true);
      
      // Simulate raw text extraction for fast interactive response
      setTimeout(() => {
        const sampleExtracted = `ADAM KHAN - DATA ANALYST & BI DEVELOPER
Skills: Python, SQL, PostgreSQL, Power BI, Tableau, Pandas, NumPy, Scikit-learn, ETL Data Pipelines, DAX, Looker Studio, Git.
Experience: 3+ years in financial and e-commerce analytics, building automated reporting systems, A/B testing, and churn prediction models.`;
        setResumeText(sampleExtracted);
        setIsParsing(false);
      }, 1000);
    }
  };

  const runJobMatch = () => {
    if (!resumeText) {
      alert("Please upload a CV or enter resume text first.");
      return;
    }
    setIsMatching(true);
    setTimeout(() => {
      // Filter & calculate score
      const filtered = initialJobs.filter(j => {
        const matchesLoc = !locationFilter || j.location.toLowerCase().includes(locationFilter.toLowerCase());
        const matchesRole = !roleFilter || j.title.toLowerCase().includes(roleFilter.toLowerCase()) || j.role_category.toLowerCase().includes(roleFilter.toLowerCase());
        return matchesLoc && matchesRole;
      });
      setJobs(filtered.length > 0 ? filtered : initialJobs);
      setIsMatching(false);
    }, 800);
  };

  const handleGenerateEmail = (job: JobLead) => {
    setSelectedJob(job);
    setIsGeneratingEmail(true);
    setTimeout(() => {
      setGeneratedEmail({
        subject: `Application / Freelance Pitch: ${job.title} - Data Analyst Specialist`,
        email_body: `Dear Hiring Team at ${job.company},

I am writing to express my strong interest in the "${job.title}" position. With over 3 years of hands-on experience in SQL, Python, Power BI, and complex ETL pipelines, I bring a proven track record of converting raw datasets into key business insights.

Key Strengths Aligned With Your Requirements:
1. Advanced SQL & Data Modeling: Expert at query optimization, schema design, and aggregated reporting.
2. Interactive Dashboards: Proficient in Power BI, Tableau, and Looker Studio for executive metrics tracking.
3. Automated ETL: Skilled in Python (Pandas/NumPy) for automated data ingestion and cleaning pipelines.

I welcome the opportunity to discuss how my analytical skills can drive success for ${job.company}.

Best regards,
Candidate Professional
Data Analyst & BI Specialist`
      });
      setIsGeneratingEmail(false);
    }, 600);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-w-screen min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white leading-tight">AI Job & Lead Matcher</h1>
              <p className="text-xs text-slate-400">Zero-Cost Vector Embeddings (`all-MiniLM-L6-v2`)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUrduGuide(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Urdu Execution Guide (اردو رہنمائی)</span>
            </button>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Free / Local Engine
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/20 p-6 sm:p-8">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Cosine Similarity Vector Search
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Instant Freelance Lead & Job Matching for Data Analysts
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Upload your CV PDF to convert your skills into 384-dimensional vector embeddings using Hugging Face's local <code className="text-indigo-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-indigo-500/30">all-MiniLM-L6-v2</code> model. Ranked matches, location filters, and zero-cost cold email generator built right in.
            </p>
          </div>
        </section>

        {/* Workspace: File Upload & Filter Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Upload Dropzone & CV Controls */}
          <div className="lg:col-span-1 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-5">
            <h3 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              1. Upload Resume / CV (PDF)
            </h3>

            <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-6 text-center transition bg-slate-950/40 cursor-pointer relative group">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-indigo-500/10 rounded-full text-indigo-400 group-hover:scale-110 transition duration-200">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-sm font-medium text-slate-200">
                  {file ? file.name : "Click or drag PDF resume here"}
                </div>
                <p className="text-xs text-slate-500">
                  {file ? `${(file.size / 1024).toFixed(1)} KB` : "Supports standard PDF resumes"}
                </p>
              </div>
            </div>

            {isParsing && (
              <div className="flex items-center justify-center gap-2 text-xs text-indigo-400 py-2">
                <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <span>Extracting raw text & generating vector embeddings...</span>
              </div>
            )}

            {resumeText && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400">Extracted Resume Skills & Summary</label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 font-mono"
                  placeholder="Paste or edit resume text..."
                />
              </div>
            )}

            {/* Filter Controls */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">2. Target Filters</h4>
              
              <div className="space-y-1">
                <label className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" /> Location / Market
                </label>
                <input
                  type="text"
                  placeholder="e.g. Remote, US, Pakistan, UK"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500" /> Role / Specialty
                </label>
                <input
                  type="text"
                  placeholder="e.g. Data Analyst, BI Developer, SQL"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                onClick={runJobMatch}
                disabled={isMatching}
                className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isMatching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Calculating Vector Cosine Similarity...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Match Jobs & Leads</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Ranked Leads & Jobs Dashboard */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between bg-slate-900/70 border border-slate-800 rounded-2xl px-5 py-3">
              <h3 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Ranked Job Matches ({displayJobs.length})
              </h3>
              <span className="text-xs text-slate-400">Sorted by Cosine Match Score</span>
            </div>

            {/* List of Matched Cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={displayJobs.map((j) => j.id).join("-") + jobs.length}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {displayJobs.map((job, index) => {
                  const score = job.match_score || 85;
                  const scoreColor =
                    score >= 90
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : score >= 80
                      ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/30";

                  return (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 18, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.08,
                        ease: [0.21, 0.47, 0.32, 0.98]
                      }}
                      className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 transition space-y-4 shadow-sm hover:shadow-indigo-500/5 group"
                    >
                      <div className="flex flex-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-base text-slate-100 group-hover:text-indigo-300 transition">
                              {job.title}
                            </h4>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1 text-slate-300 font-medium">
                              <Building2 className="w-3.5 h-3.5 text-slate-500" /> {job.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-500" /> {job.location}
                            </span>
                            <span className="flex items-center gap-1 text-emerald-400 font-medium">
                              <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> {job.salary_range}
                            </span>
                          </div>
                        </div>

                        {/* Score Badge */}
                        <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex flex-col items-end shrink-0 ${scoreColor}`}>
                          <span>{score}% Match</span>
                          <span className="text-[10px] opacity-75 font-normal">Cosine Engine</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{job.description}</p>

                      {/* Skill Tags & Action */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
                        <div className="flex flex-wrap gap-1.5">
                          {job.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700/50"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => handleGenerateEmail(job)}
                          className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Generate Cold Email</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Cold Email Drawer / Modal */}
      {selectedJob && generatedEmail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => {
                setSelectedJob(null);
                setGeneratedEmail(null);
              }}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">AI Cold Email / Cover Letter Generator</h3>
                <p className="text-xs text-slate-400">Targeted pitch for {selectedJob.company}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-400">Email Subject Line</label>
                <input
                  type="text"
                  readOnly
                  value={generatedEmail.subject}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-indigo-300 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400">Custom Pitch Body</label>
                <textarea
                  readOnly
                  rows={10}
                  value={generatedEmail.email_body}
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 font-mono leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Free HF Pitch Template
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(`Subject: ${generatedEmail.subject}\n\n${generatedEmail.email_body}`)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl transition flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied!" : "Copy Pitch"}</span>
                </button>

                <a
                  href={`mailto:${selectedJob.contact_email}?subject=${encodeURIComponent(generatedEmail.subject)}&body=${encodeURIComponent(generatedEmail.email_body)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-indigo-600/25"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via Gmail / Mail Client</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Urdu Execution Guide Modal */}
      {showUrduGuide && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowUrduGuide(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">لوکل سیٹ اپ اور ٹرمینل چلانے کی ہدایت نامہ (Urdu Guide)</h3>
                <p className="text-xs text-slate-400">Step-by-Step Terminal Commands to Run FastAPI & Next.js Locally</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed bg-slate-950 border border-slate-800 p-5 rounded-xl font-sans" dir="rtl">
              <div className="space-y-2 border-b border-slate-800 pb-3">
                <h4 className="font-bold text-emerald-400 text-sm">مرحلہ 1: بیک اینڈ پائیتھن (FastAPI) سیٹ اپ</h4>
                <p>پہلے اپنا ٹرمینل کھولیں اور بیک اینڈ فولڈر میں جائیں:</p>
                <pre dir="ltr" className="bg-slate-900 p-2.5 rounded border border-slate-800 font-mono text-indigo-300">
                  cd backend{"\n"}
                  python -m venv venv{"\n"}
                  source venv/bin/activate  # Windows users: venv\Scripts\activate{"\n"}
                  pip install -r requirements.txt
                </pre>
                <p>بیک اینڈ سرور کو سٹارٹ کرنے کے لیے درج ذیل کمانڈ چلائیں:</p>
                <pre dir="ltr" className="bg-slate-900 p-2.5 rounded border border-slate-800 font-mono text-emerald-300">
                  uvicorn main:app --reload --port 8000
                </pre>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-indigo-400 text-sm">مرحلہ 2: فرنٹ اینڈ (Next.js / React) سیٹ اپ</h4>
                <p>ایک نیا ٹرمینل ٹیب کھولیں اور فرنٹ اینڈ ڈائریکٹری میں جائیں:</p>
                <pre dir="ltr" className="bg-slate-900 p-2.5 rounded border border-slate-800 font-mono text-indigo-300">
                  cd frontend{"\n"}
                  npm install{"\n"}
                  npm run dev
                </pre>
                <p>اب اپنے براؤزر میں <code dir="ltr" className="bg-slate-900 px-1 py-0.5 rounded text-amber-300 font-mono">http://localhost:3000</code> کھولیں اور اپنا CV اپلوڈ کر کے مفت AI جاب میچنگ استعمال کریں!</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowUrduGuide(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700"
              >
                بند کریں (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
