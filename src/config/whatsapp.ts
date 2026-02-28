export const WHATSAPP_PREFILL_MESSAGE =
  "Hola, vengo desde AIVOXCR. Me interesa la locución desde $225 y la promo de diseño de audio incluido. Mi proyecto es: ____ (marca/industria) ____ | Duración: ____ | Uso: (RRSS/Radio/TV/Web) ____ | País: ____";

export const sanitizeWhatsAppNumber = (value: string) => value.replace(/\D/g, "");

export const buildWhatsAppUrl = (number: string, message: string) =>
  `https://wa.me/${sanitizeWhatsAppNumber(number)}?text=${encodeURIComponent(message)}`;

export const pushWhatsAppEvent = (location: string) => {
  if (typeof window === "undefined") return;
  const maybeDataLayer = (window as Window & { dataLayer?: unknown }).dataLayer;
  if (!Array.isArray(maybeDataLayer)) return;
  maybeDataLayer.push({ event: "whatsapp_click", location });
};
