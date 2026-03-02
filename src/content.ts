import { TEST_AUDIO_SOURCES } from "./data/audioSources";

export const LOGO_URL = `${import.meta.env.BASE_URL}logo-aivoxcr-cropped.png?v=3`;

export const LOGO_WORDMARK = "AIVOXCR.COM";

export const CONTACT = {
  email: "aivoxcr@gmail.com",
  whatsapp: "+506 6168-0909",
};

export const CONFIG = {
  formspreeUrl: "https://formspree.io/f/mqabjovv",
  ambientAudioUrl:
    "https://cdn.jsdelivr.net/gh/TAVCR/voiceia@main/public/ambient/mfcc-science-space-technology-music-328258.mp3",
  ambientAttribution: {
    author: "Mykola Sosin",
    authorUrl:
      "https://pixabay.com/users/mfcc-28627740/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=328258",
    source: "Pixabay",
    sourceUrl:
      "https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=328258",
  },
  audioProjects: TEST_AUDIO_SOURCES,
  showcaseAudios: [
    {
      id: "original",
      title: "VOZ ORIGINAL",
      description:
        "Esta es la voz original del artista. Una captura pura, sin postproducción ni efectos.",
      audioUrl: `${import.meta.env.BASE_URL}kiwi-showcase/voz-original.mp3`,
    },
    {
      id: "conversion",
      title: "CONVERSIÓN DE GÉNERO (AI)",
      description:
        "Voz transformada a género femenino. Observa cómo se mantiene fielmente la intención, el ritmo y la emoción de la toma original.",
      audioUrl: `${import.meta.env.BASE_URL}kiwi-showcase/conversion-genero-ai.wav`,
    },
    {
      id: "final",
      title: "PRODUCTO FINAL (MIX & MASTER)",
      description:
        "Comercial completo para radio. Aquí puedes escuchar la voz integrada con música y masterización profesional.",
      audioUrl: `${import.meta.env.BASE_URL}kiwi-showcase/producto-final-mix-master.mp3`,
    },
    {
      id: "tts",
      title: "GENERACIÓN POR TEXTO (TTS MISMA VOZ)",
      description:
        "Referencia de voz femenina generada 100% mediante IA (Text-to-Speech) con modelos comerciales de alta gama. Presentada sin mezcla para apreciar la calidad natural del modelo. Saca tus propias conclusiones.",
      audioUrl: `${import.meta.env.BASE_URL}kiwi-showcase/tts-referencia.mp3`,
    },
  ],
};

