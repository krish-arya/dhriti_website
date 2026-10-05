/**
 * Site content & configuration.
 *
 * All copy on the website lives here so it can be edited without touching
 * layout code. Copy marked "PLACEHOLDER" is editable starter text — it should
 * be reviewed by Dhriti before launch. Nothing here should state methods,
 * years of experience, research topics or clinical claims that she has not
 * confirmed.
 */

export const site = {
  brand: "Inner Doorways",
  name: "Dhriti Singh",

  /** Short credentials, used in the hero, footer and metadata. */
  credentials: ["RCI Licensed Psychologist", "PhD Researcher", "Psychologist at MSIT"],

  instagram: {
    handle: "@innerdoorways",
    url: "https://www.instagram.com/innerdoorways/",
    /** Opens a direct message thread with the account. */
    dm: "https://ig.me/m/innerdoorways",
  },

  /**
   * Portrait. Drop the real photograph at /public/images/dhriti-singh.jpg and
   * it replaces the placeholder automatically — no layout changes needed.
   * Set `src` to null to force the placeholder.
   */
  portrait: {
    src: "/images/dhriti-singh.jpg" as string | null,
    alt: "Dhriti Singh, RCI Licensed Psychologist",
  },

  whatsapp: {
    number: "918882743725",
    display: "+91 88827 43725",
  },

  /**
   * Booking & contact. Without a scheduling link or email, booking and contact
   * go to WhatsApp. Add a scheduling link (Calendly, Google Form, practice
   * software…) and/or an email address to switch over.
   */
  booking: {
    url: null as string | null,
    email: null as string | null,
  },

  /**
   * Background music. With `autoplay`, it fades in on the visitor's first
   * click, tap or key press (browsers don't allow sound before that). The
   * button turns it off, and that choice is remembered on their device.
   * With `src` null, a slow sitar & tanpura piece is generated live in the
   * browser. To use a licensed recording instead, place it in /public/audio/
   * and set e.g. src: "/audio/ambience.mp3" (it will loop).
   */
  music: {
    autoplay: true,
    src: null as string | null,
    label: "Sitar ambience",
    volume: 0.5,
  },
};

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${site.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function bookingHref() {
  if (site.booking.url) return site.booking.url;
  if (site.booking.email) return `mailto:${site.booking.email}?subject=${encodeURIComponent("Booking a session")}`;
  return whatsappHref("Hi Dhriti, I'd like to book a session.");
}

export function contactHref() {
  if (site.booking.email) return `mailto:${site.booking.email}`;
  return whatsappHref();
}

export const copy = {
  hero: {
    eyebrow: "Inner Doorways",
    lines: ["A space to pause.", "A space to understand.", "A space to grow."],
    cta: "Book a Session",
  },

  about: {
    eyebrow: "Meet Dhriti",
    heading: "Making space for what is within.",
    // PLACEHOLDER — editable
    paragraphs: [
      "Dhriti Singh is an RCI Licensed Psychologist, currently pursuing her PhD and working as a psychologist at Maharaja Surajmal Institute of Technology.",
      "Her work creates a thoughtful, non-judgmental space for individuals navigating questions around relationships, identity, career, childhood and personal growth.",
    ],
  },

  areas: {
    eyebrow: "What we can explore",
    heading: "There is no single doorway into understanding yourself.",
    // PLACEHOLDER — editable descriptions
    items: [
      { title: "Relationships", text: "The ways we connect, drift apart and find our way back to the people who matter." },
      { title: "Identity", text: "Questions of who you are, who you are becoming, and what feels true to you." },
      { title: "Career", text: "Pressure, direction, doubt — and the search for work that feels like your own." },
      { title: "Childhood", text: "Understanding how earlier experiences may still be shaping the present." },
      { title: "Personal growth", text: "Steady, unhurried work towards a life that feels more like yours." },
    ],
  },

  sessions: {
    eyebrow: "How it begins",
    heading: "Opening a conversation.",
    // PLACEHOLDER — editable
    steps: [
      { title: "Reach out", text: "Send a message whenever you feel ready. A few words are enough — you don't need to have it all figured out." },
      { title: "A first conversation", text: "A relaxed space to talk about what is bringing you here, and to see whether working together feels right." },
      { title: "At your own pace", text: "From there, sessions move at a pace that feels manageable for you." },
    ],
  },

  interlude: "Sometimes the way forward begins by looking inward.",

  booking: {
    eyebrow: "Book a session",
    heading: "Whenever you're ready, the door is open.",
    // PLACEHOLDER — editable
    text: "You don't need the right words to begin. Share as much or as little as you like, and Dhriti will get back to you to find a time.",
    reassurances: ["No pressure to explain everything at once", "Questions before booking are welcome", "Reply with next steps and availability"],
    cta: "Book a Session",
    secondary: "Message on Instagram",
    crisis: {
      heading: "If you need urgent support",
      text: "This website is not an emergency service. If you are in immediate danger, call 112. For free, 24×7 mental health support in India, call Tele-MANAS on 14416.",
    },
  },

  instagram: {
    eyebrow: "From Inner Doorways",
    heading: "Small reflections, shared along the way.",
    cta: "Follow Inner Doorways",
  },
};

/**
 * Instagram tiles. Add posts manually (or from a feed integration) and they
 * replace the placeholders. Leave empty to show the designed placeholders.
 */
export type InstagramPost = {
  href: string;
  image: string;
  alt: string;
  kind?: "post" | "quote" | "educational" | "photograph" | "reflection";
};

export const instagramPosts: InstagramPost[] = [];
