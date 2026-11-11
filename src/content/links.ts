/**
 * Every outbound project URL lives here. An empty value hides that button on the card,
 * so a link can be dropped in later without touching any component.
 */
export const PROJECT_URLS: Record<string, string> = {
  creatorScoutLive: "https://creator-scout-chi.vercel.app",
  creatorScoutCode: "https://github.com/koredeBNB/creator-scout",
  reviewRadarLive: "https://competitor-review-radar.vercel.app",
  reviewRadarCode: "https://github.com/koredeBNB/competitor-review-radar",
  kiokuLive: "https://kioku.vercel.app",
  kiokuCode: "https://github.com/koredeBNB/kikou",
  saffLive: "https://saff-khutbah.vercel.app",
};

export const CONTACT_EMAIL = "koredeodubanjo1@gmail.com";

/** The site's own address, used for metadata and link previews. */
export const SITE_URL = "https://korede-odubanjo.vercel.app";

/** The first production domain. Links to it were already shared, so it redirects to `SITE_URL`. */
export const LEGACY_SITE_HOST = "portfolio-red-iota-81.vercel.app";