export const COPY = {
  screen1: {
    tagline: "INICIO PROTOCOLO EVALUACIÓN",
    title1: "LA VOZ YA NO SE ELIGE",
    title2: "SE DISE\u00D1A",
    titleHint: "(BAJA MÁS PARA HACER EL TEST)",
    introLines: [
      "\u00A1HAY UN CAMBIO REAL DE PARADIGMA!",
      "Las marcas sol\u00EDan adaptarse a voces disponibles.",
      "Ahora, nosotros dise\u00F1amos la voz que tu campa\u00F1a necesita.",
      "Actuaci\u00F3n real + tecnolog\u00EDa IA avanzada + Dise\u00F1o de Audio + Edici\u00F3n de Video",
      "Resultado: Sonido final profesional que integramos directamente en tu pieza Audiovisual.",
    ],
    buttonText: "SOLICITAR DEMO PERSONALIZADA POR WHATSAPP",
    secondaryButtonText: "ESCUCHAR DEMOS",
    paypalLine: "Pago internacional disponible (PayPal).",
  },
  screen2: {
    title: "EVALUACI\u00D3N AUDITIVA",
    warning:
      "Elige si cre\u00E9s que cada pieza es VOZ HUMANA o VOZ GENERADA IA. Debes marcar al menos 3 para continuar.",
    optionHuman: "Voz Humana",
    optionAI: "Voz Generada IA",
    buttonText: "Ver Resultados",
    pendingMessage: "Marca 3 selecciones para continuar",
    selectionCounterLabel: "SELECCIONADAS",
    revisitMessage:
      "RE-EVALUACI\u00D3N_LIBRE: Puedes volver a escuchar todos los audios sin restricciones",
  },
  screen3: {
    mainText:
      "TODAS LAS VOCES QUE ESCUCHASTE\nTUVIERON IA EN ALGUNA PARTE DEL PROCESO.",
    accentText: "PERO NINGUNA FUE CREADA\nDESDE CERO POR TEXTO.",
    secondaryTextIntroPrefix: "",
    secondaryTextIntroEmphasis: "la actuaci\u00F3n base",
    secondaryTextIntroSuffix: "se mantiene humana y dirigida.",
    secondaryTextLine: "La voz no se elige:",
    secondaryTextEmphasis: "SE DISE\u00D1A.",
    buttonText: "Mostrarme",
  },
  screen4Showcase: {
    title: "ASÍ LO HACEMOS",
    subtitle: "PROCESO REAL DE TRANSFORMACIÓN VOCAL",
    buttonText: "Continuar",
  },
  screen4: {
    title: "EL PROCESO",
    subtitle:
      "¡CAMBIO DE PARADIGMA REAL EN PRODUCCIÓN VOCAL! LA VOZ YA NO SE ELIGE, SE DISEÑA.",
    benchmarkTitle: "BENCHMARK ELEVENLABS",
    benchmarkBody:
      "Incluso el AI Speech Classifier de ElevenLabs da una probabilidad bajísima de que los audios fueran generados con IA (≈2% a 5%) para la mayoría de los casos.",
    concepts: [
      {
        number: "01",
        title: "ACTOR INTERPRETA",
        description:
          "Un profesional de la voz realiza la actuación completa con emoción, timing, prosodia y matices humanos reales.",
      },
      {
        number: "02",
        title: "IA CAMBIA EL TIMBRE",
        description:
          "El cliente elige la nueva voz, la tecnología modifica únicamente las características tonales de la voz original, manteniendo la interpretación intacta, le pone \"otra piel\".",
      },
      {
        number: "03",
        title: "MUSICALIZACIÓN EN LABORATORIO",
        description:
          "La musicalización, también realizada en nuestro laboratorio, agregó música y efectos especiales, lo que hace que el sonido final sea todavía más refinado y menos distinguible para el oído no entrenado.",
      },
      {
        number: "04",
        title: "LA ACTUACIÓN PERMANECE HUMANA",
        description:
          "El resultado final conserva toda la expresividad y naturalidad de la interpretación original del actor. ¡El paradigma cambió!",
      },
    ],
    buttonText: "Continuar",
  },
  screen5: {
    tagline: "CREDENCIALES SISTEMA",
    title1: "TRAYECTORIA",
    title2: "DESDE 1991",
    expertise: [
      "Locución profesional",
      "Producción audiovisual",
      "Diseño sonoro",
      "Dirección vocal",
      "EDICION DE VIDEO",
    ],
    description:
      "Donde el talento humano encuentra la innovación: No es menos actuación. Es control total del personaje.",
    buttonText: "Continuar",
  },
  screen8: {
    titlePrimary: "NO TE CONFORMES CON MENOS,",
    titleAccent: "DISEÑA LA VOZ DE TU MARCA HOY",
    companyName: "AIVOXCR.COM",
    formTitle: "INICIAR_CONTACTO",
    formSubtitle: "Agenda una demostración / propuesta en 24h",
    formLabels: {
      name: "Input_Nombre",
      email: "Input_Email",
      message: "Input_Mensaje",
    },
    formPlaceholders: {
      name: "Tu nombre",
      email: "tu@email.com",
      message: "Describe tu proyecto...",
    },
    buttonText: "Enviar_Transmisión",
    buttonStates: {
      sending: "Transmitiendo...",
      success: "Transmisión_Exitosa",
      error: "Error_Reintentar",
    },
    footer: "Sistema Operativo / AIVOXCR.COM / 2026",
    legalDisclaimer: {
      title:
        "Aviso Legal: Cuidado con los servicios de IA de voz que proliferan en redes sociales",
      intro:
        "Gran parte de las aplicaciones de clonación de voz que se anuncian masivamente operan bajo prácticas engañosas:",
      points: [
        "Tecnología enmascarada (Posible estafa): Te cobran por usar modelos de código abierto que en realidad son gratuitos en internet.",
        "Demos falsas: Frecuentemente usan audios grabados por actores humanos reales en su publicidad para fingir una perfección que su IA no tiene.",
        "Trampas de cobro: Te obligan a pagar por adelantado sin ofrecer un período de prueba gratuito, haciendo casi imposible obtener un reembolso al descubrir su verdadera calidad.",
      ],
      source:
        "(Fuente sobre el riesgo de oportunistas en IA: Portal tecnológico Sinologic, enero de 2026).",
    },
  },
};

