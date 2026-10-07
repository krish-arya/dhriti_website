import { copy } from "@/content/site";
import SplitWords from "./SplitWords";
import styles from "./Sections.module.css";

export default function Areas() {
  return (
    <section id="areas" className={`section ${styles.areas}`} aria-labelledby="areas-heading">
      <div className="container">
        <header className={styles.sectionHead}>
          <p className="eyebrow" data-reveal>{copy.areas.eyebrow}</p>
          <h2 id="areas-heading" data-reveal="words">
            <SplitWords text={copy.areas.heading} />
          </h2>
          <p className={styles.sectionIntro} data-reveal>{copy.areas.intro}</p>
        </header>

        <ul className={styles.areaList}>
          {copy.areas.items.map((item, i) => (
            <li key={item.title} className={styles.areaCard} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <span className={styles.areaIndex} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
