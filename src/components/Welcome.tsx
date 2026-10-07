import { copy, site } from "@/content/site";
import DhritiPortrait from "./DhritiPortrait";
import SplitWords from "./SplitWords";
import styles from "./Sections.module.css";

export default function Welcome() {
  const w = copy.welcome;
  return (
    <section id="welcome" className={`section ${styles.welcome}`} aria-labelledby="welcome-heading">
      <div className={`container ${styles.welcomeGrid}`}>
        <div className={styles.welcomePhoto} data-reveal>
          <DhritiPortrait
            variant="editorial"
            src={site.photos.welcome.src}
            alt={site.photos.welcome.alt}
            objectPosition="50% 20%"
          />
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
