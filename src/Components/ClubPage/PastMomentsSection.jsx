import React, { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PastMomentsSection = ({ data }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi) => {
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    setCount(emblaApi.scrollSnapList().length);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (!data) return null;
  const { title, sub_title, description, images } = data;

  // Fallback images (mapped to image_urls)
  const image_urls =
    (data?.images && data.images.length > 0)
      ? data.images
      : (images && images.length > 0 && images[0] !== "")
        ? images
        : [
          "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1511632765486-a01980968a0c?auto=format&fit=crop&q=80&w=1200"
        ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center flex flex-col items-center">

        <div className="mb-12 text-center w-full">
          <h2 className="font-kelloggs text-2xl sm:text-3xl font-bold text-gray-900 mb-2 uppercase">
            {title.toUpperCase()}
          </h2>
          <h3 className="text-xl text-kelloggs-red font-bold mb-4">
            {sub_title}
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-xl border-4 border-white ring-4 ring-kelloggs-red/10" ref={emblaRef}>
            <div className="flex">
              {image_urls?.map((url, index) => (
                <div className="flex-[0_0_100%] min-w-0 relative aspect-video bg-gray-100" key={index}>
                  <img
                    src={url}
                    alt={`Moment ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation & Counter */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              className="p-3 rounded-full bg-white border-2 border-kelloggs-red text-kelloggs-red hover:bg-kelloggs-red hover:text-white transition-colors shadow-md"
              onClick={scrollPrev}
            >
              <ArrowLeft size={24} />
            </button>

            <span className="font-bold text-gray-500 tracking-widest min-w-[60px]">
              {currentIndex + 1} / {count}
            </span>

            <button
              className="p-3 rounded-full bg-white border-2 border-kelloggs-red text-kelloggs-red hover:bg-kelloggs-red hover:text-white transition-colors shadow-md"
              onClick={scrollNext}
            >
              <ArrowRight size={24} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PastMomentsSection;
