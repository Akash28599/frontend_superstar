import React, { useState, useEffect } from 'react';
import Navbar from '../../Layouts/Navbar';

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
    fetch(`${process.env.REACT_APP_STRAPI_URL}/api/homebanners?populate=*`)
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
    fetch(`${process.env.REACT_APP_STRAPI_URL}/api/coco-heads?populate=*`)
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
    <div className="relative min-h-screen bg-kelloggs-red overflow-visible w-full m-0 p-0 flex flex-col font-kelloggs">
      
      {/* Navbar Container - Adjusted for gap */}
      <div 
        className={`
            relative z-50 
            pt-[30px] 
            ml-[22%] tablet:ml-[25%] desktop:ml-[28%] mr-auto
            wide:-mb-[60px] 
            max-w-[80vw] tablet:max-w-[70vw] wide:max-w-[71vw]
            pr-[5px] tablet:pr-[28px] wide:pr-[40px]
        `}
      >
        <Navbar customStyle={{
            top: '0',
            left: 'auto',
            transform: 'none',
            margin: '0',
            width: '100%',
            maxWidth: '100%',
            background: 'white',
         }} 
        />
      </div>


      {logoImage && (
        <div className="
            absolute top-0 left-[2%] tablet:left-[5%] z-30 
            bg-white/95 rounded-b-[20px] tablet:rounded-b-[30px] flex items-center justify-center
            w-[5rem] h-[6.5rem] tablet:w-[7rem] tablet:h-[8.5rem]
            wide:w-[9rem] wide:h-[11rem] shadow-lg
        ">
          <img 
            src={logoImage} 
            alt="Logo" 
            className="
                object-contain rounded-[16px]
                w-[45px] h-[80px] tablet:w-[65px] tablet:h-[110px]
                wide:w-[90px] wide:h-[140px]
            " 
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="
        h-auto flex-1 flex flex-row items-end justify-between relative mx-auto w-full
        px-[0%] 
        max-w-[1920px]
      ">
        
        {/* Left Section - Text Content */}
        <div className={`
            flex-1 z-[20] 
            flex flex-col justify-center items-start
            ${isEdge ? 'self-start wide:self-auto' : ''}
            pl-[8%] tablet:pl-[10%] wide:pl-[15%] 
            ${isEdge ? 'pb-[10vh] wide:pb-[14vh]' : 'pb-[12vh] tablet:pb-[10vh] wide:pb-[8vh]'}
            ${isEdge ? 'pt-[23vh] tablet:pt-[23vh] wide:pt-[27vh]' : 'pt-[24vh] tablet:pt-[25vh] wide:pt-[12vh]'}
        `}>
              {/* Badge */}
              <div className="mb-[1.5rem] bg-kelloggs-gold py-[0.6rem] px-[1.5rem] tablet:py-[0.8rem] tablet:px-[2rem] rounded-full inline-flex items-center justify-center shadow-md">
                <h3 className={`
                    m-0 font-medium leading-none tracking-normal text-kelloggs-red whitespace-nowrap
                    ${isEdge ? 'text-[clamp(1.2rem,1.5vw,1.6rem)]' : 'text-[clamp(1rem,1.3vw,1.4rem)]'}
                `}>
                    {banner.topheading}
                </h3>
              </div>

              {/* H1 Title */}
              <h1 className={`
                font-bold text-white text-left mb-[1.5rem] leading-[1.0]
                ${isEdge ? 'text-[clamp(3.5rem,5vw,6rem)]' : 'text-[clamp(3rem,4.5vw,5.5rem)]'}
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

              {/* Description */}
              <p className={`
                text-white font-medium leading-[1.4] mb-[2rem] text-left max-w-none
                ${isEdge ? 'text-[clamp(1.2rem,1.7vw,1.8rem)]' : 'text-[clamp(1rem,1.5vw,1.6rem)]'}
              `}>
                {banner.description}
              </p>

              {/* Button */}
              <button
                className={`
                    rounded-full border-none font-bold inline-flex items-center cursor-pointer transition-all duration-300 font-kelloggs shadow-lg
                    ${isHovered ? 'bg-kelloggs-gold scale-105' : 'bg-white scale-100'} text-kelloggs-red
                    text-[clamp(0.9rem,1.4vw,1.5rem)]
                    py-[clamp(0.7rem,1vh,1.1rem)] px-[clamp(1.5rem,2.2vw,2.5rem)] 
                `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Play Now
                <div 
                    className={`
                        w-[clamp(24px,2.5vw,36px)] h-[clamp(24px,2.5vw,36px)] rounded-full flex items-center justify-center ml-[clamp(8px,0.8vw,12px)]
                        bg-gradient-to-b from-[#ffb366] to-[#ff8a2b]
                        shadow-[2px_3px_0px_#E41F35,0_4px_12px_rgba(0,0,0,0.1)]
                        transition-all duration-300
                    `}
                >
                  <svg viewBox="0 0 24 24" fill="#fff" className="w-[60%] h-[60%] tablet:w-[70%] tablet:h-[70%]">
                    <polygon points="8,5 8,19 19,12" />
                  </svg>
                </div>
              </button>
        </div>

        {/* Right Section / Image Wrapper */}
        <div className="flex-1 h-full flex justify-end items-end relative z-[5]">
          {heroImage && (
            <>
              <img 
                src={heroImage} 
                alt="Hero" 
                className={`
                    relative object-contain object-bottom
                    max-w-none
                    w-auto
                    ${isEdge ? 'h-[clamp(72vh,96vh,108vh)]' : 'h-[clamp(85vh,115vh,130vh)] wide:h-[clamp(75vh,100vh,115vh)]'}
                    min-w-[300px] tablet:min-w-[500px]
                    mr-[5%] mb-0
                `} 
              />
              
              {/* Right Cloud - Bigger & Lower */}
              <Cloud className="
                top-[50%] right-[10%] w-[14%] z-[3] opacity-90
              " />

              {/* Left Cloud - Higher & Smaller */}
              <Cloud className="top-[20%] left-[5%] w-[8%] z-[4] opacity-90" />
            </>
          )}
        </div>

        {/* Floating Star - Moved Down */}
        {starImage && (
            <div className="
                absolute pointer-events-none z-[25] -rotate-12
                bottom-[-20%] left-[-5%] 
                tablet:bottom-[-30%] tablet:left-[0%]
                w-[15vw] min-w-[180px] max-w-[350px]
            ">
                <img src={starImage} alt="star" className="w-full h-auto drop-shadow-xl" />
            </div>
        )}
      </div>

    </div>
  );
};

export default HomeBanner;
