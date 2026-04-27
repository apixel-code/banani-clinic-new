import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../lib/api";
import { buildTitle } from "../utils/seoHelpers";

const CATS = ["All", "Before & After", "Clinic", "Team", "Procedures"];

interface GalleryImage {
  id: string;
  _id?: string;
  url: string;
  caption: string;
  category: string;
  alt_text: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api
      .getGalleryImages()
      .then((data) => {
        setImages(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!ref.current || loading) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    ref.current
      .querySelectorAll(".fade-in")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [images, cat, loading]);

  const filtered =
    cat === "All" ? images : images.filter((img) => img.category === cat);

  const navigate = useCallback(
    (dir: number) => {
      setLightbox((prev) => {
        if (prev === null) return null;
        return (prev + dir + filtered.length) % filtered.length;
      });
    },
    [filtered.length],
  );

  useEffect(() => {
    if (lightbox === null) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, navigate]);

  return (
    <>
      <Helmet>
        <title>{buildTitle("Gallery – Before & After & Clinic Photos")}</title>
        <meta
          name="description"
          content="Browse the Banani Clinic photo gallery. See real before & after transformations, clinic facilities, team photos, and treatment results."
        />
      </Helmet>

      <div ref={ref}>
        <section
          className="relative py-28 md:py-36"
          style={{
            background: "linear-gradient(135deg, #1A3A5C 0%, #2B7CC1 100%)",
          }}
        >
          <div className="container-custom text-center">
            <span
              className="badge mb-4 border border-white/30"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#bfdbfe",
              }}
            >
              Gallery
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 fade-in">
              See Real Transformations
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto fade-in"
              style={{ color: "#bfdbfe" }}
            >
              Before & after results, our clinic facilities, and
              behind-the-scenes glimpses of our team at work.
            </p>
          </div>
        </section>

        <section
          className="py-10 md:py-16"
          style={{ backgroundColor: "#EBF4FF" }}
        >
          <div className="container-custom">
            {/* Filter tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-8 md:mb-10 scrollbar-hide">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: cat === c ? "#2B7CC1" : "white",
                    color: cat === c ? "white" : "#1A3A5C",
                    border: `2px solid ${cat === c ? "#2B7CC1" : "#D6E9FF"}`,
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            {loading ? (
              <LoadingSpinner size="lg" />
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                No images in this category yet.
              </div>
            ) : (
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
                {filtered.map((img, i) => (
                  <div
                    key={img._id || img.id || `${img.url}-${i}`}
                    className="fade-in break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                    style={{ animationDelay: `${i * 0.05}s` }}
                    onClick={() => setLightbox(i)}
                  >
                    <img
                      src={img.url}
                      alt={img.alt_text || img.caption}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.pexels.com/photos/3845806/pexels-photo-3845806.jpeg";
                      }}
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(26,58,92,0.6)" }}
                    >
                      <ZoomIn size={28} className="text-white" />
                    </div>
                    {img.category && (
                      <span
                        className="absolute top-2 left-2 text-white text-xs font-semibold px-2 py-1 rounded-full"
                        style={{ backgroundColor: "rgba(43,124,193,0.9)" }}
                      >
                        {img.category}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors z-10">
            <X size={22} />
          </button>
          <button
            className="absolute left-2 md:left-6 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
          >
            <ChevronLeft size={22} />
          </button>
          <div
            className="max-w-4xl w-full mx-4 md:mx-12"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightbox].url}
              alt={filtered[lightbox].alt_text}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            {filtered[lightbox].caption && (
              <p className="text-center text-white/70 text-sm mt-3">
                {filtered[lightbox].caption}
              </p>
            )}
            <p className="text-center text-white/50 text-xs mt-1">
              {lightbox + 1} / {filtered.length}
            </p>
          </div>
          <button
            className="absolute right-2 md:right-6 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              navigate(1);
            }}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </>
  );
}
