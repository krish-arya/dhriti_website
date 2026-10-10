"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { InstagramPost } from "@/content/site";
import styles from "./PostCarousel.module.css";

/** Swipeable row of Instagram posts with gentle arrow controls. */
export default function PostCarousel({ posts }: { posts: InstagramPost[] }) {
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
    <div className={styles.carousel} data-reveal>
      <ul ref={track} className={styles.track} onScroll={update} aria-label="Instagram posts">
        {posts.map((p) => (
          <li key={p.href} className={styles.card}>
            <a href={p.href} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.alt} loading="lazy" decoding="async" draggable={false} />
              {p.kind === "reel" && (
                <span className={styles.reelBadge} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                  Watch
                </span>
              )}
              <span className="sr-only">(opens on Instagram)</span>
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.controls}>
        <button type="button" onClick={() => move(-1)} disabled={atStart} aria-label="Previous posts">
          ←
        </button>
        <button type="button" onClick={() => move(1)} disabled={atEnd} aria-label="Next posts">
          →
        </button>
      </div>
    </div>
  );
}
