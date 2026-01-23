import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Quote } from 'lucide-react';

const TestimonialsSection = ({ data }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  if (!data) return null;
  const { title, description, testimonials } = data;

  return (
    <section className="py-20 bg-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center flex flex-col">
        
        <div className="mb-12 text-center w-full">
             <h2 className="font-kelloggs text-2xl sm:text-3xl font-bold text-gray-900 mb-2 uppercase">
               {title.toUpperCase()}
             </h2>

             <h3 className="text-lg text-gray-600 font-medium">
               {description}
             </h3>
        </div>

        {/* Carousel Container */}
        <div className="border-4 border-kelloggs-gold p-8 sm:p-12 md:p-16 relative bg-white shadow-2xl rounded-sm max-w-3xl mx-auto flex flex-col items-center">
             <div className="mb-8 flex justify-center text-kelloggs-red">
                <Quote sx={{ fontSize: 60 }} className="p-1" />
             </div>

             <div className="overflow-hidden w-full" ref={emblaRef}>
                <div className="flex touch-pan-y">
                  {testimonials?.map((t, index) => (
                    <div className="flex-[0_0_100%] min-w-0" key={index}>
                      <div className="px-4 text-center">
                          <p className="text-lg sm:text-xl font-serif italic text-gray-800 mb-8 leading-relaxed">
                            "{t.comment}"
                          </p>
                          <p className="font-bold text-kelloggs-red uppercase tracking-wide text-sm">
                            {t.shared_by}
                          </p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             {/* Dots Navigation */}
             <div className="flex justify-center gap-3 mt-12">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 transform ${
                      index === selectedIndex ? 'bg-kelloggs-red scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
             </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
