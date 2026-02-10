# GUÍA DE CONFIGURACIÓN RÁPIDA
## Voices IA - Landing Page

---

## 1. CONFIGURAR TUS ENLACES DE AUDIO

Abre el archivo `voices-ia-landing.html` y busca la sección `CONFIG` (aproximadamente línea 400).

Reemplaza estos enlaces con tus URLs de GitHub:

```javascript
const CONFIG = {
    audioProjects: [
        {
            id: 1,
            title: "PROYECTO_ALPHA",  // ← Cambia estos títulos
            aiAudioUrl: "TU_ENLACE_GITHUB_AI_01.mp3",     // ← Cambia aquí
            humanAudioUrl: "TU_ENLACE_GITHUB_HUMAN_01.mp3" // ← Y aquí
        },
        {
            id: 2,
            title: "PROYECTO_BETA",
            aiAudioUrl: "TU_ENLACE_GITHUB_AI_02.mp3",
            humanAudioUrl: "TU_ENLACE_GITHUB_HUMAN_02.mp3"
        },
        // ... repite para los 5 proyectos
    ],
    formspreeUrl: "https://formspree.io/f/TU_ID_FORMSPREE" // ← Tu ID de Formspree
};
```

---

## 2. FORMATO DE ENLACES DE GITHUB

Si tus audios están en:
```
https://github.com/tu-usuario/tu-repo/blob/main/audio/ai_voice_01.mp3
```

Debes usar este formato (raw):
```
https://raw.githubusercontent.com/tu-usuario/tu-repo/main/audio/ai_voice_01.mp3
```

**Importante:** Usa `raw.githubusercontent.com` en lugar de `github.com/blob`

---

## 3. CONFIGURAR FORMSPREE

1. Ve a https://formspree.io
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Copia el ID que te dan (formato: `xxxYYYzzz`)
5. Reemplaza en el CONFIG: `https://formspree.io/f/xxxYYYzzz`

---

## 4. PERSONALIZAR TEXTOS

### Pantalla 1 (Hook)
Busca `Screen1` y edita:
```javascript
<h1>
    <span>¿PUEDES</span>        // ← Cambia aquí
    <span>DISTINGUIR?</span>     // ← Y aquí
</h1>

<p>
    Voz humana vs voz generada por IA.  // ← Cambia el copy
    Una prueba que cambiará tu percepción.
</p>
```

### Pantalla 3 (Revelación)
Busca `Screen3` y edita:
```javascript
<span>TODAS LAS VOCES QUE ESCUCHASTE</span>
<span>FUERON GENERADAS CON IA</span>      // ← Edita estos textos
```

### Pantalla 4 (Explicación)
Busca `concepts` en `Screen4`:
```javascript
const concepts = [
    {
        number: "01",
        title: "ACTOR INTERPRETA",              // ← Cambia títulos
        description: "Un profesional de voz..." // ← Y descripciones
    },
    // ...
];
```

### Pantalla 5 (Autoridad)
Busca `expertise` en `Screen5`:
```javascript
const expertise = [
    "Locución profesional",        // ← Edita tu lista
    "Producción audiovisual",      //   de competencias
    "Diseño sonoro",
    "Dirección vocal"
];
```

---

## 5. NOMBRES DE PROYECTOS

Los títulos de los 5 proyectos de audio se configuran en el `CONFIG`:

```javascript
title: "PROYECTO_ALPHA",   // ← Cambia a nombres reales
title: "PROYECTO_BETA",    //   Ej: "SPOT_COMERCIAL"
title: "PROYECTO_GAMMA",   //   Ej: "NARRACIÓN_CORPORATIVA"
title: "PROYECTO_DELTA",   //   Ej: "PERSONAJE_ANIMADO"
title: "PROYECTO_EPSILON", //   Ej: "AUDIOLIBRO_MUESTRA"
```

---

