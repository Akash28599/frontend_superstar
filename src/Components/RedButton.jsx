import { useState } from "react";

const RedButton = ({ buttonText, onClick, buttonStyle,disabled=false }) => {
  const [isHovered, setIsHovered] = useState(false);
   const baseColor = disabled
    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
    : isHovered
      ? 'bg-white text-kelloggs-red'
      : 'bg-kelloggs-red text-white';
  return (
    <button className={`
      border-2 border-solid
       ${disabled?'border-gray-400':'border-kelloggs-red'}
      rounded-[12px]
      font-bold
      p-4
      ${baseColor}
      ${buttonStyle}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
    >
      {buttonText}
    </button>
  )
}
export default RedButton