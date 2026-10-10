import Link from "next/link";
import type { CSSProperties } from "react";
import { bookingHref, copy, site } from "@/content/site";
import DhritiPortrait from "./DhritiPortrait";
import HeroAtmosphere from "./HeroAtmosphere";
import { external } from "./shared";
import styles from "./Hero.module.css";

export default function Hero() {
  const href = bookingHref();
  let wordIndex = 0;
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-heading">
      {/* Leaf shadows from an unseen window, drifting slowly across the wall */}
      <div className={styles.dapple} aria-hidden="true">
        <svg viewBox="0 0 600 500" fill="currentColor">
          <path d="M40 470C120 360 210 250 330 150S520 30 590 10" fill="none" stroke="currentColor" strokeWidth="7" />
          {[
            [110, 380, -40], [160, 320, 30], [205, 268, -35], [255, 220, 25], [300, 180, -30],
            [350, 140, 35], [400, 105, -25], [455, 75, 30], [510, 45, -20],
          ].map(([x, y, r], i) => (
            <ellipse key={i} cx={x} cy={y} rx="16" ry="44" transform={`rotate(${r} ${x} ${y}) translate(${r > 0 ? 28 : -28} -18)`} />
          ))}
        </svg>
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={`eyebrow ${styles.eyebrow}`}>{copy.hero.eyebrow}</p>
          <h1 id="hero-heading" className={styles.heading}>
            {copy.hero.lines.map((line) => (
              <span key={line} className={styles.line}>
                {line.split(" ").map((word, i, arr) => (
                  <span key={i}>
                    <span className={styles.word} style={{ "--i": wordIndex++ } as CSSProperties}>
                      {word}
                    </span>
                    {i < arr.length - 1 && " "}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className={styles.tagline}>{copy.hero.tagline}</p>

          <div className={styles.identity}>
            <p className={styles.name}>{site.name}</p>
            <p className={styles.credentials}>
              {site.credentials.map((c, i) => (
                <span key={c}>
                  {i > 0 && <span className={styles.dot} aria-hidden="true">·</span>}
                  {c}
                </span>
              ))}
            </p>
          </div>

          <div className={styles.actions}>
            <a className="button" href={href} target={external(href)} rel="noopener noreferrer">
              {copy.hero.cta} <span aria-hidden="true">→</span>
            </a>
            <Link className="link-quiet" href="/about">
              Meet Dhriti
            </Link>
          </div>
        </div>

        <div className={styles.stage}>
          {/* A warm terracotta archway behind the portrait — the doorway, felt rather than drawn */}
          <div className={styles.sun} aria-hidden="true" />
          <HeroAtmosphere />
          <svg className={styles.sprigStatic} viewBox="0 0 80 140" fill="none" aria-hidden="true">
            <path d="M40 138C38 100 42 60 60 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M41 110c-12-4-22-14-24-28 12 2 22 12 24 28Z" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth=".9" />
            <path d="M44 78c10-6 20-6 28-18-14-2-24 6-28 18Z" fill="currentColor" fillOpacity=".25" stroke="currentColor" strokeWidth=".9" />
            <path d="M50 46c-10-4-16-14-16-26 10 4 16 12 16 26Z" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth=".9" />
          </svg>
          <div className={styles.portrait}>
            <DhritiPortrait variant="hero" src={site.portrait.src} alt={site.portrait.alt} priority />
          </div>
        </div>
      </div>
    </section>
  );
}
