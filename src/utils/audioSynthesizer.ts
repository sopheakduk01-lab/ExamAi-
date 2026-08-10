// Web Audio API Sound Synthesizer for Character Dance Beats

let audioCtx: AudioContext | null = null;

export function getSafeAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx || audioCtx.state === 'closed') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {
        // Silently handle suspended audio context
      });
    }
    return audioCtx;
  } catch (err) {
    console.warn('Audio device unavailable or restricted by browser policy:', err);
    return null;
  }
}

export function playDanceBeat(beatType: string) {
  try {
    const ctx = getSafeAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (beatType === 'khmer-tro') {
      // Play Khmer traditional chime & melody sequence
      const notes = [440, 523.25, 659.25, 783.99, 880, 659.25, 523.25, 440];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.15);
        gain.gain.setValueAtTime(0.2, now + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.15);
        osc.stop(now + idx * 0.15 + 0.35);
      });
    } else if (beatType === 'magic-chime') {
      // High pitched magical twinkling bells
      const freqs = [523, 659, 783, 1046, 1318, 1567, 2093];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.15, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.45);
      });
    } else if (beatType === 'electro-pop') {
      // Electro pop synth beat
      const bassNotes = [130.81, 146.83, 164.81, 174.61];
      bassNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.2);
        gain.gain.setValueAtTime(0.25, now + idx * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.2 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.2);
        osc.stop(now + idx * 0.2 + 0.28);
      });
    } else if (beatType === 'hero-march') {
      // Fanfare brass sound
      const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 523.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + idx * 0.18);
        gain.gain.setValueAtTime(0.15, now + idx * 0.18);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.18);
        osc.stop(now + idx * 0.18 + 0.35);
      });
    } else {
      // Default happy upbeat synth tune
      const melody = [392, 440, 523, 587, 659, 783, 880];
      melody.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.2, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.3);
      });
    }
  } catch (e) {
    console.log('Audio playback prevented or not supported', e);
  }
}

/**
 * Configures an utterance for a sweet Khmer female voice.
 * Adjusts pitch, rate, and selects the best female Khmer voice if available.
 */
export function configureKhmerFemaleVoice(utterance: SpeechSynthesisUtterance) {
  utterance.lang = 'km-KH';
  utterance.rate = 0.88;  // Elegant, clear reading rate
  utterance.pitch = 1.15; // Slightly higher pitch for a sweet, polite female-like tone
  
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices();
    
    // Find Khmer voices
    const khmerVoices = voices.filter(v => {
      const l = v.lang.toLowerCase();
      const n = v.name.toLowerCase();
      return l.includes('km') || l.includes('khmer') || n.includes('khmer') || n.includes('cambodia');
    });

    if (khmerVoices.length > 0) {
      // Find female-sounding names
      const femaleKeywords = ['female', 'srey', 'nary', 'sreypich', 'sophea', 'liana', 'siri', 'soft', 'sweet', 'ស្រី', 'នារី'];
      const femaleVoice = khmerVoices.find(v => 
        femaleKeywords.some(kw => v.name.toLowerCase().includes(kw))
      );

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      } else {
        // Fallback: Google or online voices which are typically high quality female voices
        const onlineOrGoogleVoice = khmerVoices.find(v => 
          v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('microsoft') || v.localService === false
        );
        if (onlineOrGoogleVoice) {
          utterance.voice = onlineOrGoogleVoice;
        } else {
          utterance.voice = khmerVoices[0];
        }
      }
    }
  }
}

