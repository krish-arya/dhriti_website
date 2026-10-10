"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Slider.module.css";

/** Horizontal, swipeable row with arrow controls. Children should be <li> elements. */
export default function Slider({ label, children, perView = 3 }: { label: string; children: ReactNode; perView?: number }) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const move = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: "smooth" });
  };

  return (
    <div data-reveal>
      <ul
        ref={track}
        className={styles.track}
        style={{ ["--per-view" as string]: perView }}
        onScroll={update}
        aria-label={label}
      >
        {children}
      </ul>
      <div className={styles.controls}>
        <button type="button" onClick={() => move(-1)} disabled={atStart} aria-label="Previous">
          ←
        </button>
        <button type="button" onClick={() => move(1)} disabled={atEnd} aria-label="Next">
          →
        </button>
      </div>
    </div>
  );
}
