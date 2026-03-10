# voiceia

## Cambios recientes (conversión WhatsApp + Demos)

- Se agregó una sección `#demos` antes del Test, con 3 demos que reutilizan los mismos audios del Test (misma fuente de verdad en `src/data/audioSources.ts`).
- Se implementó CTA de WhatsApp reusable (`src/components/WhatsAppCTA.tsx`) con mensaje prefill y tracking seguro vía `dataLayer` si existe.
- Se añadió botón sticky de WhatsApp visible en toda la experiencia.
- Se añadió bloque promo cerca de demos:
  - `Desde $225 USD`
  - `+ Diseño de audio incluido por tiempo limitado`
- Se agregaron CTAs extra de WhatsApp al final de “Cómo lo hacemos” y antes de la tabla de precios (en modal).
- Se añadieron anclas y navegación rápida: `#demos`, `#test`, `#proceso`, `#contacto`, `#precios`.
- AudioPlayer ahora tiene lazy-load de audio (carga al interactuar), estado de carga y duración/progreso visible para demos.

## Probar localmente

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
```
