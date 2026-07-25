import { ArrowRight, Facebook, Youtube } from "lucide-react";
import {
  FACEBOOK_PAGE_EMBED,
  FACEBOOK_PAGE_HANDLE,
  FACEBOOK_PAGE_URL,
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_HANDLE,
  YOUTUBE_UPLOADS_EMBED,
} from "../data/social";

type Platform = {
  name: string;
  handle: string;
  url: string;
  cta: string;
  brand: string;
  icon: JSX.Element;
  blurb: string;
};

const platforms: Platform[] = [
  {
    name: "YouTube",
    handle: YOUTUBE_HANDLE,
    url: YOUTUBE_CHANNEL_URL,
    cta: "Subscribe on YouTube",
    brand: "#FF0000",
    icon: <Youtube size={22} />,
    blurb:
      "Surgical demonstrations, treatment explainers, and patient awareness videos on oral & maxillofacial care.",
  },
  {
    name: "Facebook",
    handle: FACEBOOK_PAGE_HANDLE,
    url: FACEBOOK_PAGE_URL,
    cta: "Follow on Facebook",
    brand: "#1877F2",
    icon: <Facebook size={22} />,
    blurb:
      "Clinic updates, free dental camps, awareness campaigns, and day-to-day activities from our chambers.",
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
      <div className="flex items-center gap-3 p-5">
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
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto hidden flex-shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 sm:inline-flex"
          style={{ backgroundColor: platform.brand }}
        >
          {platform.cta}
        </a>
      </div>

      {children}

      <div className="p-5">
        <p className="mb-4 text-sm leading-relaxed text-gray-600">
          {platform.blurb}
        </p>
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
        background: "linear-gradient(135deg, #0F2238 0%, #1A3A5C 55%, #2B7CC1 100%)",
      }}
      aria-labelledby="social-activities-heading"
    >
      <div className="container-custom">
        <div className="mb-10 text-center md:mb-12">
          <span
            className="badge mb-3 border border-white/30"
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
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={YOUTUBE_UPLOADS_EMBED}
                title="Banani Clinic Dental & Maxillofacial Surgery on YouTube"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </PlatformCard>

          <PlatformCard platform={facebook}>
            {/* The Facebook page plugin renders at a fixed width, so it is
                centered inside the card and clipped to match the video height. */}
            <div className="flex h-[280px] w-full justify-center overflow-hidden bg-gray-50 sm:h-[315px]">
              <iframe
                src={FACEBOOK_PAGE_EMBED}
                title="Banani Clinic on Facebook"
                className="h-[640px] w-full max-w-[500px]"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
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
