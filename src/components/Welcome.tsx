import { copy, site } from "@/content/site";
import Image from "next/image";
import SplitWords from "./SplitWords";
import styles from "./Sections.module.css";

export default function Welcome() {
  const w = copy.welcome;
  return (
    <section id="welcome" className={`section ${styles.welcome}`} aria-labelledby="welcome-heading">
      <div className={`container ${styles.welcomeGrid}`}>
        <div className={styles.welcomePhoto} data-reveal>
          {/* The logo, not another photo — the hero already introduces her */}
          <Image src="/images/logo.png" alt={`${site.brand} logo`} width={320} height={320} className={styles.welcomeLogo} />
        </div>

        <div className={styles.letter}>
          <p className="eyebrow" data-reveal>{w.eyebrow}</p>
          <h2 id="welcome-heading" className={styles.greeting} data-reveal="words">
            <SplitWords text={w.greeting} />
          </h2>
          {w.paragraphs.map((p, i) => (
            <p key={i} data-reveal>
              {p}
            </p>
          ))}
          <p className={styles.closing} data-reveal>
            {w.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
