import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  FileText,
  Tag,
  ChevronDown,
  ChevronUp,
  Share2,
  Download,
  ListTodo,
  Scale,
  Sparkles
} from 'lucide-react';

// ==========================================
// TYPES (Matching Elymora Schema)
// ==========================================
export interface ActionItem {
  task: string;
  assignee: string | null;
  deadline: string | null;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface Decision {
  decision: string;
  rationale: string | null;
}

export interface KeyTopic {
  topic_name: string;
  summary: string;
  key_bullets: string[];
}

export interface FollowUpMeeting {
  required: boolean;
  proposed_date_time: string | null;
  agenda: string | null;
}

export interface MeetingMinutesData {
  meeting_title: string;
  executive_summary: string;
  key_topics: KeyTopic[];
  decisions_made: Decision[];
  action_items: ActionItem[];
  follow_up_meeting: FollowUpMeeting;
}

export const sampleMeetingData: MeetingMinutesData = {
  meeting_title: "AWS Fargate Migration & Backend Infrastructure Review",
  executive_summary: "The core engineering team reviewed the production deployment strategy for Elymora backend onto AWS Fargate. Staging pipeline tests passed with zero errors. All attendees agreed to schedule the final database migration during off-peak maintenance window on Sunday at 2 AM PKT.",
  key_topics: [
    {
      topic_name: "1. AWS Fargate & Container Registry Deployment",
      summary: "Evaluated Docker buildx multi-stage images, GitHub Actions CI/CD automation, and memory/vCPU allocation on ECS.",
      key_bullets: [
        "Docker container image size optimized to <120MB with Node 20 alpine runner.",
        "GitHub Secrets configured for PROD_DATABASE_URL and deployment webhooks.",
        "Auto-scaling target tracking policy set to maintain 60% CPU utilization."
      ]
    },
    {
      topic_name: "2. Database Schema & Migration Strategy",
      summary: "Reviewed PostgreSQL schema updates for meeting summaries, transcripts, and action items.",
      key_bullets: [
        "Full-text search (tsvector) index created for transcript content.",
        "JSONB topics and takeaways indexed using GIN operator.",
        "Migration script verified with zero data loss in staging environment."
      ]
    }
  ],
  decisions_made: [
    {
      decision: "Execute production database migration on Sunday at 2 AM PKT.",
      rationale: "Minimizes user traffic disruption during low-frequency weekend maintenance window."
    },
    {
      decision: "Adopt Deepgram WebSockets API for sub-second real-time transcription.",
      rationale: "Delivers <500ms latency for live meeting captions with 98.5% speech recognition accuracy."
    }
  ],
  action_items: [
    {
      task: "Execute production database migration script during maintenance window",
      assignee: "Zeeshan Ahmad",
      deadline: "Aug 9, 2026 - 02:00 AM",
      priority: "HIGH"
    },
    {
      task: "Update DNS routing records to point to new AWS Fargate cluster endpoint",
      assignee: "Muhammad Adnan",
      deadline: "Aug 9, 2026 - 03:00 AM",
      priority: "HIGH"
    },
    {
      task: "Verify post-deployment smoke tests and health check metrics",
      assignee: "Shamsuddin Raza",
      deadline: "Aug 9, 2026 - 04:00 AM",
      priority: "MEDIUM"
    }
  ],
  follow_up_meeting: {
    required: true,
    proposed_date_time: "Monday, Aug 10, 2026 at 10:00 AM PKT",
    agenda: "Post-migration system stability audit & latency review."
  }
};

interface MeetingMinutesProps {
  data?: MeetingMinutesData;
  meetingDate?: string;
  participants?: string[];
  onExportPDF?: () => void;
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export const MeetingMinutesView: React.FC<MeetingMinutesProps> = ({
  data = sampleMeetingData,
  meetingDate = 'Aug 7, 2026',
  participants = ['Muhammad Adnan Ul Mustafa', 'Zeeshan Ahmad', 'Shamsuddin Raza'],
  onExportPDF
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'actions' | 'decisions'>('all');
  const [expandedTopics, setExpandedTopics] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const toggleTopic = (index: number) => {
    setExpandedTopics((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const getPriorityBadge = (priority: ActionItem['priority']) => {
    switch (priority) {
      case 'HIGH':
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">High</span>;
      case 'MEDIUM':
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Medium</span>;
      case 'LOW':
        return <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Low</span>;
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl">
      
      {/* 1. HEADER SECTION */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" /> Elymora AI Meeting Intelligence
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif">
              {data.meeting_title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-300 hover:text-white border border-slate-700 rounded-xl hover:bg-slate-800 transition cursor-pointer relative"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Copied!
                </span>
              )}
            </button>
            <button
              onClick={onExportPDF || (() => window.print())}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 text-slate-950 font-bold rounded-xl text-xs transition shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" /> Export Summary (PDF)
            </button>
          </div>
        </div>

        {/* METADATA BAR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Date: <strong className="text-slate-100">{meetingDate}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Attendees: <strong className="text-slate-100">{participants.join(', ')}</strong></span>
          </div>
        </div>
      </div>

      {/* 2. EXECUTIVE SUMMARY CARD */}
      <div className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 rounded-2xl p-6 border border-amber-500/30 shadow-md">
        <h2 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3 flex items-center gap-2 font-serif">
          <FileText className="w-4 h-4 text-amber-400" /> Executive Summary
        </h2>
        <p className="text-slate-200 leading-relaxed font-normal text-xs sm:text-sm">
          {data.executive_summary}
        </p>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-slate-800 gap-6 text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 border-b-2 transition cursor-pointer ${
            activeTab === 'all'
              ? 'border-amber-400 text-amber-300 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Overview & Topics ({data.key_topics.length})
        </button>
        <button
          onClick={() => setActiveTab('actions')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'actions'
              ? 'border-amber-400 text-amber-300 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Action Items
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] px-2 py-0.5 rounded-full font-mono">
            {data.action_items.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('decisions')}
          className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'decisions'
              ? 'border-amber-400 text-amber-300 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Key Decisions ({data.decisions_made.length})
        </button>
      </div>

      {/* 3. KEY TOPICS / OVERVIEW SECTION */}
      {(activeTab === 'all') && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-amber-300 flex items-center gap-2 font-serif">
            <Tag className="w-4 h-4 text-amber-400" /> Key Discussion Topics
          </h3>
          {data.key_topics.map((topic, idx) => (
            <div
              key={idx}
              className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden transition shadow-sm"
            >
              <button
                onClick={() => toggleTopic(idx)}
                className="w-full p-4 flex items-center justify-between text-left font-semibold text-slate-100 hover:bg-slate-800/60 transition cursor-pointer text-xs sm:text-sm"
              >
                <span>{topic.topic_name}</span>
                {expandedTopics[idx] ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {expandedTopics[idx] && (
                <div className="p-4 pt-0 space-y-3 border-t border-slate-800/60">
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">{topic.summary}</p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {topic.key_bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 4. ACTION ITEMS SECTION */}
      {(activeTab === 'all' || activeTab === 'actions') && (
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-amber-300 flex items-center gap-2 font-serif">
            <ListTodo className="w-4 h-4 text-amber-400" /> Action Items & Tasks
          </h3>
          <div className="divide-y divide-slate-800/80">
            {data.action_items.map((item, idx) => (
              <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-slate-100">{item.task}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span>Assignee: <strong className="text-slate-200">{item.assignee || 'Unassigned'}</strong></span>
                      {item.deadline && (
                        <span className="flex items-center gap-1 font-mono text-[10px] text-amber-300">
                          <Clock className="w-3 h-3" /> {item.deadline}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div>{getPriorityBadge(item.priority)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. DECISIONS SECTION */}
      {(activeTab === 'all' || activeTab === 'decisions') && (
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-amber-300 flex items-center gap-2 font-serif">
            <Scale className="w-4 h-4 text-amber-400" /> Key Decisions Log
          </h3>
          <div className="space-y-3">
            {data.decisions_made.map((dec, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <p className="font-semibold text-slate-100 text-xs sm:text-sm">{dec.decision}</p>
                {dec.rationale && (
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    <strong className="text-amber-300">Rationale:</strong> {dec.rationale}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. FOLLOW-UP MEETING */}
      {data.follow_up_meeting.required && (
        <div className="bg-amber-500/10 rounded-2xl p-5 border border-amber-500/30 flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-amber-300 font-serif">Follow-up Session Scheduled</h4>
            <p className="text-slate-200">
              <strong>Proposed Time:</strong> {data.follow_up_meeting.proposed_date_time || 'TBD'}
            </p>
            {data.follow_up_meeting.agenda && (
              <p className="text-slate-400">
                <strong>Agenda:</strong> {data.follow_up_meeting.agenda}
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
