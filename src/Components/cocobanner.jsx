import React, { useEffect, useState } from 'react';
import cloudImg from "../cloud1.png";
import waveImage from "../cocobanner.png";
import '../fonts.css';

const CocoBanner = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBanner = async () => {
    try {
      const res = await fetch('https://correct-prize-f0a5924469.strapiapp.com/api/cocobanners?populate=*');
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
            bottom: "19%", 
            left: "14%", 
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
            top: "35%", 
            right: "11%", 
            zIndex: 1, 
            pointerEvents: "none",
            maxWidth: "100%",
            height: "auto"
          }}
        />
      )}

      {/* spoon cloud */}

      {/* Text content */}
      <div 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "12px", 
          position: "absolute", 
          top: "42%", 
          left: "22%",  
          textAlign: "center", 
          color: "white", 
          zIndex: 2,
          maxWidth: "80%"
        }}
      >
        <h1 
          style={{ 
            fontFamily: "'Kellogg's Sans', sans-serif",
            fontWeight: 650,
            marginBottom: "16px", 
            maxWidth: "72%",
            fontSize: "5.3rem",
            lineHeight: 1.2,
            letterSpacing: "0%",
          }}
        >
          {title}
        </h1>

        <div 
          dangerouslySetInnerHTML={{ __html: description }}
          style={{ 
             fontStyle: 'italic', 
            opacity: 0.9, 
            maxWidth: "75%", 
            position:'relative',
            lineHeight: "1.2",
            fontSize: "2.1rem",
            letterSpacing: "0%",
            right:"3%",
            bottom:'3%'
            
          }}
        />
      </div>
    </div>
  );
};

export default CocoBanner;