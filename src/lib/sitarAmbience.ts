/**
 * Generative sitar ambience, synthesised live with the Web Audio API — no
 * audio files, no licensing. A tanpura drone keeps a slow cycle underneath
 * while a sitar plays short, unhurried phrases in Raag Bhupali (a pentatonic
 * scale with no dissonant intervals), occasionally sliding between notes
 * (meend). Everything passes through a soft low-pass and a long, warm reverb.
 *
 * Strings use Karplus–Strong synthesis with a simple "jawari" bridge model:
 * large negative excursions are softened, which produces the sitar's bright
 * buzz while a note is loud and lets it fade naturally as the note decays.
 */

const SA = 138.59; // C#3 — tonic
const MAKEUP = 3.6; // brings the overall level to a comfortable listening volume

// Raag Bhupali, relative to Sa: Pa, Dha (lower) · Sa Re Ga Pa Dha · Sa'
const SCALE = [3 / 4, 5 / 6, 1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2];
const RESTING = [2, 4, 5, 7]; // Sa, Ga, Pa, Sa' — where phrases like to settle

// Opening phrase [scale index, seconds until next note, slide in?]:
// Sa · Dha(low) · Sa ~ Re · Ga ~ Re · Sa — a traditional way into Bhupali.
const OPENING: [number, number, boolean][] = [
  [2, 2.6, false],
  [1, 1.9, false],
  [2, 2.8, true],
  [3, 1.9, false],
  [4, 2.8, true],
  [3, 2.0, false],
  [2, 5.0, true],
];

type StringOptions = { decay: number; brightness: number; buzz: number; pluckPosition: number };

function pluckedString(ctx: BaseAudioContext, freq: number, seconds: number, o: StringOptions) {
  const sr = ctx.sampleRate;
  const length = Math.floor(sr * seconds);
  const buffer = ctx.createBuffer(1, length, sr);
  const out = buffer.getChannelData(0);

  // The two-point average adds half a sample of delay.
  const N = Math.max(2, Math.round(sr / freq - 0.5));
  const line = new Float32Array(N);

  // Excitation: filtered noise, combed to imitate plucking away from the bridge.
  let lp = 0;
  for (let i = 0; i < N; i++) {
    lp += o.brightness * (Math.random() * 2 - 1 - lp);
    line[i] = lp;
  }
  const comb = Math.max(1, Math.floor(N * o.pluckPosition));
  for (let i = N - 1; i >= comb; i--) line[i] -= line[i - comb];

  let peak = 0;
  for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(line[i]));
  const threshold = peak * 0.35;

  let idx = 0;
  for (let i = 0; i < length; i++) {
    const cur = line[idx];
    const next = line[idx + 1 === N ? 0 : idx + 1];
    let v = o.decay * 0.5 * (cur + next);
    if (o.buzz > 0 && v < -threshold) v = -threshold + (v + threshold) * (1 - o.buzz);
    out[i] = cur;
    line[idx] = v;
    idx = idx + 1 === N ? 0 : idx + 1;
  }

  // Remove DC introduced by the asymmetric bridge, normalise, fade the tail.
  let x1 = 0;
  let y1 = 0;
  let max = 0;
  for (let i = 0; i < length; i++) {
    const y = out[i] - x1 + 0.995 * y1;
    x1 = out[i];
    y1 = y;
    out[i] = y;
    max = Math.max(max, Math.abs(y));
  }
  const fade = Math.floor(sr * 0.4);
  for (let i = 0; i < length; i++) {
    let g = 0.9 / (max || 1);
    if (i > length - fade) g *= (length - i) / fade;
    out[i] *= g;
  }
  return buffer;
}

function impulseResponse(ctx: BaseAudioContext, seconds: number) {
  const sr = ctx.sampleRate;
  const length = Math.floor(sr * seconds);
  const ir = ctx.createBuffer(2, length, sr);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    let lp = 0;
    for (let i = 0; i < length; i++) {
      const t = i / length;
      lp += 0.35 * (Math.random() * 2 - 1 - lp); // darker tail
      d[i] = lp * Math.pow(1 - t, 3) * (i < sr * 0.012 ? i / (sr * 0.012) : 1);
    }
  }
  return ir;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];

export interface Ambience {
  /** True once sound is actually playing (browsers may hold it until the visitor interacts). */
  readonly running: boolean;
  start(): Promise<void>;
  stop(): Promise<void>;
  dispose(): void;
}

