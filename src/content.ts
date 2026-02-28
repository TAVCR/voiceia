import { TEST_AUDIO_SOURCES } from "./data/audioSources";

export const LOGO_URL = `${import.meta.env.BASE_URL}logo-aivoxcr-cropped.png?v=3`;

export const LOGO_WORDMARK = "AIVOXCR.COM";

export const CONTACT = {
  email: "aivoxcr@gmail.com",
  whatsapp: "+506 85020909",
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
        "Esta es la voz original del artista. Una captura pura, sin postproducciÃ³n ni efectos.",
      audioUrl: `${import.meta.env.BASE_URL}kiwi-showcase/voz-original.mp3`,
    },
    {
      id: "conversion",
      title: "CONVERSIÃ“N DE GÃ‰NERO (AI)",
      description:
        "Voz transformada a gÃ©nero femenino. Observa cÃ³mo se mantiene fielmente la intenciÃ³n, el ritmo y la emociÃ³n de la toma original.",
      audioUrl: `${import.meta.env.BASE_URL}kiwi-showcase/conversion-genero-ai.wav`,
    },
    {
      id: "final",
      title: "PRODUCTO FINAL (MIX & MASTER)",
      description:
        "Comercial completo para radio. AquÃ­ puedes escuchar la voz integrada con mÃºsica y masterizaciÃ³n profesional.",
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
    tagline: "INICIO PROTOCOLO EVALUACIÃ“N",
    title1: "LA VOZ YA NO SE ELIGE",
    title2: "SE DISE\u00D1A",
    introLines: [
      "\u00A1HAY UN CAMBIO REAL DE PARADIGMA!",
      "Las marcas sol\u00EDan adaptarse a voces disponibles.",
      "Ahora, nosotros dise\u00F1amos la voz que tu campa\u00F1a necesita.",
      "Actuaci\u00F3n real + tecnolog\u00EDa IA avanzada.",
      "Resultado: Audio final profesional sin procesos adicionales.",
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
    title: "ASÃ LO HACEMOS",
    subtitle: "PROCESO REAL DE TRANSFORMACIÃ“N VOCAL",
    buttonText: "Continuar",
  },
  screen4: {
    title: "EL PROCESO",
    subtitle:
      "Â¡CAMBIO DE PARADIGMA REAL EN PRODUCCIÃ“N VOCAL! LA VOZ YA NO SE ELIGE, SE DISEÃ‘A.",
    benchmarkTitle: "BENCHMARK ELEVENLABS",
    benchmarkBody:
      "Incluso el AI Speech Classifier de ElevenLabs da una probabilidad bajÃ­sima de que los audios fueran generados con IA (â‰ˆ2% a 5%) para la mayorÃ­a de los casos.",
    concepts: [
      {
        number: "01",
        title: "ACTOR INTERPRETA",
        description:
          "Un profesional de la voz realiza la actuaciÃ³n completa con emociÃ³n, timing, prosodia y matices humanos reales.",
      },
      {
        number: "02",
        title: "IA CAMBIA EL TIMBRE",
        description:
          "La tecnologÃ­a modifica Ãºnicamente las caracterÃ­sticas tonales de la voz, manteniendo la interpretaciÃ³n intacta, le pone \"otra piel\".",
      },
      {
        number: "03",
        title: "MUSICALIZACIÃ“N EN LABORATORIO",
        description:
          "La musicalizaciÃ³n, tambiÃ©n realizada en nuestro laboratorio, agregÃ³ mÃºsica y efectos especiales, lo que hace que el sonido final sea todavÃ­a mÃ¡s refinado y menos distinguible para el oÃ­do no entrenado.",
      },
      {
        number: "04",
        title: "LA ACTUACIÃ“N PERMANECE HUMANA",
        description:
          "El resultado final conserva toda la expresividad y naturalidad de la interpretaciÃ³n original del actor. Â¡El paradigma cambiÃ³!",
      },
    ],
    buttonText: "Continuar",
  },
  screen5: {
    tagline: "CREDENCIALES SISTEMA",
    title1: "TRAYECTORIA",
    title2: "DESDE 1991",
    expertise: [
      "LocuciÃ³n profesional",
      "ProducciÃ³n audiovisual",
      "DiseÃ±o sonoro",
      "DirecciÃ³n vocal",
    ],
    description:
      "Donde el talento humano encuentra la innovaciÃ³n: No es menos actuaciÃ³n. Es control total del personaje.",
    buttonText: "Continuar",
  },
  screen8: {
    title1: "INTERPRETACIÃ“N",
    title2: "VOCAL",
    title3: "POTENCIADA",
    title4: "POR IA",
    companyName: "AIVOXCR.COM",
    formTitle: "INICIAR_CONTACTO",
    formSubtitle: "Agenda una demostraciÃ³n / propuesta en 24h",
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
    buttonText: "Enviar_TransmisiÃ³n",
    buttonStates: {
      sending: "Transmitiendo...",
      success: "TransmisiÃ³n_Exitosa",
      error: "Error_Reintentar",
    },
    footer: "Sistema Operativo / AIVOXCR.COM / 2026",
    legalDisclaimer: {
      title:
        "Aviso Legal: Cuidado con los servicios de IA de voz que proliferan en redes sociales",
      intro:
        "Gran parte de las aplicaciones de clonaciÃ³n de voz que se anuncian masivamente operan bajo prÃ¡cticas engaÃ±osas:",
      points: [
        "TecnologÃ­a enmascarada (Posible estafa): Te cobran por usar modelos de cÃ³digo abierto que en realidad son gratuitos en internet.",
        "Demos falsas: Frecuentemente usan audios grabados por actores humanos reales en su publicidad para fingir una perfecciÃ³n que su IA no tiene.",
        "Trampas de cobro: Te obligan a pagar por adelantado sin ofrecer un perÃ­odo de prueba gratuito, haciendo casi imposible obtener un reembolso al descubrir su verdadera calidad.",
      ],
      source:
        "(Fuente sobre el riesgo de oportunistas en IA: Portal tecnolÃ³gico Sinologic, enero de 2026).",
    },
  },
};

export const CONVERSION_COPY = {
  demos: {
    title: "ðŸŽ™ï¸ Escucha demos reales",
    subtitle:
      "LocuciÃ³n profesional con actuaciÃ³n real. ProducciÃ³n incluida. Calidad lista para pauta.",
    support: "Â¿Quieres una versiÃ³n adaptada a tu marca?",
    disclaimer:
      "Algunas piezas son demostrativas o recreadas para mostrar rangos de timbre. La actuaciÃ³n base es real.",
  },
  promo: {
    strapline: "DiseÃ±o vocal continuo para marcas en crecimiento.",
    badge: "BONUS",
    title: "Desde $225 USD",
    line: "+ DiseÃ±o de audio incluido (segÃºn disponibilidad)",
    subtext: "Incluye locuciÃ³n + mezcla/mÃ¡ster + SFX (si aplica). Hasta 30s por pieza.",
    note: "MÃºsica con licencia puede tener costo adicional.",
  },
  miniHero: {
    title: "La voz se diseÃ±a. CompruÃ©balo.",
    lines: [
      "Estamos ante un cambio de paradigma.",
      "Escucha piezas producidas profesionalmente",
      "y decide: Â¿Humano o IA?",
      "DespuÃ©s te revelamos el proceso.",
    ],
    button: "HACER EL TEST",
  },
};

