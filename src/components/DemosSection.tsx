import type { DemoAudioSource } from "../data/audioSources";
import type { AudioHandle } from "./AudioPlayer";
import AudioPlayer from "./AudioPlayer";
import WhatsAppCTA from "./WhatsAppCTA";

type DemosSectionProps = {
  demos: DemoAudioSource[];
  onStart: (id: string | number) => void;
  onRef: (id: string | number, handle: AudioHandle | null) => void;
  whatsappNumber: string;
  whatsappMessage: string;
  onGoExamples: () => void;
  copy: {
    demos: {
      title: string;
      subtitle: string;
      support: string;
      disclaimer: string;
    };
    promo: {
      strapline: string;
      badge: string;
      title: string;
      line: string;
      subtext: string;
      note: string;
    };
  };
};

export default function DemosSection({
  demos,
  onStart,
  onRef,
  whatsappNumber,
  whatsappMessage,
  onGoExamples,
  copy,
}: DemosSectionProps) {
  return (
    <section id="demos" className="demos-section tech-box" aria-label="Demos reales">
      <div className="demos-section__head">
        <h2 className="demos-section__title">{copy.demos.title}</h2>
        <p className="demos-section__subtitle">{copy.demos.subtitle}</p>
        <p className="demos-section__disclaimer">{copy.demos.disclaimer}</p>
      </div>

      <div className="demos-grid">
        {demos.map((demo) => (
          <article key={demo.id} className="demos-card">
            <h3 className="demos-card__title">{demo.title}</h3>
            <AudioPlayer
              id={demo.id}
              audioUrl={demo.audioUrl}
              allowRepeat={true}
              onStart={onStart}
              onRef={onRef}
              showMeta={true}
            />
          </article>
        ))}
      </div>

      <div className="demos-cta">
        <WhatsAppCTA
          label="SOLICITAR DEMO PERSONALIZADA POR WHATSAPP"
          location="demos_section"
          message={whatsappMessage}
          number={whatsappNumber}
          variant="primary"
        />
        <p className="demos-cta__support">{copy.demos.support}</p>
      </div>

      <aside className="promo-card" aria-label="Promoción de tarifas">
        <p className="promo-card__strapline">{copy.promo.strapline}</p>
        <span className="promo-card__badge">{copy.promo.badge}</span>
        <h3 className="promo-card__title">{copy.promo.title}</h3>
        <p className="promo-card__line">{copy.promo.line}</p>
        <p className="promo-card__subtext">{copy.promo.subtext}</p>
        <p className="promo-card__note">{copy.promo.note}</p>
        <div className="promo-card__actions">
          <WhatsAppCTA
            label="Cotizar por WhatsApp"
            location="promo_top"
            message={whatsappMessage}
            number={whatsappNumber}
            variant="primary"
          />
          <button type="button" className="whatsapp-cta whatsapp-cta--ghost" onClick={onGoExamples}>
            VER EJEMPLOS
          </button>
        </div>
      </aside>
    </section>
  );
}
