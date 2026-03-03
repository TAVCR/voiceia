export type TestAudioSource = {
  id: number;
  title: string;
  aiAudioUrl: string;
  humanAudioUrl: string;
};

export type DemoAudioSource = {
  id: string;
  title: string;
  audioUrl: string;
};

export const TEST_AUDIO_SOURCES: TestAudioSource[] = [
  {
    id: 1,
    title: "KIWIGLOWCR",
    aiAudioUrl:
      "https://cdn.jsdelivr.net/gh/TAVCR/voices-audio-cdn@c1a16f1716aa540a8d268d1f7c3359da0d192fbe/audios/KIWIGLOWCR%20EXPLICATIVO%20RADIO.mp3",
    humanAudioUrl: "",
  },
  {
    id: 2,
    title: "EV2CR",
    aiAudioUrl:
      "https://cdn.jsdelivr.net/gh/TAVCR/voices-audio-cdn@v1.0.0/audios/EV2CR%20VERSION%20IA.mp3",
    humanAudioUrl:
      "https://cdn.jsdelivr.net/gh/TAVCR/voices-audio-cdn@v1.0.0/audios/EV2CR%20VERSION%20ORIGINAL.mp3",
  },
  {
    id: 3,
    title: "OPTICAS VISION",
    aiAudioUrl:
      "https://cdn.jsdelivr.net/gh/TAVCR/voices-audio-cdn@v1.0.0/audios/OPTICAS%20VISION%20VERSION%20IA.mp3",
    humanAudioUrl:
      "https://cdn.jsdelivr.net/gh/TAVCR/voices-audio-cdn@v1.0.0/audios/OPTICAS%20VISION%20VERSION%20ORIGINAL.mp3",
  },
  {
    id: 4,
    title: "PILOTOS TERRORISTAS",
    aiAudioUrl:
      "https://cdn.jsdelivr.net/gh/TAVCR/voices-audio-cdn@v1.0.0/audios/PILOTOS%20TERRORISTAS%20IA.mp3",
    humanAudioUrl:
      "https://cdn.jsdelivr.net/gh/TAVCR/voices-audio-cdn@v1.0.0/audios/PILOTOS%20TERRORISTAS%20ORIGINAL.mp3",
  },
  {
    id: 5,
    title: "PROMERICA BILLETERA",
    aiAudioUrl:
      "https://cdn.jsdelivr.net/gh/TAVCR/voices-audio-cdn@v1.0.0/audios/PROMERICA%20BILLETERA%20IA.mp3",
    humanAudioUrl:
      "https://cdn.jsdelivr.net/gh/TAVCR/voices-audio-cdn@v1.0.0/audios/PROMERICA%20BILLETERA%20ORIGINAL.mp3",
  },
  {
    id: 6,
    title: "DEMO 5",
    aiAudioUrl: "./audios/demo-5.mp3",
    humanAudioUrl: "",
  },
];

export const DEMO_AUDIO_SOURCES: DemoAudioSource[] = TEST_AUDIO_SOURCES.filter(
  (audio) => [1, 2, 4, 5, 6].includes(audio.id)
).map((audio, index) => ({
    id: `demo_${audio.id}`,
    title: `Demo ${index + 1}`,
    audioUrl: audio.aiAudioUrl,
  }));
