# Inner Doorways — Dhriti Singh

Next.js (App Router) + TypeScript. The 3D hero atmosphere uses three.js via @react-three/fiber.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Things to supply before launch

| What | Where |
| --- | --- |
| Dhriti's photograph | Save as `public/images/dhriti-singh.jpg`. It replaces the placeholder automatically. Portrait orientation works best, about 1600px tall. |
| Booking link and/or email | `site.booking.url` / `site.booking.email` in `src/content/site.ts`. Until then, "Book a Session" opens WhatsApp (`site.whatsapp`) with a short pre-filled message, and Contact opens WhatsApp. |
| Music (optional) | On by default: it fades in on the visitor's first click, tap or key press (browsers block sound before that). The *Sitar ambience* button turns it off, and that choice is remembered. Set `site.music.autoplay` to `false` to make it opt-in. By default the music is generated live in the browser (`src/lib/sitarAmbience.ts`). To use a licensed recording, put it in `public/audio/` and set `site.music.src`. |
| Instagram posts | Add entries to `instagramPosts` in `src/content/site.ts` (up to 6). |
| Copy review | All text is in `src/content/site.ts`. Sections marked `PLACEHOLDER` are starter copy for Dhriti to review. |

## Portrait component

```tsx
<DhritiPortrait
  variant="hero"            // "hero" | "about" | "mobile" | "editorial"
  src="/images/dhriti-singh.jpg"
  alt="Dhriti Singh, RCI Licensed Psychologist"
  tone="color"              // or "grayscale"
  objectPosition={{ mobile: "50% 20%", desktop: "50% 30%" }}
/>
```

Each variant sets its own shape and aspect ratio, so pages only control the width. If the file is missing or fails to load, the designed placeholder shows in the same frame.

## 3D and performance

The hero scene loads only on screens wider than 900px, after the page becomes interactive. It pauses when scrolled out of view, stays still for visitors who prefer reduced motion, and is skipped on Data Saver connections. Smaller screens get a static botanical illustration instead.

## Motion

Each headline word fades in from a soft blur, and the hero portrait opens upward like a doorway. Blurred leaf shadows drift across the hero, and a single 3D leaf falls now and then. Section headings reveal one word at a time. The interlude arch draws itself in, warm glows breathe on a slow ~10s cycle, and the step badges fill from the bottom. Scroll-linked effects (the hero easing back, the About portrait drifting, the booking archway widening) use CSS scroll-driven animations. Browsers that don't support them just show the page without those effects. All motion is turned off when a visitor has reduced motion enabled.
