import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * AI crawlers that read sites to train models or to answer questions in AI
 * search/chat. Blocked so the site isn't used by generative engines, while
 * normal search engines (Googlebot, Bingbot) can still index it.
 * Note: robots.txt is a request — reputable crawlers honour it, it isn't a lock.
 */
const AI_CRAWLERS = [
  // OpenAI / ChatGPT
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic / Claude
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google Gemini & AI training (does not affect Google Search)
  "Google-Extended",
  // Apple Intelligence training (does not affect Apple search)
  "Applebot-Extended",
  // Meta AI
  "meta-externalagent",
  "FacebookBot",
  // Others
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "Diffbot",
  "YouBot",
  "DuckAssistBot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_CRAWLERS, disallow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
