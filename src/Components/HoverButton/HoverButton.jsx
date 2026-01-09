import { useEffect, useState } from "react";
import './HoverButton.css'
const HoverButton = ({ text, onClick, title,style }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <button
            title={title}
            onClick={onClick}
            className='h-button'
            style={{
                fontSize: screenWidth >= 1440 ? '1.4rem' : '1.2rem',
                padding: screenWidth >= 1440 ? '0.75rem 2.5rem' : '0.6rem 2rem',
                ...style
            }}
        >
            {text}
            <div className='h-icon-circle'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                    <polygon points="8,5 8,19 19,12" />
                </svg>
            </div>
        </button>
    )
}
export default HoverButton