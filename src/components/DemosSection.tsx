import type { DemoAudioSource } from "../data/audioSources";
import type { AudioHandle } from "./AudioPlayer";
import AudioPlayer from "./AudioPlayer";
import WhatsAppCTA from "./WhatsAppCTA";

type DemosSectionProps = {
  demos: DemoAudioSource[];
  onStart: (id: string | number) => void;
  onRef: (id: string | number, handle: AudioHandle | null) => void;
  onGoExamples: () => void;
  whatsappNumber?: string;
  whatsappMessage: string;
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
  onGoExamples,
  whatsappNumber,
  whatsappMessage,
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
              warmupMode="viewport"
              onStart={onStart}
              onRef={onRef}
              showMeta={true}
            />
          </article>
        ))}

        {whatsappNumber && (
          <article className="demos-whatsapp-card" aria-label="Contacto por WhatsApp">
            <p className="demos-whatsapp-card__eyebrow">Respuesta rápida</p>
            <h3 className="demos-whatsapp-card__title">¿Listo para activar tu campaña?</h3>
            <WhatsAppCTA
              label={`WhatsApp ${whatsappNumber}`}
              location="demos_fixed_card"
              message={whatsappMessage}
              number={whatsappNumber}
              variant="secondary"
              className="demos-whatsapp-card__button"
            />
          </article>
        )}
      </div>

      <div className="demos-cta">
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
          <button type="button" className="tech-button-outline" onClick={onGoExamples}>
            VER EJEMPLOS
          </button>
        </div>
      </aside>
    </section>
  );
}