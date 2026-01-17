import React, { useEffect, useState } from 'react';
import cloudImg from "../cloud1.png";
import waveImage from "../cocobanner.png";

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

  if (loading) return <div className="min-h-[500px] flex items-center justify-center text-white">Loading...</div>;
  if (!data) return <div className="min-h-[500px] flex items-center justify-center text-white">No data available</div>;

  const title = data.title;
  const description = data.description;
  const charImg = data.image?.url ?? null;

  return (
    <div className="relative w-full h-auto min-h-[500px] overflow-visible font-kelloggs transform translate-y-[-1px]">
      {/* Wave Background */}
      <div className="relative w-full h-full"> 
          <img
            src={waveImage}
            alt="wave background"
            className="w-full h-auto min-h-[500px] object-cover block relative z-10"
          />
      
          {/* Character Image - Hanging Effect */}
          {charImg && (
            <img
              src={charImg}
              alt="character"
              className="
                absolute z-20 pointer-events-none
                w-[30%] tablet:w-[28%] desktop:w-[30%] wide:w-[30%]
                -top-[10%] tablet:-top-[12%] wide:-top-[15%]
                left-[-1%] tablet:left-[0%]
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
                w-[25%] tablet:w-[15%]
                top-[10%] right-[5%]
                opacity-90
              "
            />
          )}

          {/* Text Content - Centered but shifted right slightly on small screens */}
          <div className="
            absolute top-1/2 left-[55%] tablet:left-1/2 -translate-x-1/2 -translate-y-1/2 
            flex flex-col items-center justify-center text-center 
            w-full max-w-[85%] tablet:max-w-[70%] desktop:max-w-[60%] 
            z-30 px-4 mt-[5%]
            pl-[10%] tablet:pl-0
          ">
            <h1 className="
              font-bold text-white leading-[1.0] drop-shadow-md mb-6
              text-[clamp(2rem,5vw,6rem)]
            ">
              {title}
            </h1>

            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className="
                text-white font-normal italic opacity-95 leading-[1.3]
                text-[clamp(0.9rem,2vw,2.2rem)]
              "
            />
          </div>
      </div>
    </div>
  );
};

export default CocoBanner;
