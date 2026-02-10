import { useCallback, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export type AudioHandle = {
  pause: () => void;
  isPlaying: () => boolean;
};

type AudioPlayerProps = {
  id: string | number;
  audioUrl: string;
  allowRepeat?: boolean;
  disabled?: boolean;
  onPlayComplete?: (id: string | number) => void;
  onStart?: (id: string | number) => void;
  onRef?: (id: string | number, handle: AudioHandle | null) => void;
};

export default function AudioPlayer({
  id,
  audioUrl,
  allowRepeat = false,
  disabled = false,
  onPlayComplete,
  onStart,
  onRef,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<WaveSurfer | null>(null);
  const onPlayCompleteRef = useRef(onPlayComplete);
  const onRefRef = useRef(onRef);
  const onStartRef = useRef(onStart);

  useEffect(() => {
    onPlayCompleteRef.current = onPlayComplete;
  }, [onPlayComplete]);

  useEffect(() => {
    onRefRef.current = onRef;
  }, [onRef]);

  useEffect(() => {
    onStartRef.current = onStart;
  }, [onStart]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !audioUrl) return;

    let completed = false;
    const markCompleted = () => {
      if (completed) return;
      completed = true;
      setIsPlaying(false);
      setHasPlayed(true);
      onPlayCompleteRef.current?.(id);
    };

    const wave = WaveSurfer.create({
      container,
      url: audioUrl,
      waveColor: "rgba(0, 242, 255, 0.3)",
      progressColor: "#00f2ff",
      cursorColor: "#ff8c00",
      barWidth: 2,
      barGap: 2,
      height: 60,
      normalize: true,
      interact: allowRepeat,
    });

    waveRef.current = wave;

    wave.on("finish", markCompleted);

    wave.on("play", () => setIsPlaying(true));
    wave.on("pause", () => setIsPlaying(false));
    wave.on("timeupdate", (time) => {
      const duration = wave.getDuration();
      if (!duration) return;
      if (!allowRepeat && !completed && time >= duration - 0.15) {
        markCompleted();
      }
    });

    onRefRef.current?.(id, {
      pause: () => wave.pause(),
      isPlaying: () => wave.isPlaying(),
    });

    return () => {
      wave.destroy();
      waveRef.current = null;
      onRefRef.current?.(id, null);
    };
  }, [audioUrl, id, allowRepeat]);

  const handlePlayPause = useCallback(() => {
    if (!waveRef.current) return;
    if (disabled) return;
    if (!allowRepeat && hasPlayed) return;
    onStartRef.current?.(id);
    waveRef.current.playPause();
  }, [allowRepeat, disabled, hasPlayed, id]);

  const canPlay = !disabled && (allowRepeat || !hasPlayed);

  return (
    <div className={`audio-player ${disabled ? "opacity-50" : ""}`}>
      <div className="flex items-center gap-4 mb-3">
        <button
          className="play-button"
          onClick={handlePlayPause}
          disabled={!canPlay}
          type="button"
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="flex-1">
          <div ref={containerRef} className="waveform-container" />
        </div>
      </div>
      {!allowRepeat && hasPlayed && (
        <div className="text-xs text-tech-dim uppercase tracking-wider mt-2">
          Audio reproducido_sistema bloqueado
        </div>
      )}
    </div>
  );
}
