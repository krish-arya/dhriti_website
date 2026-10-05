import { bookingHref, copy, site, whatsappHref } from "@/content/site";
import { external } from "./shared";
import SplitWords from "./SplitWords";
import styles from "./Sections.module.css";

export default function Booking() {
  const book = bookingHref();

  return (
    <section id="book" className={styles.booking} aria-labelledby="book-heading">
      <div className={styles.bookingThreshold} aria-hidden="true" />
      <div className={`container ${styles.bookingInner}`}>
        <p className="eyebrow eyebrow--light" data-reveal>{copy.booking.eyebrow}</p>
        <h2 id="book-heading" data-reveal="words">
          <SplitWords text={copy.booking.heading} step={90} />
        </h2>
        <p className={styles.bookingText} data-reveal>{copy.booking.text}</p>

        <ul className={styles.reassurances} data-reveal>
          {copy.booking.reassurances.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        <div className={styles.bookingActions} data-reveal>
          <a className="button button--light" href={book} target={external(book)} rel="noopener noreferrer">
            {copy.booking.cta} <span aria-hidden="true">→</span>
          </a>
          <a className="link-quiet link-quiet--light" href={site.instagram.dm} target="_blank" rel="noopener noreferrer">
            {copy.booking.secondary}
          </a>
        </div>
        {!site.booking.url && !site.booking.email && (
          <p className={styles.bookingNote} data-reveal>
            Booking requests are received on WhatsApp at{" "}
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
              {site.whatsapp.display}
            </a>
            .
          </p>
        )}

        <aside className={styles.crisis} aria-labelledby="crisis-heading">
          <h3 id="crisis-heading">{copy.booking.crisis.heading}</h3>
          <p>{copy.booking.crisis.text}</p>
        </aside>
      </div>
    </section>
  );
}
