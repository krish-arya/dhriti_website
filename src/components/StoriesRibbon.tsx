"use client";

import Link from "next/link";
import { useState } from "react";
import { ribbonLines, testimonials } from "@/content/testimonials";
import PrivacyBadge from "./PrivacyBadge";
import SplitWords from "./SplitWords";
import styles from "./StoriesRibbon.module.css";

type Line = { id: number; line: string; who: string; age: number };

const lines: Line[] = ribbonLines.map(({ id, line }) => {
  const t = testimonials.find((x) => x.id === id)!;
  return { id, line, who: t.who, age: t.age };
});
const half = Math.ceil(lines.length / 2);
const rows = [lines.slice(0, half), lines.slice(half)];

function Row({ items, reverse }: { items: Line[]; reverse?: boolean }) {
  // The list is rendered twice so the loop is seamless; the copy is hidden from screen readers.
  return (
    <div className={`${styles.row} ${reverse ? styles.reverse : ""}`}>
      {[0, 1].map((copy) => (
        <ul key={copy} className={styles.group} aria-hidden={copy === 1 || undefined}>
          {items.map((l) => (
            <li key={l.id} className={styles.item}>
              <figure>
                <blockquote>
                  <p>{l.line}</p>
                </blockquote>
                <figcaption>
                  {l.who} · {l.age}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/** Home page: a slow, revolving ribbon of client words. */
export default function StoriesRibbon() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="stories" className={styles.section} aria-labelledby="stories-heading">
      <div className={`container ${styles.head}`}>
        <p className="eyebrow" data-reveal>In their words</p>
        <h2 id="stories-heading" data-reveal="words">
          <SplitWords text="Heard, in their own words." />
        </h2>
        <p className={styles.count} data-reveal>
          {testimonials.length} people have shared what therapy has meant to them.
        </p>
        <div data-reveal>
          <PrivacyBadge />
        </div>
      </div>

      <div className={styles.ribbon} data-paused={paused} data-reveal>
        <Row items={rows[0]} />
        <Row items={rows[1]} reverse />
      </div>

      <div className={`container ${styles.foot}`}>
        <button
          type="button"
          className={styles.pause}
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
            </svg>
          )}
          {paused ? "Play" : "Pause"}
        </button>
        <Link className="button" href="/stories">
          Read all {testimonials.length} stories <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
