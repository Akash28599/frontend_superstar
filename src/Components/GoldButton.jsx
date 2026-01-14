import { useState } from "react";

const GoldButton=({buttonText,onClick,buttonStyle})=>{
      const [isHovered, setIsHovered] = useState(false);
    
    return(
          <button
          onClick={onClick}
            className={`
                    rounded-full border-none font-bold inline-flex items-center cursor-pointer transition-all duration-300 font-kelloggs shadow-lg
                    ${isHovered ? 'bg-kelloggs-gold' : 'bg-white'} text-kelloggs-red
                    text-[clamp(0.9rem,1.4vw,1.5rem)]
                    py-[clamp(0.7rem,1vh,1.1rem)] px-[clamp(1.5rem,2.2vw,2.5rem)]
                    flex justify-around
                    ${buttonStyle}
                `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {buttonText}
            <div
              className={`
                        w-[clamp(24px,2.5vw,36px)] h-[clamp(24px,2.5vw,36px)] rounded-full flex items-center justify-center ml-[clamp(8px,0.8vw,12px)]
                        bg-gradient-to-b from-[#ffb366] to-[#ff8a2b]
                        shadow-[2px_3px_0px_#E41F35,0_4px_12px_rgba(0,0,0,0.1)]
                        transition-all duration-300
                         ${isHovered ? 'scale-110' : 'scale-100'}
                    `}
            >
              <svg viewBox="0 0 24 24" fill="#fff" className={`w-[60%] h-[60%] tablet:w-[70%] tablet:h-[70%]`}>
                <polygon points="8,5 8,19 19,12" />
              </svg>
            </div>
          </button>
    )
}
export default GoldButton