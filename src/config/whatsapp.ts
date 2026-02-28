export const WHATSAPP_PREFILL_MESSAGE =
  "Hola, vengo desde AIVOXCR. Estoy cotizando producción de voz para una campaña digital.";

export const sanitizeWhatsAppNumber = (value: string) => value.replace(/\D/g, "");

export const buildWhatsAppUrl = (number: string, message: string) =>
  `https://wa.me/${sanitizeWhatsAppNumber(number)}?text=${encodeURIComponent(message)}`;

export const pushWhatsAppEvent = (location: string) => {
  if (typeof window === "undefined") return;
  const maybeDataLayer = (window as Window & { dataLayer?: unknown }).dataLayer;
  if (!Array.isArray(maybeDataLayer)) return;
  maybeDataLayer.push({ event: "whatsapp_click", location });
};
