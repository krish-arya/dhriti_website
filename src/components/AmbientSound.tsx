"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import type { Ambience } from "@/lib/sitarAmbience";
import styles from "./AmbientSound.module.css";

/** Remembers a visitor's choice to turn the music off, across pages and visits. */
const OFF_KEY = "innerdoorways:music-off";

/**
 * Events that count as a user gesture: browsers only allow sound after one.
 * Scrolling does not count, so music begins on the first click, tap or key press.
 */
const GESTURES = ["pointerdown", "pointerup", "keydown", "touchend"] as const;

/** A looping audio file with gentle fades, matching the generative engine's interface. */
function createFileAmbience(src: string, volume: number): Ambience {
  const audio = new Audio(src);
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0;
  let fade: number | undefined;
  const fadeTo = (target: number, ms: number) =>
    new Promise<void>((resolve) => {
      window.clearInterval(fade);
      const from = audio.volume;
      const t0 = performance.now();
      fade = window.setInterval(() => {
        const k = Math.min(1, (performance.now() - t0) / ms);
        audio.volume = from + (target - from) * k;
        if (k === 1) {
          window.clearInterval(fade);
          resolve();
        }
      }, 50);
    });
  return {
    get running() {
      return !audio.paused;
    },
    async start() {
      await audio.play();
      await fadeTo(volume, 5000);
    },
    async stop() {
      await fadeTo(0, 1500);
      if (audio.volume === 0) audio.pause();
    },
    dispose() {
      window.clearInterval(fade);
      audio.pause();
    },
  };
}

function readOff() {
  try {
    return localStorage.getItem(OFF_KEY) === "1";
  } catch {
    return false;
  }
}

function writeOff(off: boolean) {
  try {
    if (off) localStorage.setItem(OFF_KEY, "1");
    else localStorage.removeItem(OFF_KEY);
  } catch {
    /* storage unavailable — the choice just won't be remembered */
  }
}

export default function AmbientSound() {
  const engine = useRef<Ambience | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const detach = useRef<() => void>(() => {});
  /** The visitor wants music (it may still be waiting for their first interaction). */
  const [on, setOn] = useState(site.music.autoplay);
  const [audible, setAudible] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  // Cache the promise so an early click can't create a second engine mid-load.
  const loading = useRef<Promise<Ambience> | null>(null);
  const getEngine = useCallback(() => {
    loading.current ??= (async () => {
      const { src, volume } = site.music;
      if (src) return createFileAmbience(src, volume);
      const { createSitarAmbience } = await import("@/lib/sitarAmbience");
      return createSitarAmbience(volume);
    })().then((e) => (engine.current = e));
    return loading.current;
  }, []);

  const play = useCallback(async () => {
    const e = await getEngine();
    await e.start();
    setAudible(e.running);
  }, [getEngine]);

  // On by default: try to start straight away, and if the browser holds sound
  // back, begin on the visitor's first click, tap or key press.
  useEffect(() => {
    if (!site.music.autoplay || readOff()) {
      setOn(false);
      return;
    }

    let done = false;
    const onGesture = (ev: Event) => {
      // The toggle button handles its own clicks.
      if (button.current?.contains(ev.target as Node)) return;
      detach.current();
      play().catch(() => {});
    };
    const attach = () => {
      GESTURES.forEach((t) => window.addEventListener(t, onGesture, { capture: true, passive: true }));
      detach.current = () => {
        done = true;
        GESTURES.forEach((t) => window.removeEventListener(t, onGesture, { capture: true }));
      };
    };

    attach();
    getEngine()
      .then((e) => {
        if (done) return;
        e.start().catch(() => {}); // may stay pending until a gesture
        window.setTimeout(() => {
          if (e.running) {
            detach.current();
            setAudible(true);
          }
        }, 600);
      })
      .catch(() => setUnavailable(true));

    return () => detach.current();
  }, [getEngine, play]);

  const toggle = async () => {
    if (on) {
      setOn(false);
      setAudible(false);
      writeOff(true);
      detach.current();
      await engine.current?.stop();
    } else {
      setOn(true);
      writeOff(false);
      try {
        await play();
      } catch {
        setOn(false);
        setUnavailable(true);
      }
    }
  };

  // Pause quietly while the tab is in the background, resume on return.
  useEffect(() => {
    if (!on || !audible) return;
    const onVisibility = () => {
      const e = engine.current;
      if (!e) return;
      if (document.hidden) e.stop();
      else e.start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [on, audible]);

  useEffect(() => () => engine.current?.dispose(), []);

  if (unavailable) return null;

  return (
    <button
      ref={button}
      type="button"
      className={styles.toggle}
      data-playing={on}
      aria-pressed={on}
      aria-label={`${site.music.label} (background music)`}
      onClick={toggle}
      title={on ? "Turn background music off" : "Play soft background music"}
    >
      <span className={styles.bars} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className={styles.label} aria-hidden="true">
        {site.music.label}
      </span>
    </button>
  );
}
