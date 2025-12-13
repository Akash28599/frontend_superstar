import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../fonts.css';

const HomeBanner = () => {
  const [banner, setBanner] = useState(null);
  const [cloudImage, setCloudImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('https://correct-prize-f0a5924469.strapiapp.com/api/homebanners?populate=*')
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
  }, []);

  if (loading) return <div style={loadingStyle}>Loading...</div>;
  if (!banner) return <div style={loadingStyle}>No banner data</div>;

  const logoImage =
    banner.nav_icon?.formats?.small?.url ||
    banner.nav_icon?.formats?.thumbnail?.url ||
    banner.nav_icon?.url;

  const heroImage =
    banner.image?.formats?.large?.url ||
    banner.image?.formats?.medium?.url ||
    banner.image?.url;

  const getCloudPositions = () => {
    if (screenWidth >= 1920) return { cloud1Right: '7%', cloud1Size: '10%' };
    if (screenWidth >= 1440) return { cloud1Right: '10%', cloud1Size: '10%' };
    if (screenWidth >= 1200) return { cloud1Right: '10%', cloud1Size: '10%' };
    if (screenWidth >= 1024) return { cloud1Right: '15%', cloud1Size: '9%' };
    return { cloud1Right: '7%', cloud1Size: '10%' };
  };

  const cloudPositions = getCloudPositions();

  const Cloud = ({ top, left, right, size, zIndex }) =>
    cloudImage && (
      <img
        src={cloudImage}
        alt="Cloud"
        style={{
          position: 'absolute',
          top,
          left,
          right,
          width: size,
          zIndex,
          pointerEvents: 'none',
        }}
      />
    );

  const iconCircleStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: isHovered ? '#F60945' : '#FCD34D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '12px',
  };

  return (
    <div style={containerStyle}>
      <Navbar />

      {logoImage && (
        <div style={logoContainerStyle}>
          <img src={logoImage} alt="Logo" style={logoStyle} />
        </div>
      )}

      <div style={contentStyle}>
        <div style={leftSectionStyle}>
          <div style={textContainerStyle}>
            <div style={badgeContainerStyle}>
              <div style={badgeStyle}>
                <h3 style={badgeTextStyle}>{banner.topheading}</h3>
              </div>
            </div>
            
            <div style={textColumnStyle}>
              <h1 style={h1Style}>{banner.title}</h1>
              <p style={descStyle}>{banner.description}</p>

              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: isHovered ? '#FCD34D' : '#fff',
                  color: '#F60945',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Play Now
                <div style={iconCircleStyle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                    <polygon points="8,5 8,19 19,12" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div style={imageWrapperStyle}>
          {heroImage && (
            <>
              <img src={heroImage} alt="Hero" style={heroImageStyle} />
              <Cloud top="36%" right={cloudPositions.cloud1Right} size={cloudPositions.cloud1Size} zIndex={3} />
              <Cloud top="18%" left="50%" size="7%" zIndex={4} />
            </>
          )}
        </div>
      </div>
      
      <style jsx="true">{`
        @media (min-width: 1440px) {
          .content-container {
            max-width: 1440px;
            margin: 0 auto;
          }
          .left-section { margin-top: 5%; }
          .h1-title { font-size: 90px; }
          .hero-image { right: 32%; transform: translateY(10%) scale(1.1); }
        }
        
        @media (min-width: 1920px) {
          .content-container { max-width: 1600px; }
          .left-section { margin-top: 6%; }
          .logo-container { left: 7%; width: 10rem; height: 12rem; }
          .logo-container img { width: 100px; height: 155px; }
          .h1-title { font-size: 100px; }
          .text-column { padding-left: 14%; }
          .description { font-size: 1.4rem; max-width: 580px; }
          .hero-image { right: 25%; transform: translateY(10%) scale(1.2); }
        }
        
        @media (min-width: 1600px) and (max-width: 1919px) {
          .content-container { max-width: 1400px; }
          .left-section { margin-top: 5.5%; }
          .logo-container { left: 6.5%; }
          .h1-title { font-size: 95px; }
          .hero-image { right: 28%; transform: translateY(10%) scale(1.15); }
        }
        
        @media (min-width: 1200px) and (max-width: 1599px) {
          .content-container { max-width: 1200px; }
          .left-section { margin-top: 4.5%; }
          .logo-container { left: 5.5%; width: 8rem; height: 10rem; }
          .logo-container img { width: 80px; height: 125px; }
          .h1-title { font-size: 80px; }
          .text-column { padding-left: 12%; }
          .description { font-size: 1.2rem; max-width: 480px; }
          .hero-image { right: 32%; transform: translateY(10%) scale(1); }
        }
        
        @media (min-width: 1024px) and (max-width: 1199px) {
          .content-container { max-width: 1100px; }
          .left-section { margin-top: 4%; }
          .logo-container { left: 5%; width: 7rem; height: 9rem; }
          .logo-container img { width: 70px; height: 110px; }
          .h1-title { font-size: 70px; }
          .text-column { padding-left: 11%; }
          .description { font-size: 1.1rem; max-width: 440px; }
          .hero-image { right: 35%; transform: translateY(10%) scale(0.95); }
        }
        
        @media (min-width: 800px) and (max-width: 1023px) {
          .content-container { max-width: 900px; gap: 30px; }
          .left-section { margin-top: 3%; }
          .logo-container { left: 4%; width: 6rem; height: 8rem; border-radius: 0 0 20px 20px; }
          .logo-container img { width: 60px; height: 95px; border-radius: 12px; }
          .h1-title { font-size: 60px; }
          .text-column { padding-left: 10%; }
          .description { font-size: 1rem; max-width: 380px; }
          .hero-image { right: 40%; transform: translateY(10%) scale(0.85); }
          .badge { padding: 0.6rem 1.2rem; }
          .badge h3 { font-size: 1rem; }
          button { font-size: 1.2rem; padding: 0.7rem 1.8rem; }
        }
        
        /* YOUR 1200px SHORT-HEIGHT LAPTOP FIX - MATCHES MACBOOK 13" */
        @media (max-width: 1250px) and (max-height: 750px) {
          .left-section { margin-top: 8% !important; }
          .hero-image { 
            right: 44% !important; 
            transform: translateY(7%) scale(1.3) !important; 
          }
          .text-column { padding-left: 12% !important; }
          .h1-title { font-size: 75px !important; }
          .description { font-size: 1.2rem !important; max-width: 450px !important; }
        }
        
        @media (min-width: 1280px) and (max-width: 1366px) {
          .left-section { margin-top: 6% !important; }
          .hero-image { right: 34% !important; transform: translateY(10%) scale(1.05) !important; }
        }
        
        @media (min-width: 1367px) and (max-width: 1439px) {
          .left-section { margin-top: 5.5% !important; }
          .hero-image { right: 32% !important; }
        }
        
        @media (min-width: 1441px) and (max-width: 1500px) {
          .left-section { margin-top: 5.2% !important; }
        }

        @media (max-height: 850px) {
          .content-container {
            padding: 2% 5% !important;
            align-items: flex-start !important;
            min-height: auto !important;
            height: auto !important;
          }
          .left-section { margin-top: 4% !important; padding-bottom: 2rem !important; }
          .text-column { margin-bottom: 1rem !important; }
          .description { margin-bottom: 1.5rem !important; }
          button { margin-bottom: 1rem !important; }
          .hero-image { height: 80vh !important; transform: translateY(5%) scale(1) !important; }
        }
      `}</style>
    </div>
  );
};

