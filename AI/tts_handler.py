from tts_engine import speak_text

def getairesponce(ans):
    """Speak the AI response."""
    try:
        speak_text(ans, voice="")
    except Exception as e:
        print(f"[ERROR] Failed to speak text: {e}")
