import React from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const OpportunitiesSection = ({ data }) => {
  if (!data) return null;
  const { title, description, button_data } = data;

  return (
    <section className="py-24 bg-kelloggs-red text-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 max-w-6xl flex flex-col items-center">
        
        <h2 className="font-kelloggs text-4xl sm:text-5xl lg:text-6xl mb-6 text-white uppercase tracking-tight">
          {title}
        </h2>
        
        <p className="text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed">
          {description}
        </p>
        
        <button className="bg-white text-gray-900 font-bold py-4 px-10 rounded-sm hover:bg-gray-200 transition-all duration-300 text-sm uppercase tracking-wider flex items-center justify-center gap-3 mx-auto">
          <AutoAwesomeIcon fontSize="small" />
          {button_data?.button_text || "Explore the Universe"}
        </button>


      </div>
    </section>
  );
};

export default OpportunitiesSection;
