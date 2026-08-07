# backend/creative_curriculum.py

CREATIVE_CURRICULUM = {
    "graphic_designing": {
        "title": "گرافک ڈیزائننگ ماسٹری (Graphic Design Mastery)",
        "software_covered": ["Adobe Photoshop", "Adobe Illustrator", "Canva"],
        "modules": [
            {
                "id": 1,
                "topic": "ڈیزائن کے بنیادی اصول اور کلر تھیوری (Design Principles & Color Theory)",
                "summary": "Typography, Color Psychology (RGB vs CMYK), Grid Alignment اور Composition کے اصول۔",
                "key_concepts": [
                    "RGB: ڈیجیٹل اسکرینز کے لیے استعمال ہوتا ہے۔",
                    "CMYK: پرنٹنگ کے لیے استعمال ہوتا ہے۔",
                    "Vector graphics (Illustrator) پکسلیٹ (Pixellate) ہوئے بغیر ری سائز ہوتی ہیں۔"
                ],
                "quiz": [
                    {
                        "id": 501,
                        "question": "پرنٹنگ میڈیا (سوشل میڈیا یا ویب سائٹس کے علاوہ) کے لیے کون سا کلر موڈ استعمال کیا جاتا ہے؟",
                        "options": ["RGB", "CMYK", "Grayscale", "HSB"],
                        "correct": 1,
                        "topic": "Color Modes"
                    },
                    {
                        "id": 502,
                        "question": "Adobe Illustrator میں بنائی گئی ویکٹر امیج (Vector Graphic) کا کیا فائدہ ہے؟",
                        "options": ["یہ پرانی امیج بن جاتی ہے", "جتنا بھی بڑا کر لیں کوالٹی خراب یا پکسلیٹ نہیں ہوتی", "یہ صرف بلیک اینڈ وائٹ ہوتی ہے", "اس کا سائز ہمیشہ بڑا ہوتا ہے"],
                        "correct": 1,
                        "topic": "Vector Graphics"
                    }
                ]
            }
        ]
    },
    "video_editing": {
        "title": "ویڈیو ایڈیٹنگ اور پوسٹ پروڈکشن (Video Editing & Post-Production)",
        "software_covered": ["Adobe Premiere Pro", "CapCut", "DaVinci Resolve"],
        "modules": [
            {
                "id": 1,
                "topic": "ٹائم لائن، کٹس اور آڈیو مکسنگ (Timeline, Cuts & Transitions)",
                "summary": "Rough Cut, J-Cut, L-Cut, Aspect Ratios (16:9 vs 9:16) اور کلر گریڈنگ کا تعارف۔",
                "key_concepts": [
                    "9:16 Aspect Ratio: Shorts, Reels, اور TikTok کے لیے معیاری سائز ہے۔",
                    "J-Cut: جب اگلی کلپ کی آواز تصویر سے پہلے شروع ہو جائے۔"
                ],
                "quiz": [
                    {
                        "id": 503,
                        "question": "یوٹیوب شارٹس (Shorts) اور انسٹاگرام ریلز (Reels) کا معیاری Aspect Ratio کیا ہوتا ہے؟",
                        "options": ["16:9", "4:3", "9:16", "1:1"],
                        "correct": 2,
                        "topic": "Aspect Ratios"
                    },
                    {
                        "id": 504,
                        "question": "ویڈیو ایڈیٹنگ میں 'J-Cut' کسے کہتے ہیں؟",
                        "options": [
                            "جب ویڈیو کی تصویر پہلے اور آواز بعد میں آئے",
                            "جب اگلے سین کی آڈیو تصویر بدلنے سے پہلے سنائی دینے لگے",
                            "جب ویڈیو کا سائز جے پی جی میں بدل جائے",
                            "جب ٹائم لائن پر کٹ لگایا جائے"
                        ],
                        "correct": 1,
                        "topic": "Video Cuts"
                    }
                ]
            }
        ]
    }
}
