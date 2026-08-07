# لوکل سیٹ اپ اور ٹرمینل کمانڈز کی ہدایت نامہ (Local Setup Guide in Urdu)

یہ ہدایت نامہ پائیتھن FastAPI بیک اینڈ اور Next.js فرنٹ اینڈ کو آپ کے کمپیوٹر پر مقامی طور پر (Locally) چلانے کے لیے ہے۔

---

## 1. پائیتھن بیک اینڈ سیٹ اپ (Python FastAPI Backend)

ٹرمینل کھولیں اور پروجیکٹ کی جڑ (Root) سے `backend` ڈائریکٹری میں جائیں:

```bash
cd backend
```

پائیتھن ورچوئل انوائرمنٹ (Virtual Environment) بنائیں اور ایکٹیویٹ کریں:

```bash
# لینوکس یا میک (Linux / macOS) کے لیے:
python3 -m venv venv
source venv/bin/activate

# ونڈوز (Windows) کے لیے:
python -m venv venv
venv\Scripts\activate
```

درکار تمام لائبیریاں انسٹال کریں (Sentence-Transformers, FastAPI, PyPDF, Scikit-learn):

```bash
pip install -r requirements.txt
```

FastAPI سرور کو پورٹ 8000 پر سٹارٹ کریں:

```bash
uvicorn main:app --reload --port 8000
```

سرور اب `http://localhost:8000` پر آن لائن ہو جائے گا اور آپ Swagger Docs `http://localhost:8000/docs` پر دیکھ سکتے ہیں۔

---

## 2. فرنٹ اینڈ سیٹ اپ (Next.js / React Frontend)

ایک نیا ٹرمینل ونڈو کھولیں اور فرنٹ اینڈ ڈائریکٹری میں جائیں:

```bash
cd frontend
```

تمام پیکیجز انسٹال کریں:

```bash
npm install
```

ڈیولپمنٹ سرور کو پورٹ 3000 پر سٹارٹ کریں:

```bash
npm run dev
```

اب اپنے براؤزر میں `http://localhost:3000` کھولیں اور اپنا PDF سی وی اپلوڈ کر کے لوکل 100% مفت AI میچنگ اور کولڈ ای میل جنریٹر استعمال کریں!
