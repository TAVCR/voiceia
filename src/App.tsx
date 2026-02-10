import { useEffect, useRef, useState } from "react";
import AudioPlayer, { type AudioHandle } from "./components/AudioPlayer";
import useUiSound from "./hooks/useUiSound";
import { ADMIN, CONFIG, CONTACT, COPY, LOGO_URL } from "./content";

type Choice = "human" | "ai";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasReachedFinal, setHasReachedFinal] = useState(false);
  const [completedAudios, setCompletedAudios] = useState<Record<number, boolean>>(
    {}
  );
  const [userChoices, setUserChoices] = useState<Record<number, Choice>>({});
  const [showSecondary, setShowSecondary] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const audioRefs = useRef<Record<string | number, AudioHandle | null>>({});
  const sound = useUiSound();
  const whatsappLink = CONTACT.whatsapp
    ? CONTACT.whatsapp.replace(/\D/g, "")
    : "";

  useEffect(() => {
    const stored = window.localStorage.getItem("voices_admin");
    if (stored === "1") {
      setIsAdmin(true);
    }

    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get("admin");
    if (adminParam && adminParam === ADMIN.code) {
      window.localStorage.setItem("voices_admin", "1");
      setIsAdmin(true);
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.code === "KeyA") {
        event.preventDefault();
        const input = window.prompt("Código admin:");
        if (!input) return;
        if (input === ADMIN.code) {
          window.localStorage.setItem("voices_admin", "1");
          setIsAdmin(true);
          window.alert("Modo admin activado");
        } else {
          window.alert("Código incorrecto");
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const nextScreen = () => {
    sound.switchScreen();
    setCurrentScreen((prev) => Math.min(prev + 1, 8));
    window.scrollTo(0, 0);
  };

  const prevScreen = () => {
    sound.switchScreen();
    setCurrentScreen((prev) => Math.max(prev - 1, 2));
    window.scrollTo(0, 0);
  };

  const setAudioRef = (id: string | number, handle: AudioHandle | null) => {
    audioRefs.current[id] = handle;
  };

  const handleStart = (id: string | number) => {
    Object.entries(audioRefs.current).forEach(([key, handle]) => {
      if (String(key) !== String(id) && handle?.isPlaying()) {
        handle.pause();
      }
    });
  };

  const handleAudioComplete = (projectId: number) => {
    setCompletedAudios((prev) => ({ ...prev, [projectId]: true }));
  };

  const handleChoiceChange = (projectId: number, choice: Choice) => {
    sound.clickSoft();
    setUserChoices((prev) => ({ ...prev, [projectId]: choice }));
  };

  const recognitionProjects = [...CONFIG.audioProjects].sort((a, b) => {
    if (a.title === "KIWIGLOWCR") return -1;
    if (b.title === "KIWIGLOWCR") return 1;
    return 0;
  });

  const completedCount = recognitionProjects.filter(
    (p) => completedAudios[p.id]
  ).length;
  const chosenCount = recognitionProjects.filter((p) => userChoices[p.id])
    .length;
  const canProceed = isAdmin || (completedCount >= 3 && chosenCount >= 3);

  useEffect(() => {
    if (currentScreen === 3) {
      sound.revelation();
      const timer = setTimeout(() => setShowSecondary(true), 1500);
      return () => clearTimeout(timer);
    }
    if (currentScreen === 8) {
      setHasReachedFinal(true);
    }
    setShowSecondary(false);
    return undefined;
  }, [currentScreen, sound]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    sound.clickSoft();

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch(CONFIG.formspreeUrl, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        sound.success();
        setSubmitStatus("success");
        e.currentTarget.reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus(null), 4000);
  };

  return (
    <div className="relative">
      <div className="scanline" />
      {isAdmin && <div className="admin-indicator">ADMIN_MODE</div>}
      {hasReachedFinal && currentScreen > 2 && (
        <button
          type="button"
          className="back-arrow"
          onClick={prevScreen}
          aria-label="Volver"
        >
          ← VOLVER
        </button>
      )}

      {currentScreen === 1 && (
        <section className="screen-container">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-10 md:mb-14">
              <span className="text-xs text-tech-accent tracking-[0.4em] opacity-50">
                {COPY.screen1.tagline}
              </span>
            </div>

            <h1 className="tech-title text-[clamp(2.8rem,8.5vw,9rem)] mb-10 text-balance">
              <span className="block text-white mb-4">
                {COPY.screen1.title1}
              </span>
              <span className="block title-accent glitch-text">
                {COPY.screen1.title2}
              </span>
            </h1>

            <p className="text-[clamp(1rem,2.2vw,1.6rem)] text-zinc-400 mb-14 max-w-3xl mx-auto leading-relaxed uppercase tracking-wide whitespace-pre-line">
              {COPY.screen1.subtitle}
            </p>

            <button
              className="tech-button-primary"
              onClick={() => {
                sound.clickMain();
                nextScreen();
              }}
              type="button"
            >
              {COPY.screen1.buttonText}
            </button>
          </div>
        </section>
      )}

      {currentScreen === 2 && (
        <section className="screen-container">
          <div className="max-w-5xl mx-auto w-full">
            <div className="mb-10 text-center">
              <h2 className="tech-title text-[clamp(2.1rem,6.2vw,4.5rem)] mb-6 title-accent tracking-[0.12em] text-balance">
                {COPY.screen2.title}
              </h2>
              <p className="mx-auto max-w-3xl text-[clamp(0.9rem,2.4vw,1.2rem)] text-tech-warning uppercase tracking-widest">
                {COPY.screen2.warning}
              </p>
            </div>

            <div className="space-y-8 pb-8 md:pb-12">
              {recognitionProjects.map((project) => (
                <div key={project.id} className="tech-box p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-tech-accent tracking-wider">
                      {project.title}
                    </h3>
                    <span className="text-xs text-tech-dim">
                      {completedAudios[project.id] ? "COMPLETADO" : "PENDIENTE"}
                    </span>
                  </div>

                  <AudioPlayer
                    id={project.id}
                    audioUrl={project.aiAudioUrl}
                    onPlayComplete={() => handleAudioComplete(project.id)}
                    allowRepeat={false}
                    onStart={handleStart}
                    onRef={setAudioRef}
                  />

                  <div className="mt-6 flex gap-8 justify-center">
                    <label
                      className={`flex items-center gap-3 cursor-pointer group ${
                        completedAudios[project.id] || isAdmin
                          ? ""
                          : "opacity-40 cursor-not-allowed"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`choice_${project.id}`}
                        value="human"
                        className="radio-tech"
                        onChange={() => handleChoiceChange(project.id, "human")}
                        checked={userChoices[project.id] === "human"}
                        disabled={!completedAudios[project.id] && !isAdmin}
                      />
                      <span className="text-sm uppercase tracking-wider group-hover:text-tech-accent transition-colors">
                        {COPY.screen2.optionHuman}
                      </span>
                    </label>

                    <label
                      className={`flex items-center gap-3 cursor-pointer group ${
                        completedAudios[project.id] || isAdmin
                          ? ""
                          : "opacity-40 cursor-not-allowed"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`choice_${project.id}`}
                        value="ai"
                        className="radio-tech"
                        onChange={() => handleChoiceChange(project.id, "ai")}
                        checked={userChoices[project.id] === "ai"}
                        disabled={!completedAudios[project.id] && !isAdmin}
                      />
                      <span className="text-sm uppercase tracking-wider group-hover:text-tech-accent transition-colors">
                        {COPY.screen2.optionAI}
                      </span>
                    </label>
                  </div>

                  {!completedAudios[project.id] && !isAdmin && (
                    <p className="mt-3 text-xs text-tech-dim uppercase tracking-wide text-center">
                      Reproduce el audio completo para habilitar la selección
                    </p>
                  )}
                </div>
              ))}
            </div>

            {canProceed && (
              <>
                <div className="center-overlay" />
                <div className="center-action">
                <button
                  className="tech-button-primary"
                  onClick={() => {
                    sound.clickMain();
                    nextScreen();
                  }}
                  type="button"
                >
                  {COPY.screen2.buttonText}
                </button>
                </div>
              </>
            )}

            <div className="mt-32 pt-20 pb-6 border-t border-white/10 text-center">
              {!canProceed && !isAdmin && (
                <p className="text-xs text-tech-dim mt-4 uppercase tracking-wide">
                  {COPY.screen2.pendingMessage}
                </p>
              )}
              {isAdmin && (
                <p className="text-xs text-tech-dim mt-4 uppercase tracking-wide">
                  MODO_ADMIN_ACTIVO - puedes avanzar sin escuchar audios
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {currentScreen === 3 && (
        <section className="screen-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="tech-title text-[clamp(2.6rem,7vw,6rem)] mb-16 leading-tight">
              <span className="block text-white mb-6">
                {COPY.screen3.mainText}
              </span>
              <span className="block title-accent text-[clamp(3rem,8vw,7rem)] glitch-text whitespace-pre-line">
                {COPY.screen3.accentText}
              </span>
            </h1>

            {showSecondary && (
              <div className="fade-enter fade-enter-active">
                <p className="text-[clamp(1.3rem,3.5vw,2.4rem)] text-tech-warning mb-6 uppercase tracking-wide">
                  {COPY.screen3.secondaryTextIntroPrefix}{" "}
                  <span className="underline-emphasis">
                    {COPY.screen3.secondaryTextIntroEmphasis}
                  </span>{" "}
                  {COPY.screen3.secondaryTextIntroSuffix}
                </p>
                <p className="text-[clamp(1.4rem,3.6vw,2.6rem)] text-tech-warning mb-16 uppercase tracking-wide">
                  <span className="underline-emphasis">
                    {COPY.screen3.secondaryTextLine}
                  </span>{" "}
                  <span className="alert-emphasis">
                    {COPY.screen3.secondaryTextEmphasis}
                  </span>
                </p>

                <button
                  className="tech-button-outline"
                  onClick={() => {
                    sound.clickMain();
                    nextScreen();
                  }}
                  type="button"
                >
                  {COPY.screen3.buttonText}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {currentScreen === 4 && (
        <section className="screen-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="tech-title text-[clamp(2.2rem,6vw,4.5rem)] title-accent mb-4">
                {COPY.screen4.title}
              </h2>
              <p className="text-[clamp(1.1rem,2.6vw,1.5rem)] text-tech-dim uppercase tracking-widest">
                {COPY.screen4.subtitle}
              </p>
            </div>

            <div className="space-y-6 mb-16">
              {COPY.screen4.concepts.map((concept) => (
                <div key={concept.number} className="tech-card">
                  <div className="flex items-start gap-6">
                    <div className="text-[clamp(2.2rem,4vw,3.4rem)] font-bold text-tech-accent opacity-30">
                      {concept.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[clamp(1.1rem,2.6vw,1.6rem)] font-bold mb-3 text-white uppercase tracking-wide">
                        {concept.title}
                      </h3>
                      <p className="text-[clamp(0.95rem,2.2vw,1.2rem)] text-zinc-400 leading-relaxed">
                        {concept.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="tech-box p-6 md:p-8 mb-16 text-center">
              <h3 className="text-[clamp(1.1rem,2.6vw,1.6rem)] font-bold text-tech-warning uppercase tracking-wide mb-4">
                {COPY.screen4.benchmarkTitle}
              </h3>
              <p className="text-[clamp(1rem,2.4vw,1.4rem)] text-zinc-300 leading-relaxed">
                {COPY.screen4.benchmarkBody}
              </p>
            </div>

            <div className="text-center">
              <button
                className="tech-button-primary"
                onClick={() => {
                  sound.clickMain();
                  nextScreen();
                }}
                type="button"
              >
                {COPY.screen4.buttonText}
              </button>
            </div>
          </div>
        </section>
      )}

      {currentScreen === 5 && (
        <section className="screen-container screen-container--stacked">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <span className="text-[clamp(1rem,2.4vw,1.3rem)] text-tech-accent tracking-[0.45em] opacity-70">
                {COPY.screen5.tagline}
              </span>
            </div>

            <h2 className="tech-title text-[clamp(3.2rem,8.5vw,7.5rem)] mb-10 text-white">
              {COPY.screen5.title1}
              <br />
              <span className="title-accent">{COPY.screen5.title2}</span>
            </h2>

            <div className="tech-box p-10 md:p-12 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {COPY.screen5.expertise.map((skill) => (
                  <div key={skill} className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-tech-accent"></div>
                    <span className="text-[clamp(1.2rem,3.2vw,1.9rem)] uppercase tracking-wide text-zinc-300">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[clamp(1.2rem,3.1vw,1.9rem)] text-zinc-400 mb-12 leading-relaxed whitespace-pre-line">
              {COPY.screen5.description}
            </p>

            <div className="continue-offset"></div>
            <button
              className="tech-button-outline continue-button"
              onClick={() => {
                sound.clickMain();
                nextScreen();
              }}
              type="button"
            >
              {COPY.screen5.buttonText}
            </button>

            {(CONTACT.email || CONTACT.whatsapp) && (
              <>
                <div className="contact-offset flex flex-wrap gap-10 justify-center text-white contact-links contact-links--large">
                  {CONTACT.email && (
                    <a
                    href={`mailto:${CONTACT.email}`}
                    className="border border-white/60 px-4 py-2 text-white"
                  >
                    {CONTACT.email}
                  </a>
                )}
                {CONTACT.whatsapp && (
                  <a
                    href={`https://wa.me/${whatsappLink}`}
                    className="border border-white/60 px-4 py-2 text-white whatsapp-link"
                  >
                    WhatsApp {CONTACT.whatsapp}
                  </a>
                )}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {currentScreen === 6 && (
        <section className="screen-container">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="tech-title text-[clamp(3rem,7.5vw,6rem)] mb-10 title-accent">
              {COPY.screen6.title}
            </h2>
            <p className="text-[clamp(1.4rem,3.6vw,2.1rem)] text-zinc-300 uppercase tracking-wide mb-8">
              {COPY.screen6.questionPrefix}{" "}
              <span className="underline-emphasis">
                {COPY.screen6.questionEmphasis}
              </span>{" "}
              {COPY.screen6.questionSuffix}
            </p>
            <p className="text-[clamp(1rem,2.5vw,1.3rem)] text-tech-dim uppercase tracking-widest mb-14">
              {COPY.screen6.subtitle}
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button
                className="tech-button-primary choice-button w-full md:w-auto"
                onClick={() => {
                  sound.clickMain();
                  nextScreen();
                }}
                type="button"
              >
                {COPY.screen6.yesButton}
              </button>
              <button
                className="tech-button-outline choice-button w-full md:w-auto"
                onClick={() => {
                  sound.clickMain();
                  sound.switchScreen();
                  setCurrentScreen(8);
                  window.scrollTo(0, 0);
                }}
                type="button"
              >
                {COPY.screen6.noButton}
              </button>
            </div>
          </div>
        </section>
      )}

      {currentScreen === 7 && (
        <section className="screen-container">
          <div className="max-w-5xl mx-auto w-full">
            <div className="mb-10 text-center">
              <h2 className="tech-title text-[clamp(2.2rem,6vw,4.5rem)] mb-6 title-accent">
                {COPY.screen7.title}
              </h2>
              <p className="text-[clamp(1rem,2.6vw,1.5rem)] text-zinc-400 uppercase tracking-wide">
                {COPY.screen7.subtitle}
              </p>
            </div>

            <div className="space-y-8">
              {CONFIG.audioProjects.filter((project) => project.humanAudioUrl).map((project) => (
                <div key={project.id} className="tech-box p-6">
                  <h3 className="text-[clamp(1.1rem,2.6vw,1.6rem)] font-bold text-tech-accent tracking-wider mb-6 uppercase">
                    {project.title}
                  </h3>
                  <AudioPlayer
                    id={`human_${project.id}`}
                    audioUrl={project.humanAudioUrl}
                    allowRepeat={true}
                    onStart={handleStart}
                    onRef={setAudioRef}
                  />
                </div>
              ))}
            </div>

            <div className="mt-14 text-center">
              <button
                className="tech-button-primary"
                onClick={() => {
                  sound.clickMain();
                  nextScreen();
                }}
                type="button"
              >
                {COPY.screen7.buttonText}
              </button>
            </div>
          </div>
        </section>
      )}

      {currentScreen === 8 && (
        <section className="screen-container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <div className="logo-container logo-container--xl mb-10">
                <img src={LOGO_URL} alt="Dimensión Interactiva" />
              </div>

              <h1 className="tech-title text-[clamp(2.2rem,6vw,4.5rem)] mb-6">
                <span className="block text-white mb-2">
                  {COPY.screen8.title1}
                </span>
                <span className="block title-accent">
                  {COPY.screen8.title2}
                </span>
                <span className="block text-white">{COPY.screen8.title3}</span>
              </h1>

              <p className="text-[clamp(1rem,2.2vw,1.4rem)] text-zinc-400 mb-12">
                {COPY.screen8.companyName}
              </p>
            </div>

            <div className="tech-box p-8 md:p-12 max-w-2xl mx-auto text-left">
              <h3 className="text-xl font-bold text-tech-accent uppercase tracking-wide mb-6 text-center">
                {COPY.screen8.formTitle}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-tech-dim mb-2">
                    {COPY.screen8.formLabels.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={COPY.screen8.formPlaceholders.name}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-tech-dim mb-2">
                    {COPY.screen8.formLabels.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={COPY.screen8.formPlaceholders.email}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-tech-dim mb-2">
                    {COPY.screen8.formLabels.message}
                  </label>
                  <textarea
                    name="message"
                    required
                    placeholder={COPY.screen8.formPlaceholders.message}
                  />
                </div>

                <button
                  type="submit"
                  className="tech-button-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? COPY.screen8.buttonStates.sending
                    : submitStatus === "success"
                    ? COPY.screen8.buttonStates.success
                    : submitStatus === "error"
                    ? COPY.screen8.buttonStates.error
                    : COPY.screen8.buttonText}
                </button>
              </form>

            </div>

            <div className="mt-12">
              <p className="text-xs text-tech-dim uppercase tracking-[0.4em]">
                {COPY.screen8.footer}
              </p>
            </div>

            {(CONTACT.email || CONTACT.whatsapp) && (
              <div className="mt-6 flex flex-wrap gap-10 justify-center text-xs tracking-[0.15em] text-white contact-links">
                {CONTACT.email && (
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="border border-white/60 px-4 py-2 text-white"
                  >
                    {CONTACT.email}
                  </a>
                )}
                {CONTACT.whatsapp && (
                  <a
                    href={`https://wa.me/${whatsappLink}`}
                    className="border border-white/60 px-4 py-2 text-white whatsapp-link"
                  >
                    WhatsApp {CONTACT.whatsapp}
                  </a>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
