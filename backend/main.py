import io
import os
import numpy as np
from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from weasyprint import HTML
from audio_cleaner import clean_and_enhance_audio
from quiz_data import QUIZ_DATABASE
from quiz_bank import ALL_SUBJECT_QUIZZES
from creative_curriculum import CREATIVE_CURRICULUM
from media_engine import get_media_by_course
from career_engine import JobMatchRequest, HREmailRequest, calculate_semantic_match, generate_hr_email
from certificate_engine import generate_pdf_certificate
import uuid
from datetime import datetime



app = FastAPI(title="Complete AI Job Matcher & CV Builder API")

# Enable CORS for Next.js Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Free AI Model locally
print("Loading open-source AI model...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("Model loaded successfully!")

# ---------------------------------------------------------
# Pydantic Schemas for CV Builder
# ---------------------------------------------------------
class ExperienceItem(BaseModel):
    company: str
    role: str
    startDate: str
    endDate: str
    description: str

class PersonalInfo(BaseModel):
    fullName: str
    title: str
    email: str
    phone: str
    location: str

class CVData(BaseModel):
    templateId: str  # 'modern', 'corporate', 'creative'
    personalInfo: PersonalInfo
    summary: str
    skills: List[str]
    experience: List[ExperienceItem]

# ---------------------------------------------------------
# Utility Functions
# ---------------------------------------------------------
def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    reader = PdfReader(io.BytesIO(pdf_bytes))
    text = ""
    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted + "\n"
    return text.strip()

def get_free_embedding(text: str):
    return model.encode(text)

# Mock Job Database
MOCK_JOBS = [
    {
        "id": 1,
        "title": "Data Analyst (Remote)",
        "company": "TechCorp Global",
        "location": "Remote",
        "description": "Looking for a Data Analyst proficient in Python, SQL, Power BI, and Advanced Excel to build automated business dashboards and perform data analysis."
    },
    {
        "id": 2,
        "title": "Senior Machine Learning Engineer",
        "company": "AI Dynamics",
        "location": "US",
        "description": "Seeking an ML Engineer with extensive experience in PyTorch, TensorFlow, MLOps, LLM fine-tuning, and Kubernetes infrastructure deployment."
    },
    {
        "id": 3,
        "title": "Business Intelligence & SQL Developer",
        "company": "Data Insights LLC",
        "location": "Pakistan",
        "description": "Requires strong expertise in SQL queries, PostgreSQL, Tableau, data warehousing, and ETL pipelines for corporate reporting."
    }
]

# ---------------------------------------------------------
# API Endpoints
# ---------------------------------------------------------

# Endpoint 1: Job Matching Engine
@app.post("/api/match-jobs")
async def match_jobs(
    file: UploadFile = File(...),
    location: str = Form(default="Remote")
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    try:
        pdf_bytes = await file.read()
        resume_text = extract_text_from_pdf(pdf_bytes)

        if not resume_text:
            raise HTTPException(status_code=400, detail="Could not extract text from PDF.")

        resume_vector = np.array(get_free_embedding(resume_text)).reshape(1, -1)
        results = []

        for job in MOCK_JOBS:
            job_vector = np.array(get_free_embedding(job["description"])).reshape(1, -1)
            sim_score = cosine_similarity(resume_vector, job_vector)[0][0]
            match_percentage = round(float(sim_score) * 100, 1)

            results.append({
                "id": job["id"],
                "title": job["title"],
                "company": job["company"],
                "location": job["location"],
                "description": job["description"],
                "score": match_percentage
            })

        results.sort(key=lambda x: x["score"], reverse=True)
        return {"status": "success", "matches": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint 2: Automated PDF CV Builder
@app.post("/api/generate-cv-pdf")
async def generate_cv_pdf(data: CVData):
    try:
        primary_color = "#0284c7" if data.templateId == "modern" else "#0f172a"
        
        skills_html = "".join([
            f"<span style='background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-size: 9pt; margin-right: 5px; display: inline-block;'>{skill}</span>"
            for skill in data.skills
        ])

        exp_html = ""
        for exp in data.experience:
            exp_html += f"""
            <div style='margin-bottom: 14px;'>
                <div style='font-weight: bold; font-size: 11pt;'>{exp.role} - <span style='color: {primary_color};'>{exp.company}</span></div>
                <div style='font-size: 9pt; color: #64748b;'>{exp.startDate} - {exp.endDate}</div>
                <p style='margin-top: 4px; font-size: 9.5pt; color: #334155;'>{exp.description}</p>
            </div>
            """

        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
        <style>
            @page {{ size: A4; margin: 15mm 12mm; }}
            body {{ font-family: 'Helvetica Neue', Arial, sans-serif; color: #1e293b; margin: 0; padding: 0; }}
            .header {{ border-bottom: 2px solid {primary_color}; padding-bottom: 10px; margin-bottom: 15px; }}
            .name {{ font-size: 22pt; font-weight: bold; color: {primary_color}; margin: 0; }}
            .title {{ font-size: 10pt; color: #64748b; margin-top: 4px; }}
            .section-heading {{ font-size: 12pt; font-weight: bold; color: {primary_color}; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 15px; margin-bottom: 10px; }}
        </style>
        </head>
        <body>
            <div class="header">
                <div class="name">{data.personalInfo.fullName}</div>
                <div class="title">{data.personalInfo.title} | {data.personalInfo.location} | {data.personalInfo.email} | {data.personalInfo.phone}</div>
            </div>
            
            <div class="section-heading">Professional Summary</div>
            <p style="font-size: 9.5pt; color: #334155;">{data.summary}</p>
            
            <div class="section-heading">Key Skills</div>
            <div style="margin-bottom: 10px;">{skills_html}</div>
            
            <div class="section-heading">Work Experience</div>
            {exp_html}
        </body>
        </html>
        """

        output_pdf_path = "generated_cv.pdf"
        HTML(string=html_content).write_pdf(output_pdf_path)

        return FileResponse(
            path=output_pdf_path,
            filename=f"{data.personalInfo.fullName.replace(' ', '_')}_CV.pdf",
            media_type="application/pdf"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint 3: Voice Interview Evaluator & Audio Cleaner
@app.post("/api/analyze-interview-audio")
async def analyze_interview_audio(
    audio: UploadFile = File(...),
    transcript: str = Form(default="")
):
    try:
        raw_audio_bytes = await audio.read()
        
        # 1. آڈیو میں سے شور ختم اور آواز کلیئر کریں
        cleaned_audio_bytes = clean_and_enhance_audio(raw_audio_bytes)
        
        # 2. الفاظ اور آواز کا تجزیہ
        word_count = len(transcript.split())
        clarity_score = min(100, max(50, word_count * 3))
        confidence_score = 85 if any(k in transcript.lower() for k in ["experience", "python", "data", "sql"]) else 70
        overall_score = round((clarity_score + confidence_score) / 2)

        return {
            "status": "success",
            "message": "آواز سے پس منظر کا شور کامیابی سے ختم کر دیا گیا ہے۔",
            "audioEnhanced": True,
            "transcript": transcript if transcript else "آواز پروسیس ہو کر صاف کر دی گئی ہے۔",
            "metrics": {
                "overallScore": overall_score,
                "clarity": clarity_score,
                "confidence": confidence_score,
                "feedback": "آواز کا پس منظر شور ختم کر دیا گیا ہے۔ آپ کا تلفظ اور روانی انٹرویو کے لیے موزوں ہے۔"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Audio processing error: {str(e)}")

# Endpoint 4: Skill Assessment & Quizzes
class QuizSubmission(BaseModel):
    quizId: str
    userAnswers: dict  # e.g., {"1": 1, "2": 1}

@app.get("/api/quizzes")
async def get_quiz_list():
    return [
        {"id": key, "title": val["title"], "category": val["category"], "passing_score": val["passing_score"], "question_count": len(val["questions"])}
        for key, val in QUIZ_DATABASE.items()
    ]

@app.get("/api/quiz/{quiz_id}")
async def get_quiz(quiz_id: str):
    if quiz_id not in QUIZ_DATABASE:
        raise HTTPException(status_code=404, detail="Quiz not found")
    quiz = QUIZ_DATABASE[quiz_id]
    sanitized_questions = [
        {"id": q["id"], "question": q["question"], "options": q["options"]}
        for q in quiz["questions"]
    ]
    return {
        "id": quiz_id,
        "title": quiz["title"],
        "category": quiz["category"],
        "passing_score": quiz["passing_score"],
        "questions": sanitized_questions
    }

@app.post("/api/quiz/submit")
async def submit_quiz(data: QuizSubmission):
    if data.quizId not in QUIZ_DATABASE:
        raise HTTPException(status_code=404, detail="Quiz not found")
    quiz = QUIZ_DATABASE[data.quizId]
    total_q = len(quiz["questions"])
    correct_count = 0

    for q in quiz["questions"]:
        user_ans = data.userAnswers.get(str(q["id"]))
        if user_ans is not None and int(user_ans) == q["correct"]:
            correct_count += 1

    percentage = round((correct_count / total_q) * 100, 1) if total_q > 0 else 0
    passed = percentage >= quiz["passing_score"]

    return {
        "quizId": data.quizId,
        "score": percentage,
        "passed": passed,
        "badge": {
            "name": f"Verified {quiz['title']}",
            "title": quiz["title"],
            "issuedAt": "2026-08-05",
            "status": "PASSED" if passed else "FAILED"
        } if passed else None,
        "message": "مبارک ہو! آپ کا ٹیسٹ پاس ہو گیا ہے اور پروفائل بیج شامل کر دیا گیا ہے۔" if passed else "ٹیسٹ پاس کرنے کے لیے کم از کم 70% نمبر درکار ہیں۔ دوبارہ کوشش کریں۔"
    }

# Endpoint 5: AI Skill Booster & Learning Roadmap Engine
@app.post("/api/quiz/evaluate-and-upskill")
async def evaluate_and_upskill(data: QuizSubmission):
    # Combine QUIZ_DATABASE and ALL_SUBJECT_QUIZZES
    all_quizzes = {**QUIZ_DATABASE, **ALL_SUBJECT_QUIZZES}
    if data.quizId not in all_quizzes:
        raise HTTPException(status_code=404, detail="Quiz not found")
        
    quiz = all_quizzes[data.quizId]
    total_q = len(quiz["questions"])
    correct_count = 0
    weak_topics = []

    for q in quiz["questions"]:
        user_ans = data.userAnswers.get(str(q["id"]))
        if user_ans is not None and int(user_ans) == q["correct"]:
            correct_count += 1
        else:
            weak_topics.append(q.get("topic", "General"))

    percentage = round((correct_count / total_q) * 100, 1) if total_q > 0 else 0
    passed = percentage >= quiz["passing_score"]

    # AI Upskilling Plan Recommendations
    learning_roadmap = []
    for topic in set(weak_topics):
        if topic == "Calculus":
            learning_roadmap.append("Khan Academy - Derivatives & Integrals for Machine Learning")
        elif topic == "Statistics":
            learning_roadmap.append("StatQuest with Josh Starmer - Hypothesis Testing & p-values")
        elif topic == "Linear Algebra":
            learning_roadmap.append("3Blue1Brown - Essence of Linear Algebra Series")
        elif topic == "Machine Learning":
            learning_roadmap.append("Coursera / Andrew Ng - Machine Learning & Model Evaluation Metrics")
        elif topic == "Grammar" or topic == "Vocabulary":
            learning_roadmap.append("BBC Learning English - Advanced Business English Communication")
        else:
            learning_roadmap.append(f"Recommended Practice Course: Advanced {topic} Mastery")

    return {
        "quizId": data.quizId,
        "score": percentage,
        "passed": passed,
        "weakTopics": list(set(weak_topics)),
        "learningRoadmap": learning_roadmap if learning_roadmap else ["آپ تمام ٹاپکس میں بہترین ہیں! مزید ایڈوانسڈ پروجیکٹس پر کام کریں۔"],
        "badge": {
            "name": f"Verified Expert: {quiz['title']}",
            "status": "PASSED"
        } if passed else None
    }

USER_PROFILES = {
    "user_101": {
        "name": "محمد عدنان",
        "email": "user@example.com",
        "badges": [],
        "certificates": []
    }
}

@app.post("/api/user/claim-certification")
async def claim_certification(user_id: str, subject_id: str, subject_name: str, score: float):
    if score < 70.0:
        raise HTTPException(status_code=400, detail="سرٹیفکیٹ حاصل کرنے کے لیے ٹیسٹ میں کم از کم 70% نمبر لازمی ہیں۔")
    
    user = USER_PROFILES.get(user_id, USER_PROFILES["user_101"])

    cert_id = f"CERT-{uuid.uuid4().hex[:8].upper()}"
    pdf_path = generate_pdf_certificate(user["name"], subject_name, score, cert_id)

    new_badge = {
        "subjectId": subject_id,
        "title": f"Verified Expert: {subject_name}",
        "earnedAt": datetime.now().strftime("%Y-%m-%d"),
        "icon": "🏅",
        "score": f"{score}%"
    }
    
    user["badges"].append(new_badge)
    user["certificates"].append({
        "certId": cert_id,
        "subject": subject_name,
        "downloadUrl": f"/api/certificates/download/{cert_id}"
    })

    return {
        "status": "success",
        "message": "مبارک ہو! آپ کا سرٹیفکیٹ تیار ہو چکا ہے اور بیج آپ کی پروفائل پر لگا دیا گیا ہے۔",
        "badge": new_badge,
        "certificateUrl": f"/api/certificates/download/{cert_id}"
    }

@app.get("/api/creative-courses/curriculum")
async def get_creative_curriculum():
    """گرافک ڈیزائننگ اور ویڈیو ایڈیٹنگ نصاب فراہم کرتا ہے"""
    return CREATIVE_CURRICULUM

@app.post("/api/creative-courses/evaluate-test")
async def evaluate_creative_test(course_type: str, user_answers: dict):
    """ڈیزائننگ اور ایڈیٹنگ ٹیسٹ کے نتائج کا جائزہ لے کر بیج الاٹ کرتا ہے"""
    course = CREATIVE_CURRICULUM.get(course_type, CREATIVE_CURRICULUM["graphic_designing"])
    quiz_questions = course["modules"][0]["quiz"]
    correct = 0
    total = len(quiz_questions)
    weak_topics = []

    for q in quiz_questions:
        ans = user_answers.get(str(q["id"]))
        if ans is not None and int(ans) == q["correct"]:
            correct += 1
        else:
            weak_topics.append(q.get("topic", "General"))

    score = round((correct / total) * 100) if total > 0 else 100
    passed = score >= 70
    badge_title = "🎨 Verified Digital Content Creator"

    return {
        "score": score,
        "passed": passed,
        "badge": {
            "name": badge_title,
            "title": badge_title,
            "earnedAt": datetime.now().strftime("%Y-%m-%d"),
            "skills": course.get("software_covered", ["Photoshop", "Illustrator", "Premiere Pro", "CapCut"])
        },
        "weakTopics": weak_topics,
        "message": "مبارک ہو! آپ نے کریئیٹو ڈومین ٹیسٹ کامیابی سے پاس کر لیا ہے۔" if passed else "ٹیسٹ پاس کرنے کے لیے 70% نمبر لازمی ہیں۔ دوبارہ لیسن کا جائزہ لیں۔"
    }

@app.get("/api/media/demo/{course_key}")
async def get_course_media(course_key: str):
    """کورسز کے لیے آڈیو اور ویڈیو ڈیمو فراہم کرتا ہے"""
    return get_media_by_course(course_key)

@app.get("/api/portfolio/summary/{user_id}")
async def get_user_portfolio_summary(user_id: str):
    """یوزر کی تمام صلاحیتوں، پاس کردہ ٹیسٹوں اور حاصل کردہ بیجز کا خلاصہ"""
    return {
        "user_id": user_id,
        "completed_modules": ["Quranic Tafsir", "English Speaking", "Graphic Design", "Video Editing", "Mathematics & AI"],
        "total_badges": 4,
        "overall_rating": "Master Practitioner",
        "certificate_eligible": True
    }

@app.post("/api/career/match-job")
async def match_job_description(request: JobMatchRequest):
    """سی وی اور جاب ڈسکرپشن کا اے آئی کی ورڈ میچنگ اسکور"""
    return calculate_semantic_match(request.resume_text, request.job_description)

@app.post("/api/career/generate-email")
async def create_hr_email(request: HREmailRequest):
    """ایچ آر کو اؤٹ ریچ ای میل تیار کرنا"""
    email_body = generate_hr_email(request)
    return {"status": "success", "email_text": email_body}

if __name__ == "__main__":

    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
