import React, { useState, useCallback, useEffect } from 'react';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import useEmblaCarousel from 'embla-carousel-react';

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

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!data) return null;
  const { title, description, testimonials } = data;

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-red-50">
      <div className="container mx-auto px-3 xxs:px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-6xl text-center flex flex-col">
        
        <div className="mb-6 sm:mb-8 lg:mb-12 text-center w-full">
             <h2 className="font-kelloggs text-xl xxs:text-2xl sm:text-3xl font-bold text-gray-900 mb-2 uppercase">
               {title.toUpperCase()}
             </h2>

             <h3 className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
               {description}
             </h3>
        </div>

        {/* Carousel Container with Arrows */}
        <div className="relative max-w-full sm:max-w-3xl mx-auto w-full">
          
          {/* Left Arrow */}
          <button 
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 lg:-translate-x-12 z-10 
                       w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-kelloggs-red text-white shadow-lg
                       flex items-center justify-center hover:bg-kelloggs-gold hover:text-kelloggs-red 
                       transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button 
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 lg:translate-x-12 z-10 
                       w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-kelloggs-red text-white shadow-lg
                       flex items-center justify-center hover:bg-kelloggs-gold hover:text-kelloggs-red 
                       transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="border-2 sm:border-4 border-kelloggs-gold p-4 xxs:p-6 sm:p-8 md:p-12 lg:p-16 relative bg-white shadow-xl sm:shadow-2xl rounded-sm flex flex-col items-center">
               <div className="mb-4 sm:mb-6 lg:mb-8 flex justify-center text-kelloggs-red">
                  <FormatQuoteIcon sx={{ fontSize: { xs: 36, sm: 48, md: 60 } }} className="p-1" />
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

      </div>
    </section>
  );
};

export default TestimonialsSection;
