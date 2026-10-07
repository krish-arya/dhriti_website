import { copy, site } from "@/content/site";
import DhritiPortrait from "./DhritiPortrait";
import SplitWords from "./SplitWords";
import styles from "./Sections.module.css";

export default function MeetDhriti() {
  const a = copy.about;
  return (
    <section id="about" className={`section ${styles.about}`} aria-labelledby="about-heading">
      <div className={`container ${styles.aboutGrid}`}>
        <div className={styles.aboutAside}>
          <div className={styles.aboutPortrait} data-reveal>
            <DhritiPortrait
              variant="about"
              src={site.photos.about.src}
              alt={site.photos.about.alt}
              objectPosition={{ mobile: "50% 20%", desktop: "50% 25%" }}
              className={styles.drift}
            />
            <p className={styles.since} aria-label={`Practising since ${site.practisingSince}`}>
              <span>Practising since</span>
              <strong>{site.practisingSince}</strong>
            </p>
          </div>

          <div className={styles.qualifications} data-reveal>
            <h3>{a.qualificationsHeading}</h3>
            <ul>
              {site.qualifications.map((q) => (
                <li key={q.label}>
                  <span>{q.label}</span>
                  {q.detail && <small>{q.detail}</small>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.aboutCopy}>
          <p className="eyebrow" data-reveal>{a.eyebrow}</p>
          <h2 id="about-heading" data-reveal="words">
            <SplitWords text={a.heading} />
          </h2>
          <p className={styles.lead} data-reveal>
            {a.lead}
          </p>
          {a.paragraphs.map((p, i) => (
            <p key={i} data-reveal>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