const containerStyle = {
  position: 'relative',
  minHeight: '100vh',
  backgroundColor: '#F60945',
  overflow: 'hidden',
  width: '100%',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
};

const loadingStyle = {
  minHeight: '100vh',
  backgroundColor: '#F60945',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
};

const logoContainerStyle = {
  position: 'absolute',
  top: '0%',
  left: '6%',
  width: '9rem',
  height: '11rem',
  backgroundColor: 'rgba(255,255,255,0.95)',
  borderRadius: '0 0 30px 30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  className: 'logo-container',
};

const logoStyle = {
  width: '90px',
  height: '140px',
  objectFit: 'contain',
  borderRadius: '16px',
};

const contentStyle = {
  height: 'auto',
  margin: '0 auto',
  padding: '0 5%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '50px',
  maxWidth: '1440px',
  className: 'content-container',
  paddingBottom: '5%',
};

const leftSectionStyle = {
  flex: '0 0 600px',
  zIndex: 5,
  marginTop: '9%',
  paddingLeft: '0',
  paddingBottom: '3rem',
  className: 'left-section',
};

const textContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingLeft: '12%',
};

const badgeContainerStyle = {
  marginBottom: '0.5rem',
  width: '100%',
  marginLeft: '0',
};

const badgeStyle = {
  backgroundColor: '#FCD34D',
  padding: '0.75rem 1.5rem',
  borderRadius: '26px',
  display: 'inline-block',
  marginRight: '10%',
  className: 'badge',
};

const badgeTextStyle = {
  margin: 0,
  fontFamily: "'Kellogg's Sans', sans-serif",
  fontWeight: 600,
  fontSize: '1.2rem',
  lineHeight: '100%',
  letterSpacing: '0%',
  color: '#F60945',
};

const textColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  maxWidth: '520px',
  marginLeft: '0',
  paddingLeft: '13%',
  className: 'text-column',
};

const h1Style = {
  fontFamily: "'Kellogg's Sans', sans-serif",
  fontWeight: 700,
  fontSize: '90px',
  lineHeight: '0.9',
  letterSpacing: '10%',
  margin: '0 0 1.2rem 0',
  color: '#fff',
  alignSelf: 'flex-start',
  width: '100%',
  textAlign: 'left',
  className: 'h1-title',
};

const descStyle = {
  color: '#fff',
  maxWidth: '520px',
  fontFamily: "'Kellogg's Sans', sans-serif",
  fontWeight: 500,
  fontSize: '1.3rem',
  lineHeight: '1.2',
  letterSpacing: '0%',
  marginBottom: '1.5rem',
  alignSelf: 'flex-start',
  textAlign: 'left',
  paddingLeft: '2%',
  className: 'description',
};

const buttonStyle = {
  padding: '0.75rem 2.5rem',
  borderRadius: '50px',
  border: 'none',
  backgroundColor: '#fff',
  color: '#F60945',
  fontFamily: "'Kellogg's Sans', sans-serif",
  fontWeight: 600,
  fontSize: '1.4rem',
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  alignSelf: 'flex-start',
};

const imageWrapperStyle = {
  flex: 1,
  width: '50%',
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  transform: 'none',
};

const heroImageStyle = {
  width: 'auto',
  height: '100%',
  maxWidth: '97vw',
  maxHeight: '97vh',
  objectFit: 'contain',
  position: 'relative',
  right: '44%',
  transform: 'translateY(7%) scale(1.4)',
  className: 'hero-image',
};

export default HomeBanner;
