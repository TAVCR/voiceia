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
  showMeta?: boolean;
  warmupMode?: "none" | "hover" | "viewport";
  onPlayComplete?: (id: string | number) => void;
  onStart?: (id: string | number) => void;
  onRef?: (id: string | number, handle: AudioHandle | null) => void;
};

export default function AudioPlayer({
  id,
  audioUrl,
  allowRepeat = false,
  disabled = false,
  showMeta = false,
  warmupMode = "hover",
  onPlayComplete,
  onStart,
  onRef,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<WaveSurfer | null>(null);
  const pendingPlayRef = useRef(false);
  const loadRequestedRef = useRef(false);
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

    wave.on("ready", () => {
      setDuration(wave.getDuration() || 0);
      setIsLoading(false);
      setHasLoaded(true);
      if (pendingPlayRef.current) {
        pendingPlayRef.current = false;
        wave.play();
      }
    });

    wave.on("finish", markCompleted);
    wave.on("error", () => {
      setIsLoading(false);
      pendingPlayRef.current = false;
      loadRequestedRef.current = false;
    });

    wave.on("play", () => setIsPlaying(true));
    wave.on("pause", () => setIsPlaying(false));
    wave.on("decode", (decodedDuration) => setDuration(decodedDuration || 0));
    wave.on("timeupdate", (time) => {
      setCurrentTime(time);
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

  const requestLoad = useCallback(() => {
    const wave = waveRef.current;
    if (!wave || !audioUrl) return;
    if (loadRequestedRef.current || hasLoaded || isLoading) return;

    loadRequestedRef.current = true;
    setIsLoading(true);
    wave.load(audioUrl);
  }, [audioUrl, hasLoaded, isLoading]);

  useEffect(() => {
    if (warmupMode !== "viewport") return;

    const container = containerRef.current;
    if (!container) return;

    if (typeof IntersectionObserver === "undefined") {
      const timerId = window.setTimeout(() => {
        requestLoad();
      }, 450);
      return () => window.clearTimeout(timerId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          requestLoad();
          observer.disconnect();
          break;
        }
      },
      { root: null, rootMargin: "300px 0px", threshold: 0.01 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [requestLoad, warmupMode]);

  const handlePlayPause = useCallback(() => {
    if (!waveRef.current) return;
    if (disabled) return;
    if (!allowRepeat && hasPlayed) return;
    if (isLoading) return;

    onStartRef.current?.(id);

    if (!hasLoaded) {
      pendingPlayRef.current = true;
      requestLoad();
      return;
    }

    waveRef.current.playPause();
  }, [allowRepeat, disabled, hasLoaded, hasPlayed, id, isLoading, requestLoad]);

  const canPlay = !disabled && (allowRepeat || !hasPlayed);
  const statusLabel = isLoading ? "Cargando audio..." : "Listo";

  const formatTime = (value: number) => {
    if (!Number.isFinite(value) || value <= 0) return "0:00";
    const totalSeconds = Math.floor(value);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className={`audio-player ${disabled ? "opacity-50" : ""}`}>
      <div className="flex items-center gap-4 mb-3">
        <button
          className="play-button"
          onClick={handlePlayPause}
          onMouseEnter={warmupMode !== "none" ? requestLoad : undefined}
          onFocus={warmupMode !== "none" ? requestLoad : undefined}
          onTouchStart={warmupMode !== "none" ? requestLoad : undefined}
          disabled={!canPlay || isLoading}
          type="button"
          aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}
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
      {showMeta && (
        <div className="audio-player-meta" aria-live="polite">
          <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
          <span>{statusLabel}</span>
        </div>
      )}
      {!allowRepeat && hasPlayed && (
        <div className="text-xs text-tech-dim uppercase tracking-wider mt-2">
          Audio reproducido_sistema bloqueado
        </div>
      )}
    </div>
  );
}
