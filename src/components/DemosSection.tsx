import type { DemoAudioSource } from "../data/audioSources";
import type { AudioHandle } from "./AudioPlayer";
import AudioPlayer from "./AudioPlayer";
import WhatsAppCTA from "./WhatsAppCTA";

type DemosSectionProps = {
  demos: DemoAudioSource[];
  onStart: (id: string | number) => void;
  onRef: (id: string | number, handle: AudioHandle | null) => void;
  whatsappNumber?: string;
  whatsappMessage: string;
  copy: {
    demos: {
      title: string;
      subtitle: string;
      support: string;
      disclaimer: string;
    };
  };
};

export default function DemosSection({
  demos,
  onStart,
  onRef,
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
            <h3 className="demos-whatsapp-card__title">{copy.demos.support}</h3>
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

    </section>
  );
}