export const CONVERSION_COPY = {
  demos: {
    title: "🎙️ Escucha demos reales",
    subtitle:
      "Actuación real y modificación de voz inteligente. Producción incluida. Calidad lista para pauta.",
    support: "¿Quieres una versión adaptada a tu marca?",
    disclaimer:
      "Algunas piezas son demostrativas. (Un mismo artista interpretó todas las voces en todos los anuncios)",
  },
  promo: {
    strapline: "Diseño vocal continuo para marcas en crecimiento.",
    badge: "BONUS",
    title: "Desde $225 USD",
    line: "DISEÑO DE AUDIO Y EDICIÓN DE VIDEO INCLUIDAS (SEGÚN DISPONIBILIDAD POR TIEMPO LIMITADO)",
    subtext: "Incluye locución + mezcla/máster + SFX + Edición de Video (si aplica). Hasta 30s por pieza.",
    note: "Música con licencia puede tener costo adicional.",
  },
  miniHero: {
    title: "La voz se diseña. Compruébalo.",
    lines: [
      "Estamos ante un cambio de paradigma.",
      "Escucha piezas producidas profesionalmente",
      "y decide: ¿Humano o IA?",
      "Después te revelamos el proceso.",
    ],
    button: "HACER EL TEST",
  },
};

export const PRICING_STRATEGY = {
  meta: "aivoxcr.com · 2025-2026 · Edición revisada",
  title: "ESTRATEGIA DE TARIFAS PROFESIONALES",
  subtitle: "Locución Humana Híbrida & Postproducción Audiovisual",
  valueProposition:
    "AIVOXCR no compite por precio bajo. La ventaja competitiva es la eficiencia operativa: Un actor profesional interpreta múltiples roles con cambio de timbre asistido por IA, reduciendo costos de casting y coordinación sin perder calidad humana.",
  baseRates: {
    title: "1. Tarifas Base de Locución Comercial",
    note:
      "Precios en USD por país de difusión. Licencia de uso por 1 año (IVR: Licencia perpetua). En TV, radio y pauta digital la tarifa aplica por cada país de difusión.",
    columns: [
      "Medio",
      "Duración",
      "Latam",
      "EE.UU.",
      "Renovación anual",
    ],
    rows: [
      ["Televisión nacional", "30 seg", "$225", "$450", "30%"],
      ["Redes sociales (pauta)", "30 seg", "$225", "$450", "30%"],
      ["Radio nacional", "30 seg", "$190", "$350", "30%"],
      ["Corporativo / web", "Hasta 2 min", "$350", "$600", "30%"],
      ["IVR / centralitas", "Por mensaje", "$200", "$300", "Perpetua"],
    ],
  },
  multipleCharacters: {
    title: "2. Personajes Múltiples (Economía de Escala)",
    note:
      "Desglose para spots de 30 segundos en Latam (TV / RRSS). Para EE.UU., aplicar x2 sobre tarifa Latam.",
    columns: [
      "Personajes",
      "Voz 1",
      "Voz 2",
      "Voz 3",
      "Voz 4",
      "Total / Promedio",
    ],
    rows: [
      ["1 personaje", "$225", "-", "-", "-", "$225 / $225 c/u"],
      ["2 personajes", "$225", "$158", "-", "-", "$383 / $192 c/u"],
      ["3 personajes", "$225", "$158", "$113", "-", "$496 / $165 c/u"],
      ["4 personajes", "$225", "$158", "$113", "$68", "$564 / $141 c/u"],
    ],
    discounts:
      "Voz 2: -30% | Voz 3: -50% | Voz 4: -70% sobre tarifa base de $225.",
  },
  complexity: {
    title: "Multiplicador por Complejidad de Interpretación",
    columns: ["Tipo", "Descripción", "Multiplicador", "Ejemplo Latam"],
    rows: [
      [
        "Narrador neutro",
        "Voz guía corporativa sin alta carga emocional",
        "x1.0",
        "$225",
      ],
      ["Personaje emocional", "Actuación con emoción y diálogos", "x1.25", "$281"],
      ["Personaje complejo", "Múltiples registros y arco dramático", "x1.5", "$338"],
    ],
  },
  postProduction: {
    title: "3. Postproducción y Pulido de Audio",
    columns: ["Servicio", "Tarifa base", "Tarifa compleja"],
    rows: [
      ["Restauración de audio", "$10 / min", "$20 / min"],
      ["Mezcla máster comercial", "$125 / pieza", "-"],
      ["Diseño sonoro (SFX + música)", "$100 / spot", "-"],
      ["Edición RRSS (Reels / TikTok)", "$250 / pieza", "-"],
      ["Diseño sonoro por hora", "$100 / hora", "-"],
    ],
    note:
      "Pistas musicales se cotizan aparte según selección del cliente. El ingeniero valida si restauración aplica tarifa base o compleja.",
  },
  tts: {
    title: "4. TTS Curado (Solo Alto Volumen)",
    description:
      "Servicio para e-learning, audiolibros, IVR extenso y contenido masivo. No recomendado para publicidad comercial o TV.",
    rate: "$30 / min",
  },
  monthlyPlans: {
    title: "5. Planes Mensuales PYME",
    columns: ["Plan", "Incluye", "Videos/mes", "Revisiones", "Precio/mes"],
    rows: [
      [
        "Starter",
        "1 voz + mezcla máster (hasta 60 seg)",
        "4",
        "2 por video",
        "$800",
      ],
      [
        "Growth",
        "1 voz + mezcla + edición RRSS (hasta 90 seg)",
        "8",
        "2 por video",
        "$1,800",
      ],
      [
        "Enterprise",
        "Hasta 2 voces + mezcla + edición + diseño sonoro",
        "15+",
        "3 por video",
        "Cotización",
      ],
    ],
  },
  revisions: {
    title: "6. Revisiones y Tiempos de Entrega",
    columns: ["Proyecto", "Revisión adicional", "Entrega estimada"],
    rows: [
      ["Spot comercial (TV/Radio)", "$50 / ronda", "3-5 días hábiles"],
      ["Redes sociales / digital", "$50 / ronda", "2-4 días hábiles"],
      ["Corporativo / web", "$50 / ronda", "3-5 días hábiles"],
      ["IVR / centralitas", "$35 / ronda", "2-3 días hábiles"],
      ["Postproducción", "$75 / ronda", "3-5 días hábiles"],
    ],
    note:
      "Primera revisión incluida. Cambios estructurales de copy se cotizan como proyecto nuevo. Urgencias (<48h): Recargo del 50%.",
  },
  conditions: [
    "Precios en USD, sin impuestos locales.",
    "La licencia cubre medio y territorio cotizados; usos extra requieren extensión.",
    "Renovación anual: 30% del precio original antes del vencimiento.",
    "Cambios de copy después de grabar generan nueva cotización.",
    "Proyectos de $500+ requieren 50% de anticipo.",
    "AIVOXCR puede incluir el proyecto en portafolio salvo NDA firmado.",
  ],
};















