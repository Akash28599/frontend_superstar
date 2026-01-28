import React, { useState } from 'react';
import AuthModal from './AuthModal';
import { FiLogIn } from "react-icons/fi";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";

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
      case 'PersonAddAltIcon': return <MdOutlinePersonAddAlt1 />;
      case 'login':
      case 'LoginIcon': return <FiLogIn />;
      default: return null;
    }
  };

  if (!data) return null;
  const { mainHeading, mainSubHeading, mainDescription, mainButtonData, mainLogo, mainCoco } = data;

  return (
    <section className="py-6 xxs:py-8 sm:py-10 2xl:pb-20 bg-kelloggs-red text-center relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex flex-col items-center">


      {/* Decorative Blob for depth */}
      <div className="absolute top-0 right-0 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-3 xxs:px-4 sm:px-6 lg:px-8 max-w-full lg:max-w-[1800px] relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-12 items-center gap-4 lg:gap-8 pt-6 sm:pt-10 lg:pt-0">

        {/* SECTION 1: Logo (Left - 2 Cols) */}
        <div className="lg:col-span-2 flex justify-center lg:justify-start w-full min-w-0">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-48 lg:h-48 xl:w-64 xl:h-64 2xl:w-80 2xl:h-80 transition-transform hover:scale-105 duration-300">
            <img
              src={mainLogo.url}
              alt="Kelloggs Superstars Club Logo"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
            <img
              src={mainLogo.url}
              alt=""
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              style={{
                clipPath: 'inset(0 0 70% 0)',
                filter: 'brightness(0) invert(1)'
              }}
            />
          </div>
        </div>

        {/* SECTION 2: Content (Middle - 8 Cols) - PERFECTLY CENTERED */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center text-center z-20 px-2 lg:px-0 2xl:translate-y-12">

          <h1 className="font-bold font-kelloggs text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white mb-6 tracking-tight drop-shadow-md leading-tight">
            {mainHeading || "Kellogg's Superstars Club"}
          </h1>

          {/* Sub Heading */}
          <h2 className="font-bold text-xl sm:text-2xl lg:text-2xl 2xl:text-3xl text-white mb-6 2xl:mb-8 max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl tracking-wide opacity-95">
            {mainSubHeading}
          </h2>

          {/* Description Box */}
          <div className="mb-8 2xl:mb-12 w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-4xl mx-auto">
            <p className="font-sans text-white text-lg lg:text-lg xl:text-xl 2xl:text-2xl font-medium leading-relaxed opacity-90 drop-shadow-sm italic">
              {mainDescription ? (
                mainDescription.split("Kellogg's-led").map((part, index, arr) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < arr.length - 1 && (
                      <span className="inline-block">
                        <span className="font-kelloggs text-2xl lg:text-3xl relative top-1 mx-1 opacity-100">Kellogg's</span>-led
                      </span>
                    )}
                  </React.Fragment>
                ))
              ) : (
                mainDescription
              )}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center">
            {mainButtonData?.map((btn, index) => (
              index === 0 ? (
                <button
                  key={index}
                  onClick={() => handleOpenModal('join')}
                  className="
                    flex items-center justify-center gap-3 px-8 py-3 2xl:px-10 2xl:py-4 
                    font-bold text-lg 2xl:text-xl transition-all duration-300 rounded-full 
                    shadow-lg bg-white text-kelloggs-red 
                    hover:bg-kelloggs-gold hover:text-kelloggs-red hover:-translate-y-1 hover:shadow-2xl 
                    min-w-[200px] 2xl:min-w-[220px]
                  "
                >
                  {getIcon(btn.icon)}
                  <span>{btn.button_text}</span>
                </button>
              ) : (
                <button
                  key={index}
                  onClick={() => handleOpenModal('login')}
                  className="
                    flex items-center justify-center gap-2 px-4 py-2
                    font-medium text-base 2xl:text-lg transition-all duration-300
                    text-white/90 hover:text-white underline underline-offset-4
                    hover:scale-105
                  "
                >
                  {getIcon(btn.icon)}
                  <span>{btn.button_text}</span>
                </button>
              )
            ))}
          </div>

        </div>

        {/* SECTION 3: Coco Image (Right - 2 Cols) - Corner aligned */}
        <div className="lg:col-span-2 flex justify-center lg:justify-end relative h-full items-end mt-10 lg:mt-0 overflow-visible">
          {/* Background Glow */}

          <img
            src={mainCoco?.url}
            alt="Coco Monkey"
            className="
  block
  w-[clamp(28vh,44vh,60vh)]
  max-w-none
  h-auto
  object-contain
  drop-shadow-2xl
  rotate-3
  origin-bottom-right
  transition-transform
  lg:translate-x-8 lg:translate-y-16
  xl:translate-y-16
  2xl:translate-y-24
"

          />
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
