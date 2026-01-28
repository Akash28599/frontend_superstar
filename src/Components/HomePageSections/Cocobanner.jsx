import React, { useEffect, useState } from 'react';
import cloudImg from "../../cloud1.png";


const CocoBanner = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBanner = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/cocobanners?populate=*`);
      const resData = await res.json();
      setData(resData.data ? resData.data[0] : null);
    } catch (error) {
      console.error('Error fetching banner:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  if (loading) return <div className="min-h-[350px] flex items-center justify-center text-white">Loading...</div>;
  if (!data) return <div className="min-h-[350px] flex items-center justify-center text-white">No data available</div>;

  const title = data.title;
  const description = data.description;
  const charImg = data.image?.url ?? null;

  return (
    <div className="relative w-full overflow-visible font-kelloggs">
      {/* SVG Wave - White area with curvy red coming in from bottom-left */}
      <svg 
        viewBox="0 0 1440 400" 
        className="w-full h-auto block"
        preserveAspectRatio="none"
        style={{ marginBottom: '-2px' }}
      >
        {/* White background */}
        <rect x="0" y="0" width="1440" height="400" fill="white" />
        {/* Red wave - S-curve from bottom-left to top-right */}
        <path 
          fill="#F60945" 
          d="M0,120 C100,180 200,280 400,300 C600,320 800,180 1000,120 C1200,60 1350,40 1440,80 L1440,400 L0,400 Z"
        />
      </svg>

      {/* Red Background Container - seamlessly connects to wave */}
      <div className="relative w-full bg-[#F60945]"> 
        <div className="py-12 md:py-16 lg:py-[2%]">
          
          {charImg && (
            <img
              src={charImg}
              alt="character"
              className="
                absolute z-20 pointer-events-none
                w-[160px] md:w-[200px] lg:w-[30%] tablet:w-[28%] desktop:w-[30%] wide:w-[30%]
                -top-[90px] md:-top-[110px] lg:-top-[80%] tablet:-top-[90%] wide:-top-[100%]
                left-[-10px] md:left-[-10px] lg:left-[-1%] tablet:left-[0%]
                drop-shadow-2xl
              "
            />
          )}

          {/* Title Cloud - Right Side */}
          {cloudImg && (
            <img
              src={cloudImg}
              alt="cloud"
              className="
                absolute z-20 pointer-events-none
                w-[15%] md:w-[12%] lg:w-[12%] tablet:w-[10%]
                -top-[10%] lg:-top-[30%] right-[5%] lg:right-[8%]
                opacity-90
              "
            />
          )}

          {/* Text Content - Shifted to avoid overlap */}
          <div className="
            relative flex flex-col items-center justify-center text-center 
            w-full max-w-[90%] md:max-w-[80%] lg:max-w-[55%] 
            z-30 px-4 mx-auto
            mt-[80px] md:mt-[100px] lg:mt-0 
            lg:ml-[50%] lg:-translate-x-1/2
          ">
            <h1 className="
              font-bold text-white leading-[1.0] drop-shadow-md mb-6
              text-[2rem] md:text-[2.8rem] lg:text-[clamp(2rem,5vw,6rem)]
            ">
              {title}
            </h1>

            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className="
                text-white font-normal italic opacity-95 leading-[1.3]
                text-[1rem] md:text-[1.2rem] lg:text-[clamp(0.9rem,2vw,2.2rem)]
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocoBanner;
