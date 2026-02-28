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
  onGoProceso: () => void;
};

export default function DemosSection({
  demos,
  onStart,
  onRef,
  whatsappNumber,
  whatsappMessage,
  onGoProceso,
}: DemosSectionProps) {
  return (
    <section id="demos" className="demos-section tech-box" aria-label="Demos reales">
      <div className="demos-section__head">
        <h2 className="demos-section__title">🎙️ Escucha demos reales</h2>
        <p className="demos-section__subtitle">
          Locución profesional con actuación real. Calidad premium lista para pauta.
        </p>
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
          label="Solicitar demo personalizada por WhatsApp"
          location="demos_section"
          message={whatsappMessage}
          number={whatsappNumber}
          variant="primary"
        />
        <p className="demos-cta__support">
          Te respondo rápido. Envíame tu guion y te mando una muestra breve.
        </p>
      </div>

      <aside className="promo-card" aria-label="Promoción de tarifas">
        <span className="promo-card__badge">LIMITADO</span>
        <h3 className="promo-card__title">Desde $225 USD</h3>
        <p className="promo-card__line">+ Diseño de audio incluido por tiempo limitado</p>
        <p className="promo-card__subtext">
          Locución + mezcla/master + SFX/música (si aplica) • Entrega rápida
        </p>
        <p className="promo-card__note">
          Válido para spots de hasta 30s / 1 pieza. Sujeto a disponibilidad. Música con
          licencia puede tener costo aparte.
        </p>
        <div className="promo-card__actions">
          <WhatsAppCTA
            label="Cotizar por WhatsApp"
            location="promo_top"
            message={whatsappMessage}
            number={whatsappNumber}
            variant="primary"
          />
          <button type="button" className="whatsapp-cta whatsapp-cta--ghost" onClick={onGoProceso}>
            Ver ejemplos
          </button>
        </div>
      </aside>
    </section>
  );
}
