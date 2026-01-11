import React, { useEffect, useState } from 'react';
import cloudImg from "../cloud1.png";
import waveImage from "../cocobanner.png";
import { constants } from '../Utils/constants';


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

  // Fluid positions using percentages where possible to avoid rigid breakpoints
  const getPositions = () => {
    // Large screens (1600+)
    if (screenWidth >= 1600) return {
      charTop: '-5%', charLeft: '-2%',
      cloudTop: '10%', cloudRight: '10%',
      textTop: '38%',
      maxWidth: '1200px',
      titleSize: '6rem', descSize: '2.5rem',
      charWidth: '50%' // Increased for 100% scale users
    };

    // Standard desktops (1366 - 1599)
    if (screenWidth >= 1366) return {
      charTop: '-5%', charLeft: '-2%',
      cloudTop: '15%', cloudRight: '8%',
      textTop: '42%',
      maxWidth: '1000px',
      titleSize: '5.2rem', descSize: '1.8rem',
      charWidth: '35%'
    };

    // Laptops (1200 - 1365)
    if (screenWidth >= 1200) return {
      charTop: '-2%', charLeft: '0%',
      cloudTop: '15%', cloudRight: '5%',
      textTop: '45%',
      maxWidth: '800px',
      titleSize: '3.5rem', descSize: '1.5rem',
      charWidth: '35%'
    };

    // Smaller desktops/Tablets (1024 - 1199)
    return {
      charTop: '0%', charLeft: '0%',
      cloudTop: '20%', cloudRight: '5%',
      textTop: '50%',
      maxWidth: '700px',
      titleSize: '3rem', descSize: '1.3rem',
      charWidth: '35%'
    };
  };

  const positions = getPositions();

  return (
    <div style={{ position: "relative", width: "100%", height: "auto" }}>
      {/* wave background */}
      <img
        src={waveImage}
        alt="wave background"
        style={{
          width: "100%", display: "block", position: "relative",
          height: "auto",
          minHeight: "500px", // Ensure minimum height
          objectFit: "cover"
        }} />

      {/* character image */}
      {charImg && (
        <img
          src={charImg}
          alt="character"
          style={{
            position: "absolute",
            top: positions.charTop,
            left: positions.charLeft,
            zIndex: 2,
            pointerEvents: "none",
            maxWidth: positions.charWidth,
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
            maxWidth: "25%",
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
          left: "55%",
          transform: "translateX(-50%)",
          textAlign: "center",
          color: "white",
          zIndex: 2,
          width: "100%",
          maxWidth: positions.maxWidth, 
          padding: "0 20px"
        }}
      >
        <h1
          style={{
            fontWeight: 700,
            marginBottom: "16px",
            fontSize: positions.titleSize,
            lineHeight: 1.1,
            letterSpacing: "0%",
            fontFamily: constants.fontFamily
          }}
        >
          {title}
        </h1>

        <div
          dangerouslySetInnerHTML={{ __html: description }}
          style={{
            fontFamily: constants.fontFamily,
            fontWeight: 400,
            fontStyle: "italic",
            opacity: 0.9,
            position: 'relative',
            lineHeight: "1.2",
            fontSize: positions.descSize,
            letterSpacing: "0%",
          }}
        />
      </div>

    </div>
  );
};

export default CocoBanner;
