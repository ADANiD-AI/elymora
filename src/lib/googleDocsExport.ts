export interface ProjectDocContent {
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
  generatedDate: string;
}

export const MASTER_DOC_TITLE = "Elymora Digital & Luxury Studio - Master Project Document";

export async function createOrUpdateGoogleDocument(
  accessToken: string,
  data: ProjectDocContent,
  existingDocId?: string | null
): Promise<{ documentId: string; docUrl: string; updated: boolean }> {
  let targetDocId = existingDocId || localStorage.getItem("elymora_master_doc_id");

  // Step 1: If no stored ID, search Google Drive for an existing document with the exact title
  if (!targetDocId) {
    try {
      const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
        `name='${MASTER_DOC_TITLE}' and mimeType='application/vnd.google-apps.document' and trashed=false`
      )}`;
      const searchRes = await fetch(searchUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        if (searchData.files && searchData.files.length > 0) {
          targetDocId = searchData.files[0].id;
        }
      }
    } catch (err) {
      console.warn("Drive search error:", err);
    }
  }

  // Step 2: If still no target document, create a new one with the master project title
  let isNewDoc = false;
  if (!targetDocId) {
    const createRes = await fetch("https://docs.googleapis.com/v1/documents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: MASTER_DOC_TITLE,
      }),
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      throw new Error(`Google Docs API create error (${createRes.status}): ${errText}`);
    }

    const doc = await createRes.json();
    targetDocId = doc.documentId;
    isNewDoc = true;
  }

  // Save ID to localStorage so future updates reuse this exact file
  if (targetDocId) {
    localStorage.setItem("elymora_master_doc_id", targetDocId);
  }

  // Step 3: Fetch current document details to get end index for clearing previous content
  let docEndIndex = 1;
  try {
    const getRes = await fetch(`https://docs.googleapis.com/v1/documents/${targetDocId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (getRes.ok) {
      const currentDoc = await getRes.json();
      const content = currentDoc.body?.content;
      if (content && content.length > 0) {
        docEndIndex = content[content.length - 1].endIndex || 1;
      }
    }
  } catch (err) {
    console.warn("Error getting doc info:", err);
  }

  // Step 4: Build formatted text content
  const fullText = `
ELYMORA DIGITAL & LUXURY STUDIO
MASTER PROJECT SYSTEM DOCUMENTATION & LIVE REPORT
=============================================================
App / Repository: Elymora Digital AI Suite
Master Document Title: ${MASTER_DOC_TITLE}
Last Updated Date: ${data.generatedDate}
Infrastructure: Google Cloud Run + Firebase Auth + Google Workspace APIs

1. EXECUTIVE SUMMARY
-------------------------------------------------------------
Elymora Digital & Luxury Studio is an all-in-one AI-driven ecosystem integrating:
- Quranic Tajweed & Tafseer Learning Module
- Multilingual Voice & Speech Translation Studio
- Graphic & Premiere Pro Video Editing Portfolio & Demo Player
- AI Meeting Minutes & Audio Summarizer Engine
- Google Business Profile & Local SEO Management System
- Master PDF Certification & Verifiable Skill Badges Engine

2. GOOGLE BUSINESS PROFILE & LOCAL SEO DATA
-------------------------------------------------------------
Business Name: ${data.businessName || "Elymora Digital Agency"}
Category: ${data.category || "Digital Marketing & AI Software Studio"}
Description: ${data.description || "Leading digital agency for AI and creative media."}
Address: ${data.address || "Suite 402, Commercial Heights, Gulberg III"}
City / Country: ${data.city || "Lahore"}, ${data.country || "Pakistan"}
Phone: ${data.phone || "+92 300 1234567"}
Email: ${data.email || "contact@elymoradigital.com"}
Website: ${data.website || "https://elymoradigital.com"}
Local SEO Keywords: ${data.keywords || "video editing, AI studio, graphic design"}

3. INTEGRATED MODULES & CAPABILITIES
-------------------------------------------------------------
• Islamic & Quranic Sciences: Interactive Quran recitation analyzer, Surah player, and Tajweed guidance.
• Multilingual Language Studio: Real-time speech-to-text, translation, and pronunciation scoring.
• Creative Media Studio: Portfolio showcases for Adobe Photoshop, Illustrator, Premiere Pro, and After Effects.
• AI Meeting Minutes Generator: Audio upload and text PDF transcript parser using Gemini AI models.
• Automated Portfolio Engine: Centralized skill badges, scorecards, and verifiable certificate PDF generator.

4. TECHNICAL ARCHITECTURE & INFRASTRUCTURE
-------------------------------------------------------------
- Frontend: React 19 + TypeScript + Vite + Tailwind CSS + Motion
- Backend: Express v4 / ESM Node.js Server + Google GenAI SDK
- Document & OAuth Services: Google Workspace APIs (Docs & Drive API)
- Storage & Persistence: Google Business REST API + Local Memory Engine

=============================================================
Master document synced and updated automatically via Elymora Studio.
`;

  // Step 5: Construct batchUpdate requests (clear existing content if needed, then insert updated text)
  const requests: any[] = [];
  if (docEndIndex > 2) {
    requests.push({
      deleteContentRange: {
        range: {
          startIndex: 1,
          endIndex: docEndIndex - 1,
        },
      },
    });
  }

  requests.push({
    insertText: {
      location: { index: 1 },
      text: fullText,
    },
  });

  const updateRes = await fetch(`https://docs.googleapis.com/v1/documents/${targetDocId}:batchUpdate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ requests }),
  });

  if (!updateRes.ok) {
    const errText = await updateRes.text();
    console.warn("Failed batchUpdate on Google Doc:", errText);
  }

  const docUrl = `https://docs.google.com/document/d/${targetDocId}/edit`;
  return { documentId: targetDocId, docUrl, updated: !isNewDoc };
}

export async function sendGmailEmail(
  accessToken: string,
  recipientEmail: string,
  subject: string,
  bodyText: string
): Promise<{ success: boolean; messageId?: string }> {
  const emailLines = [
    `To: ${recipientEmail}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    '',
    bodyText,
  ];

  const rawEmail = emailLines.join('\r\n');
  const encodedEmail = btoa(unescape(encodeURIComponent(rawEmail)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: encodedEmail,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gmail API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return { success: true, messageId: data.id };
}
