import Image from "next/image";
import { copy, whatsappHref } from "@/content/site";
import styles from "./Sections.module.css";

export default function Workshops() {
  const href = whatsappHref("Hi Dhriti, I'd like to invite you for a mental health workshop.");
  return (
    <section className={`section ${styles.offerings}`} aria-label="Past workshops">
      <div className="container">
        <div className={styles.workshops}>
          {copy.offerings.workshops.map((w, i) => (
            <figure key={w.src} className={styles.workshop} data-reveal style={{ transitionDelay: `${i * 120}ms` }}>
              <div className={styles.workshopImage}>
                <Image src={w.src} alt={w.alt} fill sizes="(max-width: 900px) 92vw, 46vw" />
              </div>
              {w.caption && <figcaption>{w.caption}</figcaption>}
            </figure>
          ))}
        </div>

        <div className={styles.inviteBox} data-reveal>
          <div>
            <h2>Invite Dhriti to your school, college or organisation</h2>
            <p>Talks and interactive sessions on emotional well-being, stress, adjustment and more, shaped around your group.</p>
          </div>
          <a className="button" href={href} target="_blank" rel="noopener noreferrer">
            Enquire on WhatsApp <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
