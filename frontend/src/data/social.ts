/** Official social platforms of Banani Clinic — shared by the Home page
 *  "Social Activities" section and the Footer. */

export const YOUTUBE_HANDLE = "@BananiClinicDentalMaxillofacia";
export const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/@BananiClinicDentalMaxillofacia";

export interface FeaturedVideo {
  id: string;
  title: string;
  /** Seconds to skip before playback starts, when the client asked for one. */
  start?: number;
}

/** The two videos the clinic wants featured, shown stacked in the YouTube card.
 *  Swap an id here to feature a different video — no other edits needed. */
export const FEATURED_VIDEOS: FeaturedVideo[] = [
  {
    id: "p4lb1A6D0Ww",
    title:
      "Discussion meeting of Bangladesh Citizen Party (BCP) — Assoc. Prof. Dr. Aslam Almehdi",
    start: 6,
  },
  {
    id: "ccxBdj7KwWY",
    title: "বাংলাদেশ সিটিজেন পার্টি (বিসিপি)'র সংক্ষিপ্ত পরিচিতি",
  },
];

export function youtubeEmbedSrc({ id, start }: FeaturedVideo) {
  const params = new URLSearchParams({ rel: "0" });
  if (start) params.set("start", String(start));
  return `https://www.youtube.com/embed/${id}?${params}`;
}

export const FACEBOOK_PAGE_HANDLE = "@bananiclinic";
export const FACEBOOK_PAGE_URL = "https://www.facebook.com/bananiclinic";

/** Height of the Facebook timeline embed. Passed to the plugin *and* used for
 *  the iframe box so the plugin scrolls its own posts instead of being cut off,
 *  and so the card lines up with the two stacked videos beside it. */
export const FACEBOOK_EMBED_HEIGHT = 580;

/** Keyless Facebook Page plugin — renders the page timeline in an iframe. */
export const FACEBOOK_PAGE_EMBED = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  FACEBOOK_PAGE_URL,
)}&tabs=timeline&width=500&height=${FACEBOOK_EMBED_HEIGHT}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;
