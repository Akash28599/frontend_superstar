import React from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const OpportunitiesSection = ({ data }) => {
  if (!data) return null;
  const { title, description, button_data } = data;

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-kelloggs-red text-white relative">
      <div className="container mx-auto px-3 xxs:px-4 sm:px-6 lg:px-8 text-center relative z-10 max-w-full sm:max-w-6xl flex flex-col items-center">
        
        <h2 className="font-kelloggs text-xl xxs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white uppercase tracking-tight">
          {title.toUpperCase()}
        </h2>
        
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 mb-8 sm:mb-10 lg:mb-12 leading-relaxed max-w-full sm:max-w-2xl">
          {description}
        </p>
        
        <button className="bg-white text-gray-900 font-bold py-3 px-6 sm:py-4 sm:px-10 rounded-sm hover:bg-gray-200 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 sm:gap-3 mx-auto">
          <AutoAwesomeIcon fontSize="small" />
          {button_data?.button_text || "Explore the Universe"}
        </button>


      </div>
    </section>
  );
};

export default OpportunitiesSection;
