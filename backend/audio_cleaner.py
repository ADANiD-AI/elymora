import io
import soundfile as sf
import noisereduce as nr
import librosa
import numpy as np

def clean_and_enhance_audio(input_audio_bytes: bytes) -> bytes:
    """
    ریکارڈ شدہ آڈیو سے شور (Noise) ختم کرتا ہے اور آواز کو کلیئر کرتا ہے
    """
    try:
        # 1. آڈیو ڈیٹا کو لوڈ کریں
        audio_data, sample_rate = librosa.load(io.BytesIO(input_audio_bytes), sr=None)

        # 2. Spectral Gating کے ذریعے پس منظر کا شور ختم کریں
        # stationary=True پس منظر کے مستقل شور (جیسے پنکھا، اے سی، ہمنگ) کو بالکل صاف کر دیتا ہے
        reduced_noise = nr.reduce_noise(
            y=audio_data, 
            sr=sample_rate, 
            stationary=True,
            prop_decrease=0.85  # 85% شور ختم کرے گا تاکہ آواز نیچرل رہے
        )

        # 3. آواز کا والیم نارملائز کریں (Volume Normalization)
        max_gain = np.max(np.abs(reduced_noise))
        if max_gain > 0:
            cleaned_audio = reduced_noise / max_gain
        else:
            cleaned_audio = reduced_noise

        # 4. صاف شدہ آڈیو کو دوبارہ WAV فارمیٹ کے بائٹس میں تبدیل کریں
        out_io = io.BytesIO()
        sf.write(out_io, cleaned_audio, sample_rate, format='WAV')
        out_io.seek(0)
        
        return out_io.read()
    except Exception as e:
        print(f"Audio processing warning: {e}")
        return input_audio_bytes
