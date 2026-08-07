import os
from datetime import datetime

def generate_pdf_certificate(user_name: str, subject_name: str, score: float, certificate_id: str) -> str:
    """
    یوزر کے ٹیسٹ پاس کرنے پر ایک خوبصورت PDF سرٹیفکیٹ تیار کرتا ہے
    """
    issue_date = datetime.now().strftime("%B %d, %Y")
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Certificate - {certificate_id}</title>
        <style>
            @page {{ size: A4 landscape; margin: 0; }}
            body {{
                font-family: 'Helvetica', 'Arial', sans-serif;
                text-align: center;
                padding: 40px;
                border: 12px solid #1e3a8a;
                background-color: #f8fafc;
                margin: 0;
            }}
            .title {{ text-transform: uppercase; font-size: 32px; color: #1e3a8a; font-weight: bold; margin-bottom: 10px; letter-spacing: 2px; }}
            .subtitle {{ font-size: 16px; color: #475569; margin-bottom: 30px; }}
            .name {{ font-size: 36px; font-weight: bold; color: #0f172a; text-decoration: underline; margin: 25px 0; letter-spacing: 1px; }}
            .course {{ font-size: 24px; color: #2563eb; font-weight: bold; margin-bottom: 20px; }}
            .details {{ font-size: 14px; color: #64748b; margin-top: 30px; }}
            .badge-box {{ margin-top: 20px; display: inline-block; padding: 12px 24px; background: #dcfce7; color: #15803d; border-radius: 20px; font-weight: bold; font-size: 16px; border: 1px solid #86efac; }}
            .footer {{ margin-top: 50px; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }}
        </style>
    </head>
    <body>
        <div class="title">Certificate of Completion</div>
        <div class="subtitle">This is proudly presented to</div>
        
        <div class="name">{user_name}</div>
        
        <p class="subtitle">for successfully passing the study roadmap and final evaluation test in</p>
        <div class="course">{subject_name}</div>
        
        <div class="badge-box">Verified Score: {score}% | Status: PASSED</div>
        
        <div class="details">
            <p>Issued Date: {issue_date}</p>
            <p>Certificate Verification ID: <strong>{certificate_id}</strong></p>
        </div>
        
        <div class="footer">
            <p>Verified by Open-Source AI Career Platform Engine</p>
        </div>
    </body>
    </html>
    """
    
    file_path = f"certificates/{certificate_id}.pdf"
    os.makedirs("certificates", exist_ok=True)
    try:
        from weasyprint import HTML
        HTML(string=html_content).write_pdf(file_path)
    except Exception as e:
        # Fallback to saving HTML file if Weasyprint library dependencies differ
        file_path = f"certificates/{certificate_id}.html"
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(html_content)
            
    return file_path
