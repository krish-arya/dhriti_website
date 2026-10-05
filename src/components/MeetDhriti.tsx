import { copy, site } from "@/content/site";
import DhritiPortrait from "./DhritiPortrait";
import SplitWords from "./SplitWords";
import styles from "./Sections.module.css";

export default function MeetDhriti() {
  return (
    <section id="about" className={`section ${styles.about}`} aria-labelledby="about-heading">
      <div className={`container ${styles.aboutGrid}`}>
        <div className={styles.aboutPortrait} data-reveal>
          {/* Same photograph, different crop from the hero */}
          <DhritiPortrait
            variant="about"
            src={site.portrait.src}
            alt={site.portrait.alt}
            objectPosition={{ mobile: "50% 30%", desktop: "50% 40%" }}
            className={styles.drift}
          />
        </div>

        <div className={styles.aboutCopy}>
          <p className="eyebrow" data-reveal>{copy.about.eyebrow}</p>
          <h2 id="about-heading" data-reveal="words">
            <SplitWords text={copy.about.heading} />
          </h2>
          {copy.about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? styles.lead : undefined} data-reveal>
              {p}
            </p>
          ))}

          <ul className={styles.credentialList} aria-label="Credentials" data-reveal>
            {site.credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
