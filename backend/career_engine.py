# backend/career_engine.py

from pydantic import BaseModel
from typing import List, Optional

class ResumeData(BaseModel):
    full_name: str
    email: str
    phone: str
    skills: List[str]
    experience_years: int
    education: str
    summary: str

class JobMatchRequest(BaseModel):
    resume_text: str
    job_description: str

class HREmailRequest(BaseModel):
    candidate_name: str
    job_title: str
    company_name: str
    key_skills: List[str]

def calculate_semantic_match(resume_text: str, job_description: str) -> dict:
    """سی وی اور جاب ڈسکرپشن کے درمیان مطابقت (Match Score) کا حساب"""
    resume_words = set(resume_text.lower().split())
    job_words = set(job_description.lower().split())
    
    if not job_words:
        return {"match_score": 0, "missing_keywords": []}
    
    matched_words = resume_words.intersection(job_words)
    missing_words = list(job_words - resume_words)[:5]
    
    match_score = round((len(matched_words) / len(job_words)) * 100, 1)
    
    return {
        "match_score": min(match_score * 2.5, 95.0),  # Normalize score percentage
        "missing_keywords": missing_words,
        "recommendation": "سی وی میں ان کلیدی الفاظ (Keywords) کا اضافہ کریں تا کہ ATS فلٹر پاس ہو سکے۔"
    }

def generate_hr_email(data: HREmailRequest) -> str:
    """ایچ آر کو بھیجنے کے لیے پیشہ ورانہ ای میل متن"""
    skills_str = ", ".join(data.key_skills)
    return f"""Subject: Application for {data.job_title} Position - {data.candidate_name}

Dear Hiring Manager at {data.company_name},

I am writing to express my strong interest in the {data.job_title} role. With hands-on expertise in {skills_str}, I am confident in my ability to add immediate value to your engineering team.

Please find my resume attached for your review. I look forward to the opportunity to discuss how my skill set aligns with your goals.

Best regards,
{data.candidate_name}
"""
