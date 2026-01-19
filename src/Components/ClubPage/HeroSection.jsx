import React, { useState } from 'react';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LoginIcon from '@mui/icons-material/Login';
import AuthModal from './AuthModal';

const HeroSection = ({ data }) => {
  const [modalType, setModalType] = useState(null);

  const handleOpenModal = (type) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'person_add':
      case 'PersonAddAltIcon': return <PersonAddAltIcon />;
      case 'login':
      case 'LoginIcon': return <LoginIcon />;
      default: return null;
    }
  };

  if (!data) return null;
  const { mainHeading, mainSubHeading, mainDescription, mainButtonData } = data;

  return (
    <section className="py-10 bg-kelloggs-red text-center relative overflow-hidden min-h-[80vh] flex flex-col items-center">
      

      {/* Decorative Blob for depth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      {/* Monkey Image - Decorative (Absolute Positioned for "hanging" look or side placement) */}
      <div className="hidden lg:block absolute right-0 bottom-0 z-50 opacity-90 w-24 xl:w-32 2xl:w-60 pointer-events-none">
         <img 
            src="https://static.wixstatic.com/media/2bc50d_b973282d09b64a5887aab8ba319849af~mv2.png/v1/fill/w_355,h_530,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cocoo.png"  
            alt="Coco Monkey" 
            className="w-full h-auto object-contain"
         />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col items-center relative z-10 w-full">
        
        <div className="w-full flex justify-center mb-6 animate-fade-in-up">
            <img 
                src="https://static.wixstatic.com/media/2bc50d_5084462691044c3695807bbf13840130~mv2.png/v1/fill/w_133,h_137,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/KSS%20Logo_2.png" 
                alt="Kelloggs Superstars Club Logo" 
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
            />
        </div>

        <h1 className="font-kelloggs text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 tracking-normal drop-shadow-sm whitespace-nowrap">
          {mainHeading || "Kellogg's Superstars Club"}
        </h1>

        {/* Sub Heading */}
        <h2 className="font-bold text-xl sm:text-2xl text-white mb-10 max-w-3xl tracking-wide text-center mx-auto">
          {mainSubHeading}
        </h2>

        {/* Description Box */}
        <div className="border border-white/40 bg-white/10 backdrop-blur-sm p-8 sm:p-10 mb-12 w-full max-w-5xl mx-auto rounded-xl">
            <p className="font-sans text-white text-lg sm:text-xl leading-relaxed">
            {mainDescription}
            </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full relative z-20">
           {mainButtonData?.map((btn, index) => (
             <button 
               key={index}
               onClick={() => handleOpenModal(index === 0 ? 'join' : 'login')}
               className={`
                 flex items-center justify-center gap-3 px-8 py-4 font-bold text-lg transition-all duration-300 rounded-full shadow-lg bg-white text-kelloggs-red hover:bg-gray-100 hover:scale-105
               `}
             >
               {getIcon(btn.icon)}
               <span>{btn.button_text}</span>
             </button>
           ))}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={!!modalType} 
        type={modalType} 
        onClose={handleCloseModal} 
      />

    </section>
  );
};

// Helper to return icon component based on string


export default HeroSection;
