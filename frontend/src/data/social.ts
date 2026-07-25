/** Official social platforms of Banani Clinic — shared by the Home page
 *  "Social Activities" section and the Footer. */

export const YOUTUBE_HANDLE = "@BananiClinicDentalMaxillofacia";
export const YOUTUBE_CHANNEL_URL =
  "https://www.youtube.com/@BananiClinicDentalMaxillofacia";

/**
 * Uploads playlist of the channel (channel id UCd1MWKZkDUlwD0mARXATbxA with the
 * leading `UC` swapped for `UU`). Embedding the playlist instead of a fixed
 * video keeps the section showing the newest upload with no code changes.
 */
export const YOUTUBE_UPLOADS_EMBED =
  "https://www.youtube.com/embed/videoseries?list=UUd1MWKZkDUlwD0mARXATbxA";

export const FACEBOOK_PAGE_HANDLE = "@bananiclinic";
export const FACEBOOK_PAGE_URL = "https://www.facebook.com/bananiclinic";

/** Keyless Facebook Page plugin — renders the page timeline in an iframe. */
export const FACEBOOK_PAGE_EMBED = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  FACEBOOK_PAGE_URL,
)}&tabs=timeline&width=500&height=640&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;
