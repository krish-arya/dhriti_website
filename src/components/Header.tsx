"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { bookingHref, site } from "@/content/site";
import { BrandMark, external } from "./shared";
import styles from "./Header.module.css";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/workshops", label: "Workshops" },
  { href: "/stories", label: "Stories" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header} data-scrolled={scrolled} data-open={open}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <BrandMark />
          <span>{site.brand}</span>
        </Link>

        <nav className={styles.nav} aria-label="Main">
          <ul id="site-menu" className={styles.links}>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={pathname === l.href ? "page" : undefined} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li className={styles.menuCta}>
              <a className="button" href={bookingHref()} target={external(bookingHref())} rel="noopener noreferrer">
                Book a Session
              </a>
            </li>
          </ul>
        </nav>

        <a className={`button button--small ${styles.cta}`} href={bookingHref()} target={external(bookingHref())} rel="noopener noreferrer">
          Book a Session
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className={styles.toggleLines} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
