import { buildWhatsAppUrl, pushWhatsAppEvent } from "../config/whatsapp";

type WhatsAppCTAProps = {
  className?: string;
  label: string;
  location: string;
  message: string;
  number: string;
  variant?: "primary" | "secondary" | "ghost";
};

const variantClassMap: Record<NonNullable<WhatsAppCTAProps["variant"]>, string> = {
  primary: "whatsapp-cta whatsapp-cta--primary",
  secondary: "whatsapp-cta whatsapp-cta--secondary",
  ghost: "whatsapp-cta whatsapp-cta--ghost",
};

export default function WhatsAppCTA({
  className,
  label,
  location,
  message,
  number,
  variant = "primary",
}: WhatsAppCTAProps) {
  const href = buildWhatsAppUrl(number, message);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${variantClassMap[variant]} ${className ?? ""}`.trim()}
      onClick={() => pushWhatsAppEvent(location)}
      aria-label={label}
    >
      {label}
    </a>
  );
}

type StickyWhatsAppButtonProps = {
  message: string;
  number: string;
};

export function StickyWhatsAppButton({ message, number }: StickyWhatsAppButtonProps) {
  const href = buildWhatsAppUrl(number, message);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="sticky-whatsapp"
      onClick={() => pushWhatsAppEvent("sticky")}
      aria-label="Hablar por WhatsApp"
      title="Hablar por WhatsApp"
    >
      WhatsApp
    </a>
  );
}
