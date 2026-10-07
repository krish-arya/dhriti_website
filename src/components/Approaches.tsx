import Image from "next/image";
import { copy, site } from "@/content/site";
import SplitWords from "./SplitWords";
import styles from "./Sections.module.css";

/** Small hand-drawn marks, one per modality. */
const marks = [
  // art therapy — brush stroke
  "M8 32c6-2 10-8 14-14s8-10 14-10M10 34c2 0 4-1 5-3",
  // mindfulness — ripples
  "M6 22h28M10 16c3-3 7-4 10-4s7 1 10 4M10 28c3 3 7 4 10 4s7-1 10-4",
  // DBT — balance
  "M20 6v28M8 14h24M8 14l-4 10h8zM32 14l-4 10h8z",
  // CBT — loop
  "M12 20a8 8 0 1 1 8 8M20 28l-3-3M20 28l-3 3",
  // play — blocks
  "M6 34V24h10v10zM16 34V20h10v14zM11 24l5-8 5 8",
  // child & adolescent — sprout
  "M20 34V18M20 22c-6 0-10-4-10-10 6 0 10 4 10 10zM20 18c0-5 4-9 9-9 0 5-4 9-9 9z",
];

export default function Approaches() {
  return (
    <section id="expertise" className={styles.approaches} aria-labelledby="approaches-heading">
      <div className={`container ${styles.approachesInner}`}>
        {/* Heading + list in one column, photo beside the whole block */}
        <div className={styles.approachesContent}>
          <header className={styles.sectionHead}>
            <p className="eyebrow eyebrow--light" data-reveal>{copy.approaches.eyebrow}</p>
            <h2 id="approaches-heading" data-reveal="words">
              <SplitWords text={copy.approaches.heading} />
            </h2>
          </header>

          <ul className={styles.approachList}>
            {copy.approaches.items.map((item, i) => (
              <li key={item.title} className={styles.approach} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <path d={marks[i % marks.length]} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <figure className={styles.artPhoto} data-reveal>
          <div className={styles.artPhotoFrame}>
            <Image src={site.photos.artTherapy.src} alt={site.photos.artTherapy.alt} fill sizes="(max-width: 900px) 80vw, 30vw" />
          </div>
          <figcaption>{site.photos.artTherapy.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
