import { ArrowRight, Facebook, Youtube } from "lucide-react";
import {
  FACEBOOK_EMBED_HEIGHT,
  FACEBOOK_PAGE_EMBED,
  FACEBOOK_PAGE_HANDLE,
  FACEBOOK_PAGE_URL,
  FEATURED_VIDEOS,
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_HANDLE,
  youtubeEmbedSrc,
} from "../data/social";

type Platform = {
  name: string;
  handle: string;
  url: string;
  cta: string;
  brand: string;
  icon: JSX.Element;
};

const platforms: Platform[] = [
  {
    name: "YouTube",
    handle: YOUTUBE_HANDLE,
    url: YOUTUBE_CHANNEL_URL,
    cta: "Subscribe on YouTube",
    brand: "#FF0000",
    icon: <Youtube size={22} />,
  },
  {
    name: "Facebook",
    handle: FACEBOOK_PAGE_HANDLE,
    url: FACEBOOK_PAGE_URL,
    cta: "Follow on Facebook",
    brand: "#1877F2",
    icon: <Facebook size={22} />,
  },
];

function PlatformCard({
  platform,
  children,
}: {
  platform: Platform;
  children: React.ReactNode;
}) {
  return (
    <div className="fade-in flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="flex items-center gap-3 p-4 md:p-5">
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-white"
          style={{ backgroundColor: platform.brand }}
        >
          {platform.icon}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-base" style={{ color: "#1A3A5C" }}>
            {platform.name}
          </div>
          <div className="truncate text-xs text-gray-500">
            {platform.handle}
          </div>
        </div>
      </div>

      <div className="flex-1">{children}</div>

      <div className="p-4 md:p-5">
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: platform.brand }}
        >
          {platform.cta} <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}

export default function SocialActivities() {
  const [youtube, facebook] = platforms;

  return (
    <section
      className="py-14 md:py-20"
      style={{
        background:
          "linear-gradient(135deg, #0F2238 0%, #1A3A5C 55%, #2B7CC1 100%)",
      }}
      aria-labelledby="social-activities-heading"
    >
      <div className="container-custom">
        <div className="mb-10 text-center md:mb-12">
          <span
            className="badge mb-3 px-4 py-1.5 text-sm md:text-base border border-white/30"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#bfdbfe" }}
          >
            Social Activities
          </span>
          <h2
            id="social-activities-heading"
            className="fade-in text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl"
          >
            Social Activities of Oral & Maxillofacial Surgery
          </h2>
          <p
            className="section-subtitle fade-in mx-auto max-w-2xl px-4"
            style={{ color: "#bfdbfe" }}
          >
            Follow our awareness work, surgical demonstrations, and clinic
            activities on YouTube and Facebook.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <PlatformCard platform={youtube}>
            {/* Two featured videos, stacked. Capped at the same 500px the
                Facebook plugin renders at so both cards stay the same size. */}
            <div className="mx-auto w-full max-w-[500px] space-y-3 px-4 md:px-5">
              {FEATURED_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="relative aspect-video w-full overflow-hidden rounded-xl bg-black"
                >
                  <iframe
                    src={youtubeEmbedSrc(video)}
                    title={video.title}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </PlatformCard>

          <PlatformCard platform={facebook}>
            {/* The page plugin renders at a fixed 500px width, so it is centered
                inside the card. The box is as tall as the plugin itself, which
                lets the timeline scroll through its posts instead of clipping. */}
            <div className="flex w-full justify-center px-4 md:px-5">
              <iframe
                src={FACEBOOK_PAGE_EMBED}
                title="Banani Clinic on Facebook"
                className="w-full max-w-[500px] overflow-hidden rounded-xl"
                style={{ border: "none", height: FACEBOOK_EMBED_HEIGHT }}
                allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
              />
            </div>
          </PlatformCard>
        </div>
      </div>
    </section>
  );
}
