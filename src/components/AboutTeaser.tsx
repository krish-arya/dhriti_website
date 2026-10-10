import Link from "next/link";
import { copy, site } from "@/content/site";
import SplitWords from "./SplitWords";
import styles from "./Sections.module.css";

/** Short "Meet Dhriti" on the home page; the full story lives on /about. */
export default function AboutTeaser() {
  return (
    <section id="about" className={`section ${styles.about}`} aria-labelledby="about-heading">
      <div className={`container ${styles.teaserGrid}`}>
        <p className={`${styles.since} ${styles.sinceStatic}`} aria-label={`Practising since ${site.practisingSince}`} data-reveal>
          <span>Practising since</span>
          <strong>{site.practisingSince}</strong>
        </p>

        <div className={styles.aboutCopy}>
          <p className="eyebrow" data-reveal>{copy.about.eyebrow}</p>
          <h2 id="about-heading" data-reveal="words">
            <SplitWords text={copy.about.heading} />
          </h2>
          <p className={styles.lead} data-reveal>
            {copy.about.lead}
          </p>
          <p data-reveal>{site.credentials.join(" · ")}</p>
          <Link className="link-quiet" href="/about" data-reveal>
            Read Dhriti&apos;s story <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
