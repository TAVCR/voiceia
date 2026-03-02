import { useEffect, useRef, useState } from "react";

import AudioPlayer, { type AudioHandle } from "./components/AudioPlayer";
import DemosSection from "./components/DemosSection";
import { StickyWhatsAppButton } from "./components/WhatsAppCTA";

import useUiSound from "./hooks/useUiSound";

import {
  CONVERSION_COPY,
  CONFIG,
  CONTACT,
  COPY,
  LOGO_URL,
  LOGO_WORDMARK,
  PRICING_STRATEGY,
} from "./content";
import { WHATSAPP_PREFILL_MESSAGE } from "./config/whatsapp";
import { DEMO_AUDIO_SOURCES } from "./data/audioSources";



type Choice = "human" | "ai";



export default function App() {

  const [currentScreen, setCurrentScreen] = useState(1);

  const [hasReachedFinal, setHasReachedFinal] = useState(false);

  const [userChoices, setUserChoices] = useState<Record<number, Choice>>({});

  const [showSecondary, setShowSecondary] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(

    null

  );
  const [showPricingTab, setShowPricingTab] = useState(false);

  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const audioRefs = useRef<Record<string | number, AudioHandle | null>>({});
  const demosRef = useRef<HTMLDivElement | null>(null);

  const sound = useUiSound();

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const whatsappPrefillMessage = WHATSAPP_PREFILL_MESSAGE;
  const seoLinksScreen1 = [
    { href: `${basePath}/voces-humanas-potenciadas-ia.html`, label: "Voces humanas + IA" },
    { href: `${basePath}/ventajas-produccion-vocal-ia.html`, label: "Ventajas del servicio" },
    { href: `${basePath}/asi-lo-hacemos-proceso-vocal-ia.html`, label: "As\u00ED lo hacemos" },
  ];
  const seoLinksScreen8 = [
    { href: `${basePath}/voces-ia-potenciadas-por-humanos.html`, label: "IA + humanos" },
    { href: `${basePath}/voces-ia-que-hablan-como-humanos.html`, label: "Naturalidad vocal" },
  ];
  const pricingTabLabel = "Estrategia de precios";
  const LAST_SCREEN = 7;

  const goToSection = (
    target: "demos" | "test" | "proceso" | "contacto" | "precios"
  ) => {
    if (target === "demos") {
      if (currentScreen !== 1) {
        setCurrentScreen(1);
        window.setTimeout(() => {
          demosRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
      } else {
        demosRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    if (target === "test") {
      if (currentScreen === 1) {
        sound.clickMain();
        startAmbient();
      } else {
        sound.clickSoft();
      }
      setCurrentScreen(2);
      window.scrollTo(0, 0);
      return;
    }

    if (target === "proceso") {
      sound.clickSoft();
      setCurrentScreen(5);
      window.scrollTo(0, 0);
      return;
    }

    if (target === "contacto") {
      sound.clickSoft();
      setCurrentScreen(LAST_SCREEN);
      window.scrollTo(0, 0);
      return;
    }

    sound.clickSoft();
    setCurrentScreen(LAST_SCREEN);
    setShowPricingTab(true);
    window.scrollTo(0, 0);
  };

  const startAmbient = () => {
    const ambient = ambientRef.current;
    if (!ambient || !CONFIG.ambientAudioUrl) return;
    ambient.muted = false;
    const playPromise = ambient.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {});
    }
  };

  const openPricingTab = () => {
    sound.clickSoft();
    setShowPricingTab(true);
  };

  const closePricingTab = () => {
    sound.clickSoft();
    setShowPricingTab(false);
  };



  useEffect(() => {
    const ambient = ambientRef.current;
    if (!ambient || !CONFIG.ambientAudioUrl) return;
    ambient.volume = 0.25;
    ambient.muted = true;
    ambient.pause();
    ambient.currentTime = 0;
  }, []);

  useEffect(() => {
    if (!CONFIG.ambientAudioUrl) return;
    if (currentScreen >= 3 && currentScreen <= LAST_SCREEN) {
      startAmbient();
    }
  }, [currentScreen]);



  const nextScreen = () => {

    sound.switchScreen();

    setCurrentScreen((prev) => Math.min(prev + 1, LAST_SCREEN));

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

    const ambient = ambientRef.current;
    if (ambient) {
      ambient.pause();
      ambient.muted = true;
    }


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

  const chosenCount = recognitionProjects.filter((p) => userChoices[p.id])

    .length;

  const canProceed = chosenCount >= 3;
  const showResultsPrompt = canProceed && !hasReachedFinal;
  const showRevisitMode = hasReachedFinal;



  useEffect(() => {

    if (currentScreen === 3) {

      sound.revelation();

      const timer = setTimeout(() => setShowSecondary(true), 2200);

      return () => clearTimeout(timer);

    }

    if (currentScreen === LAST_SCREEN) {

      setHasReachedFinal(true);

    }

    setShowSecondary(false);

    return undefined;

  }, [currentScreen, sound]);

  useEffect(() => {
    if (!showPricingTab) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowPricingTab(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showPricingTab]);



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const formEl = e.currentTarget;

    setIsSubmitting(true);

    setSubmitStatus(null);

    sound.clickSoft();



    try {

      const formData = new FormData(formEl);
      let delivered = false;

      try {
        const response = await fetch(CONFIG.formspreeUrl, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          delivered = true;
        } else {
          const contentType = response.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            const payload = await response.json().catch(() => null);
            delivered = payload?.ok === true;
          }
        }
      } catch {
        // Fallback for environments where the request is delivered but CORS blocks response inspection.
        await fetch(CONFIG.formspreeUrl, {
          method: "POST",
          body: new FormData(formEl),
          mode: "no-cors",
        });
        delivered = true;
      }

      if (delivered) {
        sound.success();
        setSubmitStatus("success");
        formEl.reset();
      } else {
        setSubmitStatus("error");
      }

    } catch (error) {

      setSubmitStatus("error");

    }



    setIsSubmitting(false);

    setTimeout(() => setSubmitStatus(null), 4000);

  };

  const handleExperienceEnd = () => {
    sound.shutdown();

    Object.values(audioRefs.current).forEach((handle) => {
      handle?.pause();
    });

    const ambient = ambientRef.current;
    if (ambient) {
      ambient.pause();
      ambient.currentTime = 0;
      ambient.muted = true;
    }

    window.setTimeout(() => {
      setUserChoices({});
      setShowSecondary(false);
      setShowPricingTab(false);
      setSubmitStatus(null);
      setIsSubmitting(false);
      setHasReachedFinal(false);
      setCurrentScreen(1);
      window.scrollTo(0, 0);
    }, 520);
  };



  return (

    <div className="relative">

      <div className="scanline" />
      {CONTACT.whatsapp && (
        <StickyWhatsAppButton
          number={CONTACT.whatsapp}
          message={whatsappPrefillMessage}
        />
      )}
      {CONFIG.ambientAudioUrl && (
        <audio ref={ambientRef} src={CONFIG.ambientAudioUrl} loop preload="auto" playsInline />
      )}

      {hasReachedFinal && currentScreen > 2 && (

        <button

          type="button"

          className="back-arrow"

          onClick={prevScreen}

          aria-label="Volver"

        >

          VOLVER

        </button>

      )}
      {hasReachedFinal && currentScreen >= 2 && currentScreen < LAST_SCREEN && (
        <button
          type="button"
          className="forward-arrow"
          onClick={nextScreen}
          aria-label="Adelante"
        >
          ADELANTE
        </button>
      )}

      {currentScreen === LAST_SCREEN && (
        <button
          type="button"
          className="back-arrow poweroff-corner"
          onClick={handleExperienceEnd}
          aria-label="Fin de la experiencia"
          title="Fin de la experiencia"
        >
          FIN
        </button>
      )}

      {showPricingTab && (
        <div
          className="pricing-tab-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={pricingTabLabel}
          onClick={(event) => {
            if (event.currentTarget === event.target) {
              setShowPricingTab(false);
            }
          }}
        >
          <div className="pricing-tab-panel">
            <div className="pricing-tab-header">
              <div>
                <p className="pricing-tab-meta">{PRICING_STRATEGY.meta}</p>
                <h2 className="pricing-tab-title">{PRICING_STRATEGY.title}</h2>
                <p className="pricing-tab-subtitle">{PRICING_STRATEGY.subtitle}</p>
              </div>
              <button
                type="button"
                className="pricing-tab-close"
                onClick={closePricingTab}
              >
                Cerrar
              </button>
            </div>

            <div className="pricing-tab-content">
              <div className="pricing-tab-cta" id="precios" />
              <section className="tech-box pricing-tab-block">
                <h3 className="pricing-tab-section-title">Propuesta de valor</h3>
                <p className="pricing-tab-copy">{PRICING_STRATEGY.valueProposition}</p>
              </section>

              <section className="tech-box pricing-tab-block">
                <h3 className="pricing-tab-section-title">{PRICING_STRATEGY.baseRates.title}</h3>
                <p className="pricing-tab-note">{PRICING_STRATEGY.baseRates.note}</p>
                <div className="pricing-tab-table-wrap">
                  <table className="pricing-tab-table">
                    <thead>
                      <tr>
                        {PRICING_STRATEGY.baseRates.columns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PRICING_STRATEGY.baseRates.rows.map((row) => (
                        <tr key={row.join("_")}>
                          {row.map((cell, cellIndex) => (
                            <td key={`${cell}_${cellIndex}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="tech-box pricing-tab-block">
                <h3 className="pricing-tab-section-title">
                  {PRICING_STRATEGY.multipleCharacters.title}
                </h3>
                <p className="pricing-tab-note">{PRICING_STRATEGY.multipleCharacters.note}</p>
                <div className="pricing-tab-table-wrap">
                  <table className="pricing-tab-table">
                    <thead>
                      <tr>
                        {PRICING_STRATEGY.multipleCharacters.columns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PRICING_STRATEGY.multipleCharacters.rows.map((row) => (
                        <tr key={row.join("_")}>
                          {row.map((cell, cellIndex) => (
                            <td key={`${cell}_${cellIndex}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="pricing-tab-note">{PRICING_STRATEGY.multipleCharacters.discounts}</p>
              </section>

              <section className="tech-box pricing-tab-block">
                <h3 className="pricing-tab-section-title">{PRICING_STRATEGY.complexity.title}</h3>
                <div className="pricing-tab-table-wrap">
                  <table className="pricing-tab-table">
                    <thead>
                      <tr>
                        {PRICING_STRATEGY.complexity.columns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PRICING_STRATEGY.complexity.rows.map((row) => (
                        <tr key={row.join("_")}>
                          {row.map((cell, cellIndex) => (
                            <td key={`${cell}_${cellIndex}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="tech-box pricing-tab-block">
                <h3 className="pricing-tab-section-title">{PRICING_STRATEGY.postProduction.title}</h3>
                <div className="pricing-tab-table-wrap">
                  <table className="pricing-tab-table">
                    <thead>
                      <tr>
                        {PRICING_STRATEGY.postProduction.columns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PRICING_STRATEGY.postProduction.rows.map((row) => (
                        <tr key={row.join("_")}>
                          {row.map((cell, cellIndex) => (
                            <td key={`${cell}_${cellIndex}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="pricing-tab-note">{PRICING_STRATEGY.postProduction.note}</p>
              </section>

              <section className="tech-box pricing-tab-block">
                <h3 className="pricing-tab-section-title">{PRICING_STRATEGY.tts.title}</h3>
                <p className="pricing-tab-copy">{PRICING_STRATEGY.tts.description}</p>
                <p className="pricing-tab-highlight">{PRICING_STRATEGY.tts.rate}</p>
              </section>

              <section className="tech-box pricing-tab-block">
                <h3 className="pricing-tab-section-title">{PRICING_STRATEGY.monthlyPlans.title}</h3>
                <div className="pricing-tab-table-wrap">
                  <table className="pricing-tab-table">
                    <thead>
                      <tr>
                        {PRICING_STRATEGY.monthlyPlans.columns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PRICING_STRATEGY.monthlyPlans.rows.map((row) => (
                        <tr key={row.join("_")}>
                          {row.map((cell, cellIndex) => (
                            <td key={`${cell}_${cellIndex}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="tech-box pricing-tab-block">
                <h3 className="pricing-tab-section-title">{PRICING_STRATEGY.revisions.title}</h3>
                <div className="pricing-tab-table-wrap">
                  <table className="pricing-tab-table">
                    <thead>
                      <tr>
                        {PRICING_STRATEGY.revisions.columns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PRICING_STRATEGY.revisions.rows.map((row) => (
                        <tr key={row.join("_")}>
                          {row.map((cell, cellIndex) => (
                            <td key={`${cell}_${cellIndex}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="pricing-tab-note">{PRICING_STRATEGY.revisions.note}</p>
              </section>

              <section className="tech-box pricing-tab-block">
                <h3 className="pricing-tab-section-title">7. Condiciones Generales</h3>
                <ul className="pricing-tab-list">
                  {PRICING_STRATEGY.conditions.map((condition) => (
                    <li key={condition}>{condition}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}



      {currentScreen === 1 && (

        <section className="screen-container" id="inicio">

          <div className="max-w-6xl mx-auto text-center">
            {LOGO_URL ? (
              <img
                src={LOGO_URL}
                alt={LOGO_WORDMARK}
                className="screen1-logo screen1-logo--entry"
              />
            ) : (
              <div className="logo-wordmark screen1-logo-wordmark screen1-logo-wordmark--entry">
                {LOGO_WORDMARK}
              </div>
            )}

            <h1 className="tech-title text-[clamp(2.2rem,8.5vw,9rem)] text-balance screen1-title screen1-equal-gap">

              <span className="block text-white nowrap-word screen1-hero-line">

                {COPY.screen1.title1}

              </span>

              <span className="block title-accent glitch-text nowrap-word screen1-hero-line-accent">

                {COPY.screen1.title2}

              </span>

            </h1>



            <div className="tech-box screen1-intro screen1-equal-gap">
              {COPY.screen1.introLines.map((line, index) => (
                <p
                  key={line}
                  className={`screen1-intro-line ${
                    index === COPY.screen1.introLines.length - 1
                      ? "screen1-intro-line--question"
                      : ""
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="screen1-nav-actions">
              <a
                href={`${basePath}/asi-lo-hacemos-proceso-vocal-ia.html`}
                className="tech-button-primary screen1-hero-link"
              >
                {"AS\u00CD LO HACEMOS"}
              </a>
            </div>
            <p className="screen1-paypal-line">{COPY.screen1.paypalLine}</p>

            <div className="screen1-anchor-nav" aria-label="Navegaci\u00F3n r\u00E1pida">
              <a href="#demos" onClick={(e) => { e.preventDefault(); goToSection("demos"); }}>
                #demos
              </a>
              <a href="#test" onClick={(e) => { e.preventDefault(); goToSection("test"); }}>
                #test
              </a>
              <a href="#proceso" onClick={(e) => { e.preventDefault(); goToSection("proceso"); }}>
                #proceso
              </a>
              <a href="#contacto" onClick={(e) => { e.preventDefault(); goToSection("contacto"); }}>
                #contacto
              </a>
              <a href="#precios" onClick={(e) => { e.preventDefault(); goToSection("precios"); }}>
                #precios
              </a>
            </div>

            <div ref={demosRef}>
              <DemosSection
                demos={DEMO_AUDIO_SOURCES}
                onStart={handleStart}
                onRef={setAudioRef}
                onGoExamples={() => goToSection("demos")}
                copy={CONVERSION_COPY}
              />
            </div>

            <div className="test-teaser tech-box" aria-label="Acceso al test">
              <h3 className="tech-title test-teaser__hero">
                <span className="block text-white">{"LA VOZ SE DISE\u00D1A"}</span>
                <span className="block title-accent glitch-text">{"COMPRU\u00C9BALO"}</span>
              </h3>
              {CONVERSION_COPY.miniHero.lines.map((line) => (
                <p key={line} className="test-teaser__line">
                  {line}
                </p>
              ))}
              <button
                type="button"
                className="tech-button-outline"
                onClick={() => goToSection("test")}
              >
                {CONVERSION_COPY.miniHero.button}
              </button>
            </div>
            {CONFIG.ambientAttribution && (
              <p className="mt-6 text-[0.55rem] text-tech-dim uppercase tracking-[0.35em] attribution-stack">
                <span className="attribution-line">
                  Music by{" "}
                  <a
                    href={CONFIG.ambientAttribution.authorUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-tech-accent/80 hover:text-tech-accent"
                  >
                    {CONFIG.ambientAttribution.author}
                  </a>
                </span>
                <span className="attribution-line attribution-line--source">
                  <a
                    href={CONFIG.ambientAttribution.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-tech-accent/80 hover:text-tech-accent"
                  >
                    {CONFIG.ambientAttribution.source}
                  </a>
                </span>
              </p>
            )}

            <div className="screen1-seo-links-wrap">
              <p className="screen1-seo-links-title">
                Si prefieres conocer el servicio antes del test:
              </p>
              <div className="screen1-seo-links">
                {seoLinksScreen1.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`screen1-seo-link ${
                      link.href.includes("asi-lo-hacemos-proceso-vocal-ia.html")
                        ? "screen1-seo-link--showcase"
                        : ""
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

          </div>

        </section>

      )}



      {currentScreen === 2 && (

        <section className="screen-container" id="test">

          <div className="max-w-5xl mx-auto w-full">

            <div className="mb-10 text-center">
              <span className="text-xs text-tech-accent tracking-[0.4em] opacity-50">
                {COPY.screen1.tagline}
              </span>

              <h2 className="tech-title text-[clamp(2.1rem,6.2vw,4.5rem)] mb-6 title-accent tracking-[0.12em] text-balance screen2-title">
                {COPY.screen2.title}
              </h2>
              <p className="mx-auto max-w-3xl text-[clamp(0.9rem,2.4vw,1.2rem)] text-tech-warning uppercase tracking-widest">

                {COPY.screen2.warning}

              </p>
              <p className="mt-3 text-xs text-tech-dim uppercase tracking-[0.3em]">
                {COPY.screen2.selectionCounterLabel} {Math.min(chosenCount, 3)}/3
              </p>

            </div>



            <div className="space-y-8 pb-8 md:pb-12">

              {recognitionProjects.map((project) => {

                const isChosen = userChoices[project.id];
                const statusLabel = isChosen ? "SELECCIONADO" : "PENDIENTE";



                return (

                  <div key={project.id} className="tech-box p-6">

                    <div className="flex items-center justify-between mb-4">

                      <h3 className="text-lg font-bold text-tech-accent tracking-wider">

                        {project.title}

                      </h3>

                      <span className="text-xs text-tech-dim">

                        {statusLabel}

                      </span>

                    </div>



                    <AudioPlayer
                      id={project.id}
                      audioUrl={project.aiAudioUrl}
                      allowRepeat={true}
                      onStart={handleStart}
                      onRef={setAudioRef}
                    />



                    <div className="mt-6 flex gap-8 justify-center">

                      <label

                        className="flex items-center gap-3 cursor-pointer group"

                      >

                        <input

                          type="radio"

                          name={`choice_${project.id}`}

                          value="human"

                          className="radio-tech"

                          onChange={() =>

                            handleChoiceChange(project.id, "human")

                          }

                          checked={userChoices[project.id] === "human"}

                          

                        />

                        <span className="text-sm uppercase tracking-wider group-hover:text-tech-accent transition-colors">

                          {COPY.screen2.optionHuman}

                        </span>

                      </label>



                      <label

                        className="flex items-center gap-3 cursor-pointer group"

                      >

                        <input

                          type="radio"

                          name={`choice_${project.id}`}

                          value="ai"

                          className="radio-tech"

                          onChange={() => handleChoiceChange(project.id, "ai")}

                          checked={userChoices[project.id] === "ai"}

                          

                        />

                        <span className="text-sm uppercase tracking-wider group-hover:text-tech-accent transition-colors">

                          {COPY.screen2.optionAI}

                        </span>

                      </label>

                    </div>
                  </div>

                );

              })}

            </div>



            {showResultsPrompt && (

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

              {!showResultsPrompt && !showRevisitMode && (

                <p className="text-xs text-tech-dim mt-4 uppercase tracking-wide">

                  {COPY.screen2.pendingMessage}

                </p>

              )}

              {showRevisitMode && (
                <p className="text-xs text-tech-dim mt-4 uppercase tracking-wide">
                  {COPY.screen2.revisitMessage}
                </p>
              )}

            </div>

          </div>

        </section>

      )}



      {currentScreen === 3 && (
        <section className="screen-container screen-center screen3-reveal">
          <div className="max-w-4xl mx-auto text-center screen3-stack">
            {LOGO_URL ? (
              <img src={LOGO_URL} alt={LOGO_WORDMARK} className="screen3-logo" />
            ) : (
              <div className="logo-wordmark screen3-logo-wordmark">{LOGO_WORDMARK}</div>
            )}

            <div className="screen3-content">
              <h1 className="tech-title text-[clamp(2.4rem,6.6vw,5.6rem)] mb-16 leading-tight screen3-title title-factor-91 screen3-hero">
                <span className="block text-white mb-6 screen3-main">
                  {COPY.screen3.mainText.split("\n").map((line) => (
                    <span key={line} className="block screen3-line screen3-line--main">
                      {line}
                    </span>
                  ))}
                </span>
                <span className="block title-accent text-[clamp(2.6rem,7.2vw,6.2rem)] glitch-text screen3-accent">
                  {COPY.screen3.accentText.split("\n").map((line) => (
                    <span key={line} className="block screen3-line screen3-line--accent">
                      {line}
                    </span>
                  ))}
                </span>
              </h1>


              {showSecondary && (

              <div className="fade-enter fade-enter-active screen3-secondary-wrap">

                <p className="text-[clamp(1.3rem,3.5vw,2.4rem)] text-tech-warning mb-6 uppercase tracking-wide screen3-secondary-line">

                  {COPY.screen3.secondaryTextIntroPrefix}{" "}

                  <span className="underline-emphasis">

                    {COPY.screen3.secondaryTextIntroEmphasis}

                  </span>{" "}

                  {COPY.screen3.secondaryTextIntroSuffix}

                </p>

                <p className="text-[clamp(1.4rem,3.6vw,2.6rem)] text-tech-warning mb-16 uppercase tracking-wide screen3-secondary-line screen3-secondary-line--voice">

                  <span className="underline-emphasis">

                    {COPY.screen3.secondaryTextLine}

                  </span>{" "}

                  <span className="alert-emphasis">

                    {COPY.screen3.secondaryTextEmphasis}

                  </span>

                </p>



                <button

                  className="tech-button-outline screen3-cta"

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

          </div>

        </section>

      )}



      {currentScreen === 4 && (
        <section className="screen-container">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-12">
              <h2 className="tech-title text-[clamp(2rem,5.4vw,4.2rem)] title-accent mb-4 screen4-showcase-title">
                {COPY.screen4Showcase.title}
              </h2>
              <p className="text-[clamp(0.95rem,2.2vw,1.2rem)] text-tech-dim uppercase tracking-[0.16em] screen4-showcase-subtitle">
                {COPY.screen4Showcase.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CONFIG.showcaseAudios.map((sample) => (
                <article key={sample.id} className="tech-box p-6">
                  <h3 className="text-[clamp(1.05rem,2.3vw,1.35rem)] font-bold text-tech-accent tracking-[0.08em] uppercase mb-4">
                    {sample.title}
                  </h3>
                  <p className="text-[clamp(0.9rem,1.95vw,1.05rem)] text-zinc-300 leading-relaxed mb-6">
                    {sample.description}
                  </p>
                  <AudioPlayer
                    id={`showcase_${sample.id}`}
                    audioUrl={sample.audioUrl}
                    allowRepeat={true}
                    onStart={handleStart}
                    onRef={setAudioRef}
                  />
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                className="tech-button-primary"
                onClick={() => {
                  sound.clickMain();
                  nextScreen();
                }}
                type="button"
              >
                {COPY.screen4Showcase.buttonText}
              </button>
            </div>
          </div>
        </section>
      )}

      {currentScreen === 5 && (

        <section className="screen-container" id="proceso">

          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-16">

              <h2 className="tech-title text-[clamp(2.2rem,6vw,4.5rem)] title-accent mb-4 screen4-title title-factor-91">

                {COPY.screen4.title}

              </h2>

              <p className="text-[clamp(1.1rem,2.6vw,1.5rem)] text-tech-dim uppercase tracking-widest screen4-subtitle">

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



      {currentScreen === 6 && (

        <section className="screen-container screen-container--stacked">

          <div className="max-w-4xl mx-auto text-center">

            <div className="mb-12">

              {LOGO_URL ? (
                <img src={LOGO_URL} alt={LOGO_WORDMARK} className="screen5-logo" />
              ) : (
                <div className="logo-wordmark screen5-logo-wordmark">{LOGO_WORDMARK}</div>
              )}

            </div>



            <h2 className="tech-title text-[clamp(3.2rem,8.5vw,7.5rem)] mb-10 text-white screen5-title title-factor-91">
              <span className="screen5-title-line">{COPY.screen5.title1}</span>
              <span className="title-accent screen5-title-line">
                {COPY.screen5.title2}
              </span>
            </h2>


            <div className="tech-box p-10 md:p-12 mb-12">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 screen5-list">

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



            {CONTACT.email && (

              <>

                <div className="contact-offset flex flex-wrap gap-10 justify-center text-white contact-links contact-links--large contact-links--fit screen5-contact-links">

                  {CONTACT.email && (

                    <a

                    href={`mailto:${CONTACT.email}`}

                    className="border border-white/60 px-4 py-2 text-white screen1-contact-email"

                  >

                    {CONTACT.email}

                  </a>

                )}

                </div>

              </>

            )}

          </div>

        </section>

      )}

      {currentScreen === 7 && (

        <section className="screen-container screen-center" id="contacto">

          <div className="max-w-4xl mx-auto text-center">

            <div className="mb-12">

              <div className="mb-10">

                {LOGO_URL ? (
                  <img src={LOGO_URL} alt={LOGO_WORDMARK} className="screen8-logo" />
                ) : (
                  <div className="logo-wordmark screen8-logo-wordmark">{LOGO_WORDMARK}</div>
                )}

              </div>



              <h1 className="tech-title screen8-title mb-6">

                <span className="block text-white mb-2 screen8-title-line">

                  {COPY.screen8.title1}

                </span>

                <span className="block text-white mb-2 screen8-title-line">

                  {COPY.screen8.title2}

                </span>

                <span className="block title-accent mb-2 screen8-title-line">
                  {COPY.screen8.title3}
                </span>

                <span className="block text-white screen8-title-line">
                  {COPY.screen8.title4}
                </span>

              </h1>



              <p className="text-[clamp(1rem,2.2vw,1.4rem)] text-zinc-400 mb-12">

                {COPY.screen8.companyName}

              </p>

            </div>



            <div className="tech-box p-8 md:p-12 max-w-2xl mx-auto text-left">

              <h3 className="text-xl font-bold text-tech-accent uppercase tracking-wide mb-6 text-center">

                {COPY.screen8.formTitle}

              </h3>
              <p className="text-xs text-tech-dim uppercase tracking-[0.2em] text-center mb-8">
                {COPY.screen8.formSubtitle}
              </p>



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

              <div className="screen8-seo-links-wrap">
                <p className="screen8-seo-links-title">Recursos ampliados:</p>
                <div className="screen8-seo-links">
                {seoLinksScreen8.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="screen8-seo-link"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="screen8-seo-pricing-row">
                  <button
                    type="button"
                    className="screen8-seo-link screen8-seo-link--pricing"
                    onClick={openPricingTab}
                  >
                    {pricingTabLabel}
                  </button>
                </div>
                </div>
              </div>

            </div>

            {CONTACT.email && (
              <div className="mt-6 flex flex-wrap gap-10 justify-center text-xs tracking-[0.15em] text-white contact-links contact-links--fit screen8-contact-links">

                {CONTACT.email && (

                  <a

                    href={`mailto:${CONTACT.email}`}

                    className="border border-white/60 px-4 py-2 text-white screen1-contact-email"

                  >

                    {CONTACT.email}

                  </a>

                )}

              </div>

            )}

            <section className="screen8-disclaimer tech-box">
              <h3 className="screen8-disclaimer-title">
                {COPY.screen8.legalDisclaimer.title}
              </h3>
              <p className="screen8-disclaimer-intro">
                {COPY.screen8.legalDisclaimer.intro}
              </p>
              <ul className="screen8-disclaimer-list">
                {COPY.screen8.legalDisclaimer.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="screen8-disclaimer-source">
                {COPY.screen8.legalDisclaimer.source}
              </p>
            </section>

          </div>

        </section>

      )}

    </div>

  );

}
