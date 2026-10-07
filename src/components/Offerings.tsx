import Image from "next/image";
import { copy, site } from "@/content/site";
import SplitWords from "./SplitWords";
import styles from "./Sections.module.css";

export default function Offerings() {
  const o = copy.offerings;
  return (
    <section id="offerings" className={`section ${styles.offerings}`} aria-labelledby="offerings-heading">
      <div className="container">
        <header className={styles.sectionHead}>
          <p className="eyebrow" data-reveal>{o.eyebrow}</p>
          <h2 id="offerings-heading" data-reveal="words">
            <SplitWords text={o.heading} />
          </h2>
          <p className={styles.sectionIntro} data-reveal>{o.intro}</p>
        </header>

        <ul className={styles.offerList}>
          {o.items.map((item, i) => (
            <li key={item.title} className={styles.offer} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {i === 2 && (
                <a className="link-quiet" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                  {site.instagram.handle} <span aria-hidden="true">→</span>
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.workshops}>
          {o.workshops.map((w, i) => (
            <figure key={w.src} className={styles.workshop} data-reveal style={{ transitionDelay: `${i * 120}ms` }}>
              <div className={styles.workshopImage}>
                <Image src={w.src} alt={w.alt} fill sizes="(max-width: 900px) 92vw, 46vw" />
              </div>
              {w.caption && <figcaption>{w.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
