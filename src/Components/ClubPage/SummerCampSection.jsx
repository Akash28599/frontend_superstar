import React from 'react';

const SummerCampSection = ({ data }) => {
  if (!data) return null;
  const { title, description, block_text } = data;
  
  // Placeholder image as requested (1200x600)
  const imageUrl = "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&q=80&w=2000";

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col items-center text-center">
        
         <h2 className="font-bold font-kelloggs text-xl sm:text-2xl lg:text-3xl text-gray-900 uppercase mb-10 tracking-tight">
            {title.toUpperCase()}
        </h2>

        {/* 2. Image (1200x600) */}
        <div className="w-full bg-gray-100 mb-10 shadow-lg border-4 border-kelloggs-gold rounded-xl overflow-hidden">
             <img 
                src={data.image||imageUrl} 
                alt="Summer Camp" 
                className="w-full h-auto object-cover aspect-[2/1]"
            />
        </div>

        {/* 3. Description */}
        <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8 max-w-4xl text-center mx-auto">
            {description}
        </p>

        {/* 4. Badge */}
         {block_text && (
            <div className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-kelloggs-red text-kelloggs-red font-bold text-lg bg-red-50 rounded-full shadow-sm">
                <span className="text-xl">✓</span>
                <span>{block_text.replace(/^✓\s*/, '')}</span>
            </div>
        )}

      </div>
    </section>
  );
};

export default SummerCampSection;