export function createSitarAmbience(volume = 0.5): Ambience {
  let ctx: AudioContext | null = null;
  let master: GainNode;
  let dry: GainNode;
  let reverb: ConvolverNode;
  let sitar: AudioBuffer;
  let tanpura: AudioBuffer;
  let timer: number | undefined;
  let generation = 0; // guards against stop() finishing after a newer start()

  // scheduler state
  let nextTanpura = 0;
  let tanpuraStep = 0;
  let nextNote = 0;
  let phraseLeft = 0;
  let degree = 2;
  let lastRate = 1;
  let openingStep = 0;

  function setup() {
    ctx = new AudioContext({ latencyHint: "playback" });
    master = ctx.createGain();
    master.gain.value = 0;

    const tone = ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 4200;
    tone.Q.value = 0.4;

    dry = ctx.createGain();
    dry.gain.value = 0.75;
    reverb = ctx.createConvolver();
    reverb.buffer = impulseResponse(ctx, 4.2);
    const wet = ctx.createGain();
    wet.gain.value = 0.5;

    dry.connect(tone);
    reverb.connect(wet).connect(tone);
    // Gentle limiter so overlapping notes never get harsh.
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -14;
    limiter.knee.value = 12;
    limiter.ratio.value = 4;
    limiter.attack.value = 0.01;
    limiter.release.value = 0.4;
    tone.connect(master).connect(limiter).connect(ctx.destination);

    sitar = pluckedString(ctx, SA * 2, 4.5, { decay: 0.9986, brightness: 0.75, buzz: 0.7, pluckPosition: 0.11 });
    tanpura = pluckedString(ctx, SA, 7, { decay: 0.99965, brightness: 0.35, buzz: 0.85, pluckPosition: 0.18 });
  }

  function voice(buffer: AudioBuffer, when: number, rate: number, gain: number, pan: number, glideFrom?: number) {
    if (!ctx) return;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    if (glideFrom) {
      // meend — an unhurried slide into the note
      src.playbackRate.setValueAtTime(glideFrom, when);
      src.playbackRate.exponentialRampToValueAtTime(rate, when + rand(0.35, 0.7));
    } else {
      src.playbackRate.value = rate;
    }
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(gain, when + 0.006);
    const p = ctx.createStereoPanner();
    p.pan.value = pan;
    src.connect(g).connect(p);
    p.connect(dry);
    p.connect(reverb);
    src.start(when);
    src.onended = () => p.disconnect();
  }

  function scheduleTanpura(until: number) {
    // Classic cycle: Pa (lower) · Sa · Sa · Sa (low), with a long breath at the end.
    const pattern = [0.75, 1, 1, 0.5];
    while (nextTanpura < until) {
      const rate = pattern[tanpuraStep % 4];
      voice(tanpura, nextTanpura, rate, 0.2, -0.25 + 0.15 * (tanpuraStep % 4));
      voice(tanpura, nextTanpura + 0.012, rate * 1.0011, 0.07, 0.3); // faint detuned twin for shimmer
      tanpuraStep++;
      nextTanpura += tanpuraStep % 4 === 0 ? 2.6 : 1.7;
    }
  }

  function playNote(deg: number, gain: number, glide: boolean) {
    const rate = SCALE[deg];
    voice(sitar, nextNote, rate, gain, rand(-0.15, 0.15), glide && lastRate !== rate ? lastRate : undefined);
    lastRate = rate;
    degree = deg;
  }

  function scheduleMelody(until: number) {
    while (nextNote < until) {
      // A composed opening alaap, so the first thing heard is a clear, gentle phrase.
      const opening = OPENING[openingStep];
      if (opening) {
        playNote(opening[0], 0.3, opening[2]);
        nextNote += opening[1];
        openingStep++;
        if (!OPENING[openingStep]) nextNote += rand(2.5, 4);
        continue;
      }

      if (phraseLeft === 0) {
        phraseLeft = Math.floor(rand(3, 6));
        nextNote += rand(3, 6); // breathing space between phrases
        continue;
      }
      phraseLeft--;

      const last = phraseLeft === 0;
      let next: number;
      if (last) {
        next = RESTING.reduce((a, b) => (Math.abs(b - degree) < Math.abs(a - degree) ? b : a));
      } else {
        // mostly stepwise movement — it's what makes a line sound sung rather than random
        const step = pick([-1, -1, 1, 1, 1, -2, 2, 0]);
        next = Math.min(SCALE.length - 1, Math.max(0, degree + step));
      }
      playNote(next, rand(0.24, 0.32) * (last ? 1.1 : 1), !last && Math.random() < 0.45);

      nextNote += last ? rand(4, 5.5) : pick([1.4, 1.8, 2.2, 2.2, 2.8, 3.4]);
    }
  }

  function tick() {
    if (!ctx) return;
    const until = ctx.currentTime + 0.6;
    scheduleTanpura(until);
    scheduleMelody(until);
  }

  return {
    get running() {
      return ctx?.state === "running" && timer !== undefined;
    },

    async start() {
      generation++;
      if (!ctx) setup();
      const c = ctx!;
      await c.resume();
      const now = c.currentTime;
      if (timer === undefined) {
        nextTanpura = now + 0.15;
        nextNote = now + 2.5; // let the drone settle first
        phraseLeft = 0;
        timer = window.setInterval(tick, 150);
        tick();
      }
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(volume * MAKEUP, now + 5);
    },

    async stop() {
      if (!ctx) return;
      const mine = ++generation;
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0, now + 1.6);
      await new Promise((r) => setTimeout(r, 1700));
      if (mine !== generation || !ctx) return;
      window.clearInterval(timer);
      timer = undefined;
      await ctx.suspend();
    },

    dispose() {
      window.clearInterval(timer);
      timer = undefined;
      ctx?.close();
      ctx = null;
    },
  };
}