## 6. CÓMO TESTEAR LOCALMENTE

1. Abre el archivo `voices-ia-landing.html` directamente en tu navegador
2. NO necesitas servidor local
3. Funciona directamente como archivo HTML

**IMPORTANTE:** Los audios de GitHub pueden tener problema de CORS al abrir como archivo local.

**Solución:** Usar servidor local simple:

```bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js (npx)
npx serve

# Opción 3: VS Code
Extensión "Live Server"
```

Luego abre: `http://localhost:8000/voices-ia-landing.html`

---

## 7. DEPLOY (SUBIR A INTERNET)

### Opción A: Netlify (Recomendada)
1. Ve a https://app.netlify.com/drop
2. Arrastra el archivo `voices-ia-landing.html`
3. Netlify te da una URL inmediatamente
4. GRATIS

### Opción B: GitHub Pages
1. Sube el archivo a un repositorio
2. Renómbralo a `index.html`
3. Activa GitHub Pages en Settings
4. Tu sitio estará en `usuario.github.io/repo`

### Opción C: Vercel
1. Ve a https://vercel.com
2. Importa desde GitHub
3. Deploy automático
4. GRATIS

---

## 8. TROUBLESHOOTING

### Los audios no se reproducen
- Verifica que los enlaces sean `raw.githubusercontent.com`
- Verifica que los archivos sean públicos
- Abre la consola del navegador (F12) para ver errores

### El formulario no envía
- Verifica tu ID de Formspree
- Revisa que el formato sea: `https://formspree.io/f/xxxYYYzzz`

### Pantalla en blanco
- Abre la consola (F12)
- Revisa errores de JavaScript
- Verifica que no falten comas en el CONFIG

### Los sonidos UI no se escuchan
- Algunos navegadores bloquean audio hasta interacción del usuario
- Esto es normal y se resuelve al primer click

---

## 9. OPTIMIZACIONES OPCIONALES

### Cambiar colores tech
Busca `:root` en el `<style>`:
```css
:root {
    --tech-accent: #00f2ff;    // ← Cyan principal
    --tech-warning: #ff8c00;   // ← Naranja de alerta
    --tech-base: #050505;      // ← Negro de fondo
    --tech-dim: #555555;       // ← Gris apagado
}
```

### Velocidad del scanline
Busca `@keyframes scan`:
```css
animation: scan 8s linear infinite; // ← Cambia 8s a tu gusto
```

### Altura de las ondas de audio
Busca `WaveSurfer.create`:
```javascript
height: 60,  // ← Cambia la altura en píxeles
```

---

## 10. CHECKLIST PRE-LANZAMIENTO

- [ ] Todos los enlaces de audio funcionan
- [ ] Formspree configurado y probado
- [ ] Textos personalizados revisados
- [ ] Logo de Dimensión Interactiva visible
- [ ] Probado en móvil y desktop
- [ ] Sonidos UI funcionando
- [ ] Formulario de contacto envía correctamente
- [ ] Todos los 5 proyectos de audio cargando

---

## ESTRUCTURA DE ARCHIVOS DE TU REPO GITHUB

```
tu-repo/
├── audio/
│   ├── ai_voice_01.mp3
│   ├── ai_voice_02.mp3
│   ├── ai_voice_03.mp3
│   ├── ai_voice_04.mp3
│   ├── ai_voice_05.mp3
│   ├── human_voice_01.mp3
│   ├── human_voice_02.mp3
│   ├── human_voice_03.mp3
│   ├── human_voice_04.mp3
│   └── human_voice_05.mp3
└── README.md (opcional)
```

Asegúrate de que el repo sea **PÚBLICO**.

---

## SOPORTE

Si encuentras problemas:
1. Revisa la consola del navegador (F12)
2. Verifica que todos los enlaces funcionen individualmente
3. Comprueba que tu Formspree esté activo

---

¡Listo! Tu landing está completa y funcionando.
