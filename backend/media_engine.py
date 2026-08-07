# backend/media_engine.py

MEDIA_ASSETS = {
    "graphic_designing": {
        "demo_video_url": "https://www.w3schools.com/html/mov_bbb.mp4",
        "title": "Photoshop & Illustrator Practical Interface Setup",
        "duration": "05:20"
    },
    "video_editing": {
        "demo_video_url": "https://www.w3schools.com/html/mov_bbb.mp4",
        "title": "Premiere Pro Timeline & Cuts Mastery",
        "duration": "08:15"
    },
    "quran_recitation": {
        "audio_url": "https://www.w3schools.com/html/horse.mp3",
        "title": "Correct Tajweed Pronunciation Guide",
        "duration": "02:10"
    }
}

def get_media_by_course(course_key: str):
    return MEDIA_ASSETS.get(course_key, {})