export const PRICING_STRATEGY = {
  meta: "aivoxcr.com Â· 2025-2026 Â· EdiciÃ³n revisada",
  title: "ESTRATEGIA DE TARIFAS PROFESIONALES",
  subtitle: "LocuciÃ³n Humana HÃ­brida & PostproducciÃ³n Audiovisual",
  valueProposition:
    "AIVOXCR no compite por precio bajo. La ventaja competitiva es la eficiencia operativa: Un actor profesional interpreta mÃºltiples roles con cambio de timbre asistido por IA, reduciendo costos de casting y coordinaciÃ³n sin perder calidad humana.",
  baseRates: {
    title: "1. Tarifas Base de LocuciÃ³n Comercial",
    note:
      "Precios en USD por paÃ­s de difusiÃ³n. Licencia de uso por 1 aÃ±o (IVR: Licencia perpetua). En TV, radio y pauta digital la tarifa aplica por cada paÃ­s de difusiÃ³n.",
    columns: [
      "Medio",
      "DuraciÃ³n",
      "Latam",
      "EE.UU.",
      "RenovaciÃ³n anual",
    ],
    rows: [
      ["TelevisiÃ³n nacional", "30 seg", "$225", "$450", "30%"],
      ["Redes sociales (pauta)", "30 seg", "$225", "$450", "30%"],
      ["Radio nacional", "30 seg", "$190", "$350", "30%"],
      ["Corporativo / web", "Hasta 2 min", "$350", "$600", "30%"],
      ["IVR / centralitas", "Por mensaje", "$200", "$300", "Perpetua"],
    ],
  },
  multipleCharacters: {
    title: "2. Personajes MÃºltiples (EconomÃ­a de Escala)",
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
    title: "Multiplicador por Complejidad de InterpretaciÃ³n",
    columns: ["Tipo", "DescripciÃ³n", "Multiplicador", "Ejemplo Latam"],
    rows: [
      [
        "Narrador neutro",
        "Voz guÃ­a corporativa sin alta carga emocional",
        "x1.0",
        "$225",
      ],
      ["Personaje emocional", "ActuaciÃ³n con emociÃ³n y diÃ¡logos", "x1.25", "$281"],
      ["Personaje complejo", "MÃºltiples registros y arco dramÃ¡tico", "x1.5", "$338"],
    ],
  },
  postProduction: {
    title: "3. PostproducciÃ³n y Pulido de Audio",
    columns: ["Servicio", "Tarifa base", "Tarifa compleja"],
    rows: [
      ["RestauraciÃ³n de audio", "$10 / min", "$20 / min"],
      ["Mezcla mÃ¡ster comercial", "$125 / pieza", "-"],
      ["DiseÃ±o sonoro (SFX + mÃºsica)", "$100 / spot", "-"],
      ["EdiciÃ³n RRSS (Reels / TikTok)", "$250 / pieza", "-"],
      ["DiseÃ±o sonoro por hora", "$100 / hora", "-"],
    ],
    note:
      "Pistas musicales se cotizan aparte segÃºn selecciÃ³n del cliente. El ingeniero valida si restauraciÃ³n aplica tarifa base o compleja.",
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
        "1 voz + mezcla mÃ¡ster (hasta 60 seg)",
        "4",
        "2 por video",
        "$800",
      ],
      [
        "Growth",
        "1 voz + mezcla + ediciÃ³n RRSS (hasta 90 seg)",
        "8",
        "2 por video",
        "$1,800",
      ],
      [
        "Enterprise",
        "Hasta 2 voces + mezcla + ediciÃ³n + diseÃ±o sonoro",
        "15+",
        "3 por video",
        "CotizaciÃ³n",
      ],
    ],
  },
  revisions: {
    title: "6. Revisiones y Tiempos de Entrega",
    columns: ["Proyecto", "RevisiÃ³n adicional", "Entrega estimada"],
    rows: [
      ["Spot comercial (TV/Radio)", "$50 / ronda", "3-5 dÃ­as hÃ¡biles"],
      ["Redes sociales / digital", "$50 / ronda", "2-4 dÃ­as hÃ¡biles"],
      ["Corporativo / web", "$50 / ronda", "3-5 dÃ­as hÃ¡biles"],
      ["IVR / centralitas", "$35 / ronda", "2-3 dÃ­as hÃ¡biles"],
      ["PostproducciÃ³n", "$75 / ronda", "3-5 dÃ­as hÃ¡biles"],
    ],
    note:
      "Primera revisiÃ³n incluida. Cambios estructurales de copy se cotizan como proyecto nuevo. Urgencias (<48h): Recargo del 50%.",
  },
  conditions: [
    "Precios en USD, sin impuestos locales.",
    "La licencia cubre medio y territorio cotizados; usos extra requieren extensiÃ³n.",
    "RenovaciÃ³n anual: 30% del precio original antes del vencimiento.",
    "Cambios de copy despuÃ©s de grabar generan nueva cotizaciÃ³n.",
    "Proyectos de $500+ requieren 50% de anticipo.",
    "AIVOXCR puede incluir el proyecto en portafolio salvo NDA firmado.",
  ],
};












