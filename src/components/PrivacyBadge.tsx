import { privacyShort } from "@/content/testimonials";
import styles from "./StoriesRibbon.module.css";

/** Small reassurance that client identities are protected. */
export default function PrivacyBadge({ className }: { className?: string }) {
  return (
    <p className={`${styles.privacy} ${className ?? ""}`}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {privacyShort}
    </p>
  );
}
