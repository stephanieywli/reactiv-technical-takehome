import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

type UseCarouselPagination = {
  currentIndex: number;
  scrollSnaps: number[];
  scrollToSnap: (index: number) => void;
};

export const useCarouselPagination = (
  emblaApi: EmblaCarouselType | undefined,
): UseCarouselPagination => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Paginate to selected slide
  const scrollToSnap = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  // Set # of slides in carousel
  const onInit = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  // Track current slide index
  const onSelect = useCallback((api: EmblaCarouselType) => {
    setCurrentIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    // eslint-disable-next-line
    onInit(emblaApi);
    onSelect(emblaApi);

    // Call functions when slides or current slide changes to keep states in sync w/ Embla
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return { currentIndex, scrollSnaps, scrollToSnap };
};
