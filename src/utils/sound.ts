// Sound and Speech Synthesis utilities for interactive English learning

// Sound and Speech Synthesis utilities for interactive English learning

/**
 * Cleans text for speech synthesis so that screen readers and TTS engines
 * pronounce only the natural spoken words and do NOT read punctuation, symbols,
 * hyphens, dashes, brackets, underscores, slashes, or special characters.
 */
export function cleanTextForSpeech(text: string): string {
  if (!text) return '';

  let cleaned = text;

  // 1. Remove emojis and visual Unicode symbols
  cleaned = cleaned.replace(/[\u{1F300}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}]/gu, ' ');

  // 2. Remove Khmer script / non-Latin characters from bilingual strings (so English voice reads only English)
  cleaned = cleaned.replace(/[\u1780-\u17FF\u19E0-\u19FF]/g, ' ');

  // 3. Expand common grammar abbreviations for natural pronunciation
  cleaned = cleaned.replace(/\be\.g\.,?\b/gi, 'for example,');
  cleaned = cleaned.replace(/\bi\.e\.,?\b/gi, 'that is,');
  cleaned = cleaned.replace(/\betc\.,?\b/gi, 'and so on.');
  cleaned = cleaned.replace(/\betc\b/gi, 'and so on');
  cleaned = cleaned.replace(/\bvs\.,?\b/gi, 'versus');
  cleaned = cleaned.replace(/\bvs\b/gi, 'versus');
  cleaned = cleaned.replace(/\b(subj|Subj)\.?\b/g, 'Subject');
  cleaned = cleaned.replace(/\b(obj|Obj)\.?\b/g, 'Object');
  cleaned = cleaned.replace(/\b(v|V)-ing\b/g, 'verb I N G');
  cleaned = cleaned.replace(/\b(v|V)1\b/g, 'verb one');
  cleaned = cleaned.replace(/\b(v|V)2\b/g, 'verb two');
  cleaned = cleaned.replace(/\b(v|V)3\b/g, 'verb three');
  cleaned = cleaned.replace(/\bp\.p\.\b/gi, 'past participle');

  // 4. Handle fill-in-the-blank lines (e.g. _____, ....., -----) -> replace with a smooth brief pause
  cleaned = cleaned.replace(/_{2,}/g, ' , ');
  cleaned = cleaned.replace(/-{2,}/g, ' , ');
  cleaned = cleaned.replace(/\.{3,}/g, ' , ');

  // 5. Convert grammatical operator symbols into spoken equivalents or smooth pauses
  cleaned = cleaned.replace(/->|=>|→|➜/g, ' becomes ');
  cleaned = cleaned.replace(/&/g, ' and ');
  cleaned = cleaned.replace(/\+/g, ' plus ');
  cleaned = cleaned.replace(/=/g, ' equals ');
  cleaned = cleaned.replace(/\//g, ' or ');

  // 6. Strip all brackets, braces, and parenthetical symbols but keep the words inside
  cleaned = cleaned.replace(/[()[\]{}<>"“”«»`~#*^|\\_]/g, ' ');

  // 7. Strip leading/trailing/isolated hyphens & dashes (e.g. " - ", "-ed", "-ing", "word - word")
  // Keep apostrophes in words like "don't", "I'll", "Sarah's"
  cleaned = cleaned.replace(/(^|\s)[-–—]+(\w)/g, '$1$2'); // remove leading dash from "-ing" or "-ed"
  cleaned = cleaned.replace(/[-–—]+/g, ' '); // replace standalone or remaining dashes with space

  // 8. Clean up stray punctuation so the speech engine doesn't pronounce symbols like "dot", "comma", "colon"
  // Remove colons, semicolons, question/exclamation clustering
  cleaned = cleaned.replace(/[:;]/g, ', ');
  cleaned = cleaned.replace(/\?+/g, '?');
  cleaned = cleaned.replace(/!+/g, '!');
  cleaned = cleaned.replace(/,+/g, ',');

  // Ensure commas and periods only exist right after letters, not standalone
  cleaned = cleaned.replace(/\s+([.,!?])/g, '$1 ');
  cleaned = cleaned.replace(/([.,!?])\1+/g, '$1');

  // 9. Consolidate whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  // If text became just punctuation or empty, return empty
  if (/^[.,!?\s]*$/.test(cleaned)) {
    return '';
  }

  return cleaned;
}

class SoundManager {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initAudio() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playClick() {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.1);

      osc.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.1);
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  }

  public playCorrect() {
    if (this.isMuted) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
      osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
      osc1.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3); // C6

      osc2.frequency.setValueAtTime(261.63, now);
      osc2.frequency.exponentialRampToValueAtTime(523.25, now + 0.3);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.5);
      osc2.stop(now + 0.5);
    } catch {
      // AudioContext unavailable or blocked
    }
  }

  public playIncorrect() {
    if (this.isMuted) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.linearRampToValueAtTime(160, now + 0.25); // E3

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // AudioContext unavailable
    }
  }

  public playComplete() {
    if (this.isMuted) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.4);
      });
    } catch {
      // AudioContext unavailable
    }
  }

  public speak(text: string, lang = 'en-US', rate = 0.9, onEnd?: () => void, onError?: () => void) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // stop any ongoing speech

    // Clean text thoroughly of punctuation, brackets, dashes, symbols, etc.
    const cleanText = cleanTextForSpeech(text);
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = rate; // clear, comfortable pace for learners
    utterance.pitch = 1.0;

    if (onEnd) utterance.onend = onEnd;
    if (onError) utterance.onerror = onError;
    
    // Prioritize high-quality, clear female English voices across different platforms (macOS, Windows, Android, iOS)
    const voices = window.speechSynthesis.getVoices();
    
    // Preferred clear female voices
    const preferredVoices = [
      'Samantha',       // macOS/iOS high quality female
      'Karen',          // macOS/iOS female
      'Tessa',          // macOS/iOS female
      'Victoria',       // macOS/iOS female
      'Microsoft Zira', // Windows female
      'Microsoft Zira Desktop', // Windows female
      'Microsoft Hazel', // Windows UK female
      'Google US English', // Chrome OS/Android (often female)
      'Google UK English Female', // Chrome UK female
      'English United States (Female)' // Some Android/Samsung
    ];

    let selectedVoice = null;

    // 1. Try to find a specifically preferred high-quality female voice that is locally available
    for (const pref of preferredVoices) {
      let match = voices.find(v => v.name.includes(pref) && v.lang.startsWith('en') && v.localService);
      if (!match) {
        // Fallback to online version of the same voice if local is not found
        match = voices.find(v => v.name.includes(pref) && v.lang.startsWith('en'));
      }
      if (match) {
        selectedVoice = match;
        break;
      }
    }

    // 2. Fallback to any voice that explicitly says 'Female' and is English (prefer local)
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.name.toLowerCase().includes('female') && v.lang.startsWith('en') && v.localService) 
        || voices.find(v => v.name.toLowerCase().includes('female') && v.lang.startsWith('en'));
    }

    // 3. Fallback to any English voice (prefer local)
    if (!selectedVoice) {
      selectedVoice = voices.find(v => (v.lang === 'en-US' || v.lang === 'en-GB' || v.lang.startsWith('en')) && v.localService)
        || voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB' || v.lang.startsWith('en'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundManager = new SoundManager();
