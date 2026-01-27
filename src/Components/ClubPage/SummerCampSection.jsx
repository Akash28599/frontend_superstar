import summerCampVideo from '../../assets/videos/summer_camp_intro.mp4';

const SummerCampSection = ({ data }) => {
  if (!data) return null;
  const { title, description, block_text } = data;
  


  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-3 xxs:px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-7xl flex flex-col items-center text-center">
        
         <h2 className="font-bold font-kelloggs text-lg xxs:text-xl sm:text-2xl lg:text-3xl text-gray-900 uppercase mb-6 sm:mb-8 lg:mb-10 tracking-tight">
            {title.toUpperCase()}
        </h2>

        {/* 2. Video - Replaces Image */}
        <div className="w-full mb-6 sm:mb-8 lg:mb-10 shadow-lg border-2 sm:border-4 border-kelloggs-gold rounded-lg sm:rounded-xl overflow-hidden bg-black">
             <video 
                src={summerCampVideo} 
                className="w-full h-full object-contain aspect-video"
                controls
                playsInline
            >
                Your browser does not support the video tag.
            </video>
        </div>

        {/* 3. Description */}
        <p className="text-gray-700 text-sm xxs:text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 max-w-full sm:max-w-4xl text-center mx-auto">
            {description}
        </p>

        {/* 4. Badge */}
         {block_text && (
            <div className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 border-2 border-kelloggs-red text-kelloggs-red font-bold text-sm sm:text-base lg:text-lg bg-red-50 rounded-full shadow-sm">
                <span className="text-base sm:text-lg lg:text-xl">✓</span>
                <span>{block_text.replace(/^✓\s*/, '')}</span>
            </div>
        )}

      </div>
    </section>
  );
};

export default SummerCampSection;
