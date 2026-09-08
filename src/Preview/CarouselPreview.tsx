import useEmblaCarousel from "embla-carousel-react";
import type { CarouselSection } from "../types";
import { useCarouselPagination } from "./useCarouselPagination";
import { PaginationDot } from "./PaginationDot";

const aspectClass: Record<CarouselSection["aspect"], string> = {
  landscape: "aspect-video",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
};

export const CarouselPreview = ({ section }: { section: CarouselSection }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const { currentIndex, scrollSnaps, scrollToSnap } =
    useCarouselPagination(emblaApi);

  if (section.images.length === 0) {
    return (
      <div
        className={`rounded-2xl overflow-hidden bg-brand-gray-50 border border-brand-gray-100 flex items-center justify-center text-brand-gray-300 text-xs ${aspectClass[section.aspect]}`}
      >
        Click to insert an image
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border bg-brand-gray-100 border-brand-gray-100">
      <div
        className="overflow-hidden touch-pan-y touch-pinch-zoom"
        ref={emblaRef}
      >
        <div className="flex">
          {section.images.map((url, i) => (
            <div
              key={i}
              className={`relative flex-none w-full ${aspectClass[section.aspect]} bg-brand-gray-100`}
            >
              <img src={url} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/** Pagination */}
      {scrollSnaps.length > 1 && (
        <div className="absolute inset-x-0 bottom-0 py-2 bg-linear-to-t from-black/50 to-transparent flex items-center justify-center gap-1">
          {scrollSnaps.map((_, i) => (
            <PaginationDot
              key={i}
              isActive={i === currentIndex}
              onClick={() => scrollToSnap(i)}
              label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
