import { bookingHref, contactHref, emailHref, site, whatsappHref } from "@/content/site";
import { BrandMark, external } from "./shared";
import styles from "./Sections.module.css";

export default function Footer() {
  const book = bookingHref();
  const contact = contactHref();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <p className={styles.footerLogo}>
          <BrandMark /> {site.brand}
        </p>

        <div className={styles.footerPerson}>
          <p className={styles.footerName}>{site.name}</p>
          {site.credentials.map((c) => (
            <p key={c}>{c}</p>
          ))}
          <p>RCI CRR No. {site.rciNumber}</p>
        </div>

        <nav aria-label="Footer">
          <ul className={styles.footerLinks}>
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            <li>
              <a href={book} target={external(book)} rel="noopener noreferrer">Book a Session</a>
            </li>
            <li>
              <a href={contact} target={external(contact)} rel="noopener noreferrer">Contact</a>
            </li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                WhatsApp · {site.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={emailHref()}>{site.email}</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className={`container ${styles.footerBase}`}>
        <p>
          © {new Date().getFullYear()} {site.brand} · {site.name}
        </p>
        <p>Not an emergency service. In India, call 112 or Tele-MANAS on 14416.</p>
      </div>
    </footer>
  );
}
