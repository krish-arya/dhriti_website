/**
 * Site content & configuration.
 *
 * All copy on the website lives here so it can be edited without touching
 * layout code. Biography, credentials, expertise, taglines and offerings come
 * from material supplied by Dhriti. Lines marked "SITE COPY" were written for
 * the website (short descriptions, section intros) and are worth a quick
 * review by her.
 */

export const site = {
  brand: "Inner Doorways",
  name: "Dhriti Singh",

  /** Public address of the site. Change this when a custom domain is connected. */
  url: "https://dhriti-website.vercel.app",
  location: { city: "Delhi", region: "Delhi", country: "IN" },
  /** How sessions are offered — shown on the site and given to search engines. */
  sessionMode: "Online sessions · Based in Delhi",

  /** Short credentials, used in the hero, footer and metadata. */
  credentials: ["RCI Licensed Psychologist", "Certified Art Therapist", "PhD Scholar", "Psychologist at MSIT"],

  /** Full qualifications, shown in the About section. */
  qualifications: [
    { label: "RCI Licensed Psychologist", detail: "CRR No. B129294" },
    { label: "Certified Art Therapist" },
    { label: "PhD Scholar" },
    { label: "M.A. Clinical Psychology" },
    { label: "B.A. Psychology" },
    { label: "Psychologist", detail: "Maharaja Surajmal Institute of Technology" },
  ],
  practisingSince: 2022,
  rciNumber: "B129294",

  instagram: {
    handle: "@innerdoorways",
    url: "https://www.instagram.com/innerdoorways/",
    /** Opens a direct message thread with the account. */
    dm: "https://ig.me/m/innerdoorways",
  },

  /** Photographs. Each is optional — remove a src to show the designed placeholder. */
  portrait: {
    src: "/images/dhriti-singh.jpg" as string | null,
    alt: "Dhriti Singh, RCI Licensed Psychologist, smiling in a white floral outfit beside an olive tree",
  },
  photos: {
    about: {
      src: "/images/dhriti-singh-about.jpg",
      alt: "Portrait of Dhriti Singh at Maharaja Surajmal Institute of Technology",
    },
    welcome: {
      src: "/images/dhriti-campus.jpg",
      alt: "Dhriti Singh standing on a green college campus",
    },
    artTherapy: {
      src: "/images/art-therapy.jpg",
      alt: "Dhriti Singh smiling at a hand-painted peacock coaster beside a table of paints",
      caption: "In the art space",
    },
    sessions: {
      src: "/images/dhriti-cafe.jpg",
      alt: "Dhriti Singh in a navy saree in a warm, softly lit café",
    },
  },

  whatsapp: {
    number: "918882743725",
    display: "+91 88827 43725",
  },

  /** Shown as a contact option. Booking itself goes to WhatsApp unless `booking.url` is set. */
  email: "dhritisingh2021@gmail.com",

  /**
   * Booking. Without a scheduling link, "Book a Session" opens WhatsApp with
   * a short pre-filled message. Add a scheduling link (Calendly, Google Form,
   * practice software…) to switch over.
   */
  booking: {
    url: null as string | null,
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
  return whatsappHref("Hi Dhriti, I'd like to book a session.");
}

export function contactHref() {
  return whatsappHref();
}

export function emailHref() {
  return `mailto:${site.email}`;
}

export const copy = {
  hero: {
    eyebrow: "Inner Doorways",
    lines: ["A space to pause.", "A space to understand.", "A space to grow."],
    tagline: "Where calmness meets clarity — a journey toward inner peace and positive living.",
    cta: "Book a Session",
  },

  welcome: {
    eyebrow: "A note before you begin",
    greeting: "Hello, and welcome to Inner Doorways. 🤍",
    paragraphs: [
      "We know that life isn't always easy. Some days are heavy. Some emotions are hard to explain. And sometimes, all we really need is a space where we don't have to pretend we're okay.",
      "That's why we created Inner Doorways. A place where you're listened to without judgment, understood with compassion, and supported at your own pace.",
      "Here's to choosing healing over hiding, growth over fear, and kindness toward ourselves.",
    ],
    closing: "The door is open. Step in whenever you're ready.",
  },

  about: {
    eyebrow: "Meet Dhriti",
    heading: "Hi, I'm Dhriti.",
    lead: "Life doesn't always need fixing — sometimes it simply needs understanding. I strive to create a space where you feel heard without judgment, understood without assumptions, and supported as you discover what healing looks like for you.",
    paragraphs: [
      "As an RCI-licensed psychologist, I am deeply committed to fostering mental wellness across the lifespan, with a specialised focus on adult emotional regulation and child development, along with expertise in diagnostic screening. My professional journey is rooted in helping individuals navigate life transitions, manage stress, and cultivate personal growth through evidence-based and mindfulness-oriented approaches.",
      "With expertise in developmental and behavioural concerns, learning disabilities, and emotional regulation challenges, I integrate therapeutic modalities such as play therapy and expressive arts therapy to create safe, creative, and empowering spaces for healing. I am passionate about nurturing the mental well-being of children, adolescents, and adults alike, and my practice is guided by the belief that every step taken toward inner peace begins with calmness, clarity, and compassionate connection.",
    ],
    qualificationsHeading: "Qualifications",
  },

  areas: {
    eyebrow: "Who I work with",
    heading: "There is no single doorway into understanding yourself.",
    intro: "Support for children, adolescents and adults.", // SITE COPY
    // Areas are drawn from Dhriti's biography; the one-line descriptions are SITE COPY.
    items: [
      { title: "Emotional regulation", text: "Understanding and steadying emotions that feel overwhelming or hard to name." },
      { title: "Stress & life transitions", text: "Finding your footing through change, pressure and uncertainty." },
      { title: "Personal growth", text: "Building calm, clarity and a kinder relationship with yourself." },
      { title: "Child development", text: "Nurturing children's emotional and developmental needs through play and creative expression." },
      { title: "Developmental & learning concerns", text: "Behavioural concerns and learning disabilities, with diagnostic screening where it helps." },
      { title: "Adolescents", text: "A safe space for young people navigating emotions and the pressures of growing up." },
    ],
  },

  approaches: {
    eyebrow: "Expertise",
    heading: "Evidence-based care, with room for creativity.",
    // Modalities as listed by Dhriti; the one-line explanations are SITE COPY.
    items: [
      { title: "Art Therapy", text: "Using creative expression to explore what can be hard to put into words." },
      { title: "Mindfulness-Based Therapy", text: "Learning to meet thoughts and feelings with calm, present-moment awareness." },
      { title: "Dialectical Behaviour Therapy", text: "Skills for managing intense emotions, distress and relationships." },
      { title: "Cognitive Behavioural Therapy", text: "Noticing and gently reshaping unhelpful patterns of thinking and behaviour." },
      { title: "Play Therapy for Children", text: "Play is a child's natural language — a safe way to express and process feelings." },
      { title: "Child & Adolescent Psychotherapy", text: "Therapy shaped around the developmental needs of children and teens." },
    ],
  },

  interlude: "Empowering minds to heal and grow — through calmness, clarity, and a deep connection to inner peace.",

  offerings: {
    eyebrow: "Offerings",
    heading: "One step closer to inner peace.",
    intro:
      "Helping individuals find calm, clarity, and emotional balance through mindful and expressive therapies — and supporting children's growth through play-based approaches and creative expression.",
    items: [
      { title: "Therapy Sessions", text: "One-to-one support for children, adolescents and adults, at a pace that feels right for you." }, // SITE COPY
      { title: "Mental Health Workshops", text: "Sessions for schools, colleges and groups on emotional well-being and adjustment." }, // SITE COPY
      { title: "Psychological Resources", text: "Reflections and practical guidance, shared regularly on Instagram." }, // SITE COPY
    ],
    workshops: [
      {
        src: "/images/workshop-college.jpg",
        alt: "Dhriti Singh presenting a talk on college adjustment to a room of students",
        caption: "Understanding College Adjustment — a talk for students",
      },
      {
        src: "/images/workshop-school.jpg",
        alt: "Dhriti Singh at the Peer Educator Programme, Kamal Model Senior Secondary School, New Delhi",
        caption: "Peer Educator Programme · Kamal Model Sr. Sec. School, New Delhi · Dec 2025",
      },
    ],
  },

  sessions: {
    eyebrow: "How it begins",
    heading: "Opening a conversation.",
    // SITE COPY
    steps: [
      { title: "Reach out", text: "Send a message whenever you feel ready. A few words are enough — you don't need to have it all figured out." },
      { title: "A first conversation", text: "A relaxed space to talk about what is bringing you here, and to see whether working together feels right." },
      { title: "At your own pace", text: "From there, sessions move at a pace that feels manageable for you." },
    ],
  },

  booking: {
    eyebrow: "Book a session",
    heading: "Whenever you're ready, the door is open.",
    text: "You don't need the right words to begin. Share as much or as little as you like, and Dhriti will get back to you to find a time.",
    reassurances: ["Online sessions, wherever you are", "No pressure to explain everything at once", "For children, adolescents and adults"],
    cta: "Book on WhatsApp",
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
  kind?: "post" | "quote" | "educational" | "photograph" | "reflection" | "reel";
};

export const instagramPosts: InstagramPost[] = [
  {
    href: "https://www.instagram.com/p/DbqYK5vkW7Z/",
    image: "/images/instagram/safe-place.jpg",
    alt: "Inner Doorways post: Sometimes, you don't need advice. You need a safe place to be heard.",
    kind: "quote",
  },
  {
    href: "https://www.instagram.com/p/Dcv5tRapehU/",
    image: "/images/instagram/first-session.jpg",
    alt: "Reel: Dhriti Singh explains what happens in your first therapy session",
    kind: "reel",
  },
  {
    href: "https://www.instagram.com/p/DcqbbwapXW0/",
    image: "/images/instagram/change-your-thoughts.jpg",
    alt: "Inner Doorways post: Change your thoughts, change your story — six gentle reframes for unhelpful thoughts",
    kind: "educational",
  },
  {
    href: "https://www.instagram.com/p/DcVwKFBRhup/",
    image: "/images/instagram/how-therapy-works.jpg",
    alt: "Inner Doorways post: how people think therapy works, a straight line, versus how it actually works, with ups and downs",
    kind: "educational",
  },
  {
    href: "https://www.instagram.com/p/DeKdK5YzLl6/",
    image: "/images/instagram/anxiety-toolkit.jpg",
    alt: "Inner Doorways post: Anxiety toolkit — eight ways to support a child with anxiety",
    kind: "educational",
  },
  {
    href: "https://www.instagram.com/p/Db8DwyVpnoi/",
    image: "/images/instagram/hi-im-dhriti.jpg",
    alt: "Reel: Dhriti Singh introduces herself — Hi, I'm Dhriti Singh",
    kind: "reel",
  },
];
