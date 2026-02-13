import { useCallback, useRef } from "react";

const tones: Record<
  | "hover"
  | "clickMain"
  | "clickSoft"
  | "switchScreen"
  | "success"
  | "revelation",
  { freq: number; duration: number; gain: number; type: OscillatorType; sweep?: boolean }
> = {
  hover: { freq: 500, duration: 0.06, gain: 0.015, type: "sine" },
  clickMain: { freq: 1600, duration: 0.03, gain: 0.08, type: "sine" },
  clickSoft: { freq: 800, duration: 0.03, gain: 0.05, type: "sine" },
  switchScreen: { freq: 150, duration: 0.15, gain: 0.04, type: "square" },
  success: {
    freq: 400,
    duration: 0.4,
    gain: 0.04,
    type: "triangle",
    sweep: true,
  },
  revelation: {
    freq: 200,
    duration: 0.8,
    gain: 0.06,
    type: "sine",
    sweep: true,
  },
};

export default function useUiSound() {
  const contextRef = useRef<AudioContext | null>(null);

  const ensureContext = useCallback(() => {
    if (!contextRef.current) {
      contextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (contextRef.current.state === "suspended") {
      void contextRef.current.resume();
    }
    return contextRef.current;
  }, []);

  const playTone = useCallback((key: keyof typeof tones) => {
      const tone = tones[key];
      const ctx = ensureContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = tone.type;
      osc.frequency.setValueAtTime(tone.freq, ctx.currentTime);

      if (tone.sweep) {
        osc.frequency.exponentialRampToValueAtTime(
          1200,
          ctx.currentTime + tone.duration
        );
        gainNode.gain.setValueAtTime(tone.gain, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + tone.duration);
      } else {
        gainNode.gain.setValueAtTime(tone.gain, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + tone.duration);
      }

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + tone.duration);
    },
    [ensureContext]
  );

  const shutdown = useCallback(() => {
    const ctx = ensureContext();
    const now = ctx.currentTime;

    // Descending "power off" beep.
    const oscA = ctx.createOscillator();
    const gainA = ctx.createGain();
    oscA.type = "square";
    oscA.frequency.setValueAtTime(920, now);
    oscA.frequency.exponentialRampToValueAtTime(180, now + 0.28);
    gainA.gain.setValueAtTime(0.055, now);
    gainA.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    oscA.connect(gainA);
    gainA.connect(ctx.destination);
    oscA.start(now);
    oscA.stop(now + 0.28);

    const oscB = ctx.createOscillator();
    const gainB = ctx.createGain();
    oscB.type = "triangle";
    oscB.frequency.setValueAtTime(170, now + 0.3);
    oscB.frequency.exponentialRampToValueAtTime(95, now + 0.52);
    gainB.gain.setValueAtTime(0.03, now + 0.3);
    gainB.gain.exponentialRampToValueAtTime(0.001, now + 0.52);
    oscB.connect(gainB);
    gainB.connect(ctx.destination);
    oscB.start(now + 0.3);
    oscB.stop(now + 0.52);
  }, [ensureContext]);

  return {
    hover: () => playTone("hover"),
    clickMain: () => playTone("clickMain"),
    clickSoft: () => playTone("clickSoft"),
    switchScreen: () => playTone("switchScreen"),
    success: () => playTone("success"),
    revelation: () => playTone("revelation"),
    shutdown,
  };
}
