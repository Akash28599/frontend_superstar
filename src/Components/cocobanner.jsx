import React, { useEffect, useState } from 'react';
import cloudImg from "../cloud1.png";
import waveImage from "../cocobanner.png";


const CocoBanner = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Responsive width tracking
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  const title = data.title;
  const description = data.description;
  const charImg = data.image?.url ?? null;

  // ✅ DYNAMIC POSITIONS FOR YOUR LAPTOPS
  const getPositions = () => {
    if (screenWidth >= 1920) return { // Large desktop - your "good" laptop
      charBottom: '19%', charLeft: '14%',
      cloudTop: '35%', cloudRight: '11%',
      textTop: '42%', textLeft: '22%',
      titleSize: '5.6rem', descSize: '2.1rem'
    };
    
    if (screenWidth >= 1440) return { // Medium desktop 
      charBottom: '22%', charLeft: '14%',
      cloudTop: '38%', cloudRight: '13%',
      textTop: '45%', textLeft: '25%',
      titleSize: '4.8rem', descSize: '1.9rem'
    };
    
    if (screenWidth >= 1200) return { // Your smaller laptop - adjusted
      charBottom: '15%', charLeft: '17%',
      cloudTop: '39%', cloudRight: '10%',
      textTop: '48%', textLeft: '28%',
      titleSize: '4.2rem', descSize: '1.7rem'
    };

    return { // Fallback
      charBottom: '28%', charLeft: '20%',
      cloudTop: '45%', cloudRight: '17%',
      textTop: '50%', textLeft: '30%',
      titleSize: '3.8rem', descSize: '1.5rem'
    };
  };

  const positions = getPositions();

  return (
    <div style={{ position: "relative", width: "100%", height: "auto" }}>
      {/* wave background */}
      <img 
        src={waveImage} 
        alt="wave background" 
        style={{ width: "100%", display: "block", position: "relative" }} 
      />

      {/* character image */}
      {charImg && (
        <img 
          src={charImg} 
          alt="character" 
          style={{ 
            position: "absolute", 
            bottom: positions.charBottom, 
            left: positions.charLeft, 
            transform: "translateX(-50%)", 
            zIndex: 2, 
            pointerEvents: "none",
            maxWidth: "100%",
            height: "auto"
          }}
        />
      )}

      {/* title cloud */}
      {cloudImg && (
        <img 
          src={cloudImg} 
          alt="cloud" 
          style={{ 
            position: "absolute", 
            top: positions.cloudTop, 
            right: positions.cloudRight, 
            zIndex: 1, 
            pointerEvents: "none",
            maxWidth: "100%",
            height: "auto"
          }}
        />
      )}

      {/* Text content */}
      <div 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "12px", 
          position: "absolute", 
          top: positions.textTop, 
          left: positions.textLeft, 
          textAlign: "center", 
          color: "white", 
          zIndex: 2,
          maxWidth: "80%"
        }}
      >
        <h1 
          style={{ 
            fontWeight: 700,
            marginBottom: "16px", 
            maxWidth: "72%",
            fontSize: positions.titleSize,
            lineHeight: 1.2,
            letterSpacing: "0%",
          }}
        >
          {title}
        </h1>

        <div 
          dangerouslySetInnerHTML={{ __html: description }}
          style={{ 
            fontFamily: "Kellogg's Sans",
            fontWeight: 400,
            fontStyle:"italic",
            opacity: 0.9, 
            maxWidth: "75%", 
            position: 'relative',
            lineHeight: "1.2",
            fontSize: positions.descSize,
            letterSpacing: "0%",
            right: "3%",
            bottom: '3%'
          }}
        />
      </div>

      {/* ✅ DESKTOP-ONLY RESPONSIVE STYLES */}
      <style jsx>{`
        @media (max-width: 1199px) {
          /* Tablet/mobile - hide or simplify */
          h1 { font-size: 3rem !important; }
          div[style*="dangerouslySetInnerHTML"] { 
            font-size: 1.3rem !important; 
          }
        }
        
        @media (min-width: 1200px) and (max-width: 1439px) {
          /* Your smaller laptop - perfect fit */
          img[alt="character"] { bottom: ${positions.charBottom} !important; left: ${positions.charLeft} !important; }
          img[alt="cloud"] { top: ${positions.cloudTop} !important; right: ${positions.cloudRight} !important; }
          div[style*="position: absolute"][style*="top: 42%"] { 
            top: ${positions.textTop} !important; left: ${positions.textLeft} !important; 
          }
        }
        
        @media (min-width: 1440px) and (max-width: 1919px) {
          /* Medium desktops */
          img[alt="character"] { bottom: ${positions.charBottom} !important; left: ${positions.charLeft} !important; }
          img[alt="cloud"] { top: ${positions.cloudTop} !important; right: ${positions.cloudRight} !important; }
          div[style*="position: absolute"][style*="top: 42%"] { 
            top: ${positions.textTop} !important; left: ${positions.textLeft} !important; 
          }
        }
        
        @media (min-width: 1920px) {
          /* Your big "good" laptop - original positions */
          img[alt="character"] { bottom: 19% !important; left: 14% !important; }
          img[alt="cloud"] { top: 35% !important; right: 11% !important; }
          div[style*="position: absolute"][style*="top: 42%"] { top: 42% !important; left: 22% !important; }
        }
      `}</style>
    </div>
  );
};

export default CocoBanner;
