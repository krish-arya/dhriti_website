import { copy } from "@/content/site";
import SplitWords from "./SplitWords";
import styles from "./Sections.module.css";

export default function Sessions() {
  return (
    <section id="sessions" className={`section ${styles.sessions}`} aria-labelledby="sessions-heading">
      <div className={`container ${styles.sessionsGrid}`}>
        <header className={styles.sectionHead}>
          <p className="eyebrow" data-reveal>{copy.sessions.eyebrow}</p>
          <h2 id="sessions-heading" data-reveal="words">
            <SplitWords text={copy.sessions.heading} />
          </h2>
        </header>

        <ol className={styles.steps}>
          {copy.sessions.steps.map((s, i) => (
            <li key={s.title} className={styles.step} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <span className={styles.stepNumber} aria-hidden="true">{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
