import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '../../common/config';

const HomeBanner = () => {
  const [banner, setBanner] = useState(null);
  const [cloudImage, setCloudImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [starImage, setStarImage] = useState(null);

  // Unused detection for edge, but keeping it if needed later
  const isEdge = /Edg|Edge/.test(navigator.userAgent);

  useEffect(() => {
    // Fetch banner data
    fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HOME_BANNERS}`)
      .then(res => res.json())
      .then(data => {
        const items = Array.isArray(data.data) ? data.data : [];
        const bannerItem = items.find(i => i.uid === 'homebanner') || null;
        const cloudItem = items.find(i => i.uid === 'cloud') || null;

        setBanner(bannerItem);

        if (cloudItem?.image) {
          const img = cloudItem.image;
          setCloudImage(
            img.formats?.medium?.url ||
            img.formats?.small?.url ||
            img.formats?.thumbnail?.url ||
            img.url
          );
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch star data from coco-heads
    fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COCO_HEADS}`)
        .then(res => res.json())
        .then(json => {
            const data = json.data || [];
            const starItem = data.find(d => !(d.icon_description && d.icons));
            if (starItem?.icons) {
                const starUrl = starItem.icons.formats?.small?.url ||
                    starItem.icons.formats?.thumbnail?.url ||
                    starItem.icons.url;
                setStarImage(starUrl);
            }
        })
        .catch(err => console.log("Star fetch error", err));
  }, []);

  if (loading) return <div className="min-h-screen bg-kelloggs-red text-white flex items-center justify-center text-[1.2rem]">Loading...</div>;
  if (!banner) return <div className="min-h-screen bg-kelloggs-red text-white flex items-center justify-center text-[1.2rem]">No banner data</div>;

  const logoImage =
    banner.nav_icon?.formats?.small?.url ||
    banner.nav_icon?.formats?.thumbnail?.url ||
    banner.nav_icon?.url;

  const heroImage =
    banner.image?.formats?.large?.url ||
    banner.image?.formats?.medium?.url ||
    banner.image?.url;

  const Cloud = ({ className }) =>
    cloudImage && (
      <img
        src={cloudImage}
        alt="Cloud"
        className={`absolute pointer-events-none z-[3] ${className}`}
      />
    );

  return (
    <div className="relative min-h-screen bg-kelloggs-red overflow-visible w-full m-0 p-0 flex flex-col font-kelloggs pt-20 sm:pt-24 md:pt-28">
      
      {/* Logo - DESKTOP OPTIMIZED - z-50 to stay above navbar dropdown */}
      {logoImage && (
        <div className="
            absolute top-0 
            left-[2%] xxs:left-[2%] sm:left-[3%] md:left-[3%] tablet:left-[5%]
            z-50
            bg-white/95 rounded-b-[12px] sm:rounded-b-[15px] tablet:rounded-b-[30px] 
            flex items-center justify-center
            w-[3.5rem] h-[4.5rem]
            xxs:w-[4rem] xxs:h-[5rem]
            sm:w-[5rem] sm:h-[6.5rem]
            tablet:w-[7rem] tablet:h-[8.5rem]
            wide:w-[9rem] wide:h-[11rem] 
            shadow-lg
        ">
          <img 
            src={logoImage} 
            alt="Logo" 
            className="
                object-contain rounded-[12px] sm:rounded-[16px]
                w-[28px] h-[50px]
                xxs:w-[35px] xxs:h-[60px]
                sm:w-[45px] sm:h-[80px]
                tablet:w-[65px] tablet:h-[110px]
                wide:w-[90px] wide:h-[140px]
            " 
          />
        </div>
      )}

      {/* Main Content Area - DESKTOP OPTIMIZED (1920x1080) */}
      <div className="
        h-auto flex-1 
        flex flex-col-reverse md:flex-row 
        items-center md:items-end 
        justify-between 
        relative mx-auto w-full
        px-4 md:px-0
        max-w-full xl-wide:max-w-[1920px]
      ">
        
        {/* Left Section - Text Content - DESKTOP OPTIMIZED with improved mobile spacing */}
        <div className={`
            flex-1 z-[20] 
            flex flex-col justify-center items-start
            w-full md:w-auto
            px-3 xxs:px-4 sm:px-6 
            md:pl-[8%]
            tablet:pl-[10%]
            wide:pl-[15%]
            pb-6 pt-20
            xxs:pb-8 xxs:pt-22
            sm:pb-10 sm:pt-26
            md:pb-12 md:pt-28
            ${isEdge ? 'md:pb-[10vh] md:pt-[23vh]' : 'md:pb-[12vh] md:pt-[24vh]'}
            ${isEdge ? 'tablet:pb-[10vh] tablet:pt-[23vh]' : 'tablet:pb-[10vh] tablet:pt-[25vh]'}
            ${isEdge ? 'wide:pb-[14vh] wide:pt-[27vh]' : 'wide:pb-[8vh] wide:pt-[12vh]'}
        `}>
              {/* Badge - reduced bottom margin */}
              <div className="mb-3 xxs:mb-4 sm:mb-5 md:mb-6 lg:mb-[1.5rem] bg-kelloggs-gold py-1.5 xxs:py-2 px-3 xxs:px-4 md:py-[0.6rem] md:px-[1.5rem] tablet:py-[0.8rem] tablet:px-[2rem] rounded-full inline-flex items-center justify-center shadow-md">
                <h3 className={`
                    m-0 font-medium leading-none tracking-normal text-kelloggs-red whitespace-nowrap
                    text-xs xxs:text-sm sm:text-base 
                    ${isEdge ? 'md:text-[clamp(1.2rem,1.5vw,1.6rem)]' : 'md:text-[clamp(1rem,1.3vw,1.4rem)]'}
                `}>
                    {banner.topheading}
                </h3>
              </div>

              {/* H1 Title - proper line-height for multi-line heading */}
              <h1 className={`
                font-bold text-white text-left mb-4 xxs:mb-5 sm:mb-6 md:mb-8 lg:mb-[2rem] 
                leading-[1.15] sm:leading-[1.12] md:leading-[1.08]
                text-2xl xxs:text-3xl sm:text-4xl 
                ${isEdge ? 'md:text-[clamp(3.5rem,5vw,6rem)]' : 'md:text-[clamp(3rem,4.5vw,5.5rem)]'}
                drop-shadow-sm w-full
              `}>
                {banner.title && banner.title.split(' ').length > 1 ? (
                  <>
                    {banner.title.split(' ')[0]}
                    <br />
                    <span className="whitespace-nowrap">
                        {banner.title.split(' ').slice(1).join(' ')}
                    </span>
                  </>
                ) : (
                  banner.title
                )}
              </h1>

              {/* Description - proper line spacing for readability */}
              <p className={`
                text-white font-medium leading-[1.6] sm:leading-[1.55] md:leading-[1.5] mb-5 xxs:mb-6 sm:mb-8 md:mb-10 lg:mb-[2.5rem] text-left max-w-none
                text-xs xxs:text-sm sm:text-base 
                ${isEdge ? 'md:text-[clamp(1.2rem,1.7vw,1.8rem)]' : 'md:text-[clamp(1rem,1.5vw,1.6rem)]'}
              `}>
                {banner.description}
              </p>

              {/* Button - DESKTOP OPTIMIZED with improved mobile sizing */}
              <button
                className={`
                    rounded-full border-none font-bold inline-flex items-center cursor-pointer transition-all duration-300 font-kelloggs shadow-lg
                    ${isHovered ? 'bg-kelloggs-gold scale-105' : 'bg-white scale-100'} text-kelloggs-red
                    text-xs xxs:text-sm sm:text-base md:text-[clamp(0.9rem,1.4vw,1.5rem)]
                    py-2 px-4 xxs:py-2.5 xxs:px-5 sm:py-3 sm:px-6 md:py-[clamp(0.7rem,1vh,1.1rem)] md:px-[clamp(1.5rem,2.2vw,2.5rem)]
                `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Play Now
                <div 
                    className="
                        w-6 h-6 sm:w-8 sm:h-8 md:w-[clamp(24px,2.5vw,36px)] md:h-[clamp(24px,2.5vw,36px)]
                        rounded-full flex items-center justify-center ml-2 md:ml-[clamp(8px,0.8vw,12px)]
                        bg-gradient-to-b from-[#ffb366] to-[#ff8a2b]
                        shadow-[2px_3px_0px_#F60945,0_4px_12px_rgba(0,0,0,0.1)]
                        transition-all duration-300
                    "
                >
                  <svg viewBox="0 0 24 24" fill="#fff" className="w-[60%] h-[60%] tablet:w-[70%] tablet:h-[70%]">
                    <polygon points="8,5 8,19 19,12" />
                  </svg>
                </div>
              </button>
        </div>

        {/* Right Section / Image Wrapper - DESKTOP OPTIMIZED (1920x1080) - Kid visible on mobile */}
        <div className="flex-1 h-full flex justify-center lg:justify-end items-end relative z-[5] w-full lg:w-auto mt-4 sm:mt-0">
          {heroImage && (
            <>
              <img 
                src={heroImage} 
                alt="Hero" 
                className={`
                    relative object-contain object-bottom z-[10]
                    max-w-full lg:max-w-none
                    w-auto
                    h-[35vh] xxs:h-[38vh] xs:h-[42vh] sm:h-[50vh] md:h-[60vh]
                    min-h-[280px] sm:min-h-[350px]
                    ${isEdge ? 'lg:h-[clamp(72vh,96vh,108vh)]' : 'lg:h-[clamp(85vh,115vh,130vh)]'}
                    ${isEdge ? 'wide:h-[clamp(72vh,96vh,108vh)]' : 'wide:h-[clamp(75vh,100vh,115vh)]'}
                    min-w-[200px] xxs:min-w-[220px] xs:min-w-[250px]
                    lg:min-w-[300px]
                    tablet:min-w-[400px]
                    mr-0 lg:mr-[5%] mb-0
                `} 
              />
              
              {/* Clouds - DESKTOP ONLY */}
              <Cloud className="
                block
                top-[5%] right-[10%] w-[18%] 
                sm:top-[40%] sm:right-[10%] sm:w-[18%]
                md:top-[30%] md:right-[2%]
                tablet:top-[20%] tablet:right-[5%] tablet:w-[15%]
                lg:top-[50%] lg:right-[10%] lg:w-[14%] 
                z-[3] opacity-90
              " />

              <Cloud className="
                block
                top-[15%] left-[-5%] w-[15%]
                sm:top-[40%] sm:left-[2%] sm:w-[18%]
                lg:top-[20%] lg:left-[5%] lg:w-[8%]
                z-[4] opacity-90
              " />
            </>
          )}
        </div>

        {/* Floating Star - DESKTOP OPTIMIZED */}
        {starImage && (
            <div className="
                absolute pointer-events-none z-[25] -rotate-12
                hidden sm:block
                bottom-[-10%] left-[-5%]
                sm:bottom-[-15%] sm:left-[-3%]
                md:bottom-[-20%] md:left-[-5%]
                tablet:bottom-[-30%] tablet:left-[-0%]
                w-[12vw] min-w-[120px] max-w-[250px]
                md:w-[15vw] md:min-w-[180px] md:max-w-[350px]
            ">
                <img src={starImage} alt="star" className="w-full h-auto drop-shadow-xl" />
            </div>
        )}
      </div>

    </div>
  );
};

export default HomeBanner;
