import { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {FaArrowLeft} from "react-icons/fa";
import {FaArrowRight} from "react-icons/fa";
import {IoCloseSharp} from "react-icons/io5";

const PastMomentsSection = ({ data }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

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
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-3 xxs:px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-[1600px] text-center flex flex-col items-center">

        <div className="mb-8 lg:mb-12 text-center w-full max-w-4xl px-4">
          <h2 className="font-kelloggs text-2xl sm:text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
            {title.toUpperCase()}
          </h2>
          <h3 className="text-lg sm:text-2xl text-kelloggs-red font-bold mb-4">
            {sub_title}
          </h3>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Gallery Carousel */}
        <div className="relative w-full mt-4">
          
          {/* Viewport */}
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-4 py-10">
              {image_urls?.map((url, index) => {
                 const isActive = index === currentIndex;
                 return (
                  <div 
                    className={`
                        flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_45%] xl:flex-[0_0_40%] 
                        min-w-0 pl-4 relative transition-all duration-500 ease-out 
                        ${isActive ? 'scale-100 opacity-100 z-10' : 'scale-90 opacity-40 blur-[1px] hover:opacity-75 hover:scale-95 cursor-pointer'}
                    `} 
                    key={index}
                    onClick={() => !isActive && emblaApi && emblaApi.scrollTo(index)}
                  >
                    <div 
                      className={`
                        relative aspect-video rounded-3xl overflow-hidden shadow-2xl 
                        ${isActive ? 'border-4 border-kelloggs-red ring-4 ring-kelloggs-gold/30' : 'border-2 border-white grayscale-[30%]'} 
                        cursor-pointer group bg-gray-100 select-none
                      `}
                      onClick={(e) => {
                        e.stopPropagation();
                        if(isActive) setSelectedImage(url);
                        else emblaApi && emblaApi.scrollTo(index);
                      }}
                    >
                      <img
                        src={url}
                        alt={`Moment ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Interactive Hover Overlay (Only on Active) */}
                      {isActive && (
                        <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20 flex items-center justify-center">
                           
                           {/* Hint Badge */}
                           <div className="
                                absolute bottom-6 right-6 
                                bg-white text-kelloggs-red font-bold px-4 py-2 rounded-full 
                                shadow-lg transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 
                                transition-all duration-300 flex items-center gap-2 pointer-events-none
                           ">
                              <span className="text-sm uppercase tracking-wider">Tap to Expand</span>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                           </div>

                        </div>
                      )}
                    </div>
                  </div>
                 )
              })}
            </div>
          </div>

          {/* Controls - Floating on Desktop */}
          <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden lg:flex w-16 h-16 rounded-full bg-white/90 backdrop-blur border-2 border-kelloggs-red text-kelloggs-red hover:bg-kelloggs-red hover:text-white transition-all shadow-xl items-center justify-center transform hover:scale-105"
              onClick={scrollPrev}
          >
             <FaArrowLeft size={32} strokeWidth={2.5} />
          </button>
          
          <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden lg:flex w-16 h-16 rounded-full bg-white/90 backdrop-blur border-2 border-kelloggs-red text-kelloggs-red hover:bg-kelloggs-red hover:text-white transition-all shadow-xl items-center justify-center transform hover:scale-105"
              onClick={scrollNext}
          >
             <FaArrowRight size={32} strokeWidth={2.5} />
          </button>

          {/* Pagination Dots & Navigation (Mobile/Tablet Friendly) */}
          <div className="flex flex-col items-center gap-6 mt-6">
             <div className="flex gap-2">
              {image_urls.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-kelloggs-red' : 'w-2 bg-gray-300 hover:bg-kelloggs-red/50'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
            {/* Mobile Arrows */}
            <div className="flex lg:hidden items-center gap-8">
                <button onClick={scrollPrev} className="p-3 rounded-full bg-white border border-gray-200 shadow-lg active:scale-95"><FaArrowLeft className="text-kelloggs-red"/></button>
                <div className="font-bold text-gray-400 text-sm tracking-widest">{currentIndex + 1} / {count}</div>
                <button onClick={scrollNext} className="p-3 rounded-full bg-white border border-gray-200 shadow-lg active:scale-95"><FaArrowRight className="text-kelloggs-red"/></button>
            </div>
          </div>

        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white hover:bg-kelloggs-red hover:text-white transition-all transform hover:rotate-90"
              onClick={() => setSelectedImage(null)}
            >
              <IoCloseSharp size={32} />
            </button>
            <img 
              src={selectedImage} 
              alt="Full screen moment" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-zoom-in"
              onClick={(e) => e.stopPropagation()} 
            />
            <div className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm">Tap anywhere to close</div>
          </div>
        )}

      </div>
    </section>
  );
};

export default PastMomentsSection;
