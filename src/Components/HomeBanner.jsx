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

  // ✅ FIXED: 1st CLOUD MORE RIGHT FOR MACBOOK (13%)
  const getCloudPositions = () => {
    if (screenWidth >= 1920) return { cloud1Right: '7%', cloud1Size: '10%' };
    if (screenWidth >= 1440) return { cloud1Right: '13%', cloud1Size: '10%' };  // ✅ +3% RIGHT
    if (screenWidth >= 1200) return { cloud1Right: '15%', cloud1Size: '9%' };
    if (screenWidth >= 1024) return { cloud1Right: '15%', cloud1Size: '8%' };
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
    background: isHovered ? 'linear-gradient(180deg,#ffb366,#ff8a2b)' : 'linear-gradient(180deg,#ffb366,#ff8a2b)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '12px',
    boxShadow: '2px 3px 0px #F60945, 0 4px 12px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  };

  const dynamicLeftSectionStyle = {
    flex: screenWidth >= 1440 ? '0 0 550px' : '0 0 480px',
    zIndex: 5,
    marginTop: screenWidth >= 1440 ? '10%' : '9%',
    paddingLeft: '0',
    paddingBottom: '1.5rem',
    maxWidth: screenWidth >= 1440 ? '550px' : '480px',
    className: 'left-section',
  };

  const dynamicContentStyle = {
    height: screenWidth >= 1440 ? '95vh' : '100vh',     // ✅ SMALLER RED for MacBook
    margin: '0 auto',
    padding: screenWidth >= 1440 ? '0 3%' : '0 1.5%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: screenWidth >= 1440 ? 'center' : 'flex-start',
    gap: screenWidth >= 1440 ? '35px' : '20px',
    maxWidth: '100%',
    overflow: 'visible',
    className: 'content-container',
  };

  // ✅ HERO TOP UP: 0% (MacBook only)
  const dynamicHeroImageStyle = {
    width: 'auto',
    height: screenWidth >= 1440 ? '115vh' : '100%',
    maxWidth: screenWidth >= 1440 ? '97vw' : '92vw',
    maxHeight: screenWidth >= 1440 ? '115vh' : '92vh',
    objectFit: 'contain',
    position: 'relative',
    right: screenWidth >= 1440 ? '45%' : '40%',
    top: screenWidth >= 1440 ? '4%' : '0%',              // ✅ TOP UP: -5% → 0%
    transform: screenWidth >= 1440 ? 'none' : 'translateY(10%) scale(1.4)',
    className: 'hero-image',
  };

  return (
    <div style={containerStyle}>
      <Navbar />

      {logoImage && (
        <div style={{
          ...logoContainerStyle,
          left: screenWidth >= 1440 ? '6%' : '4%'
        }}>
          <img src={logoImage} alt="Logo" style={logoStyle} />
        </div>
      )}

      <div style={dynamicContentStyle}>
        <div style={dynamicLeftSectionStyle}>
          <div style={{
            ...textContainerStyle,
            paddingLeft: screenWidth >= 1440 ? '12%' : '10%'
          }}>
            <div style={badgeContainerStyle}>
              <div style={badgeStyle}>
                <h3 style={{
                  ...badgeTextStyle,
                  fontSize: screenWidth >= 1440 ? '1.2rem' : '1rem'
                }}>{banner.topheading}</h3>
              </div>
            </div>

            <div style={{
              ...textColumnStyle,
              paddingLeft: screenWidth >= 1440 ? '13%' : '10%',
              maxWidth: screenWidth >= 1440 ? '520px' : '450px'
            }}>
              <h1 style={{
                ...h1Style,
                fontSize: screenWidth >= 1440 ? '82px' : '75px',
                lineHeight: screenWidth >= 1440 ? '1.05' : '0.9',
                maxHeight: screenWidth >= 1440 ? '175px' : '140px',
                overflow: 'hidden'
              }}>
                {banner.title}
              </h1>
              <p style={{
                ...descStyle,
                fontSize: screenWidth >= 1440 ? '1.3rem' : '1.1rem',
                maxWidth: screenWidth >= 1440 ? '520px' : '450px'
              }}>{banner.description}</p>

              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: isHovered ? '#FCD34D' : '#fff',
                  color: '#F60945',
                  fontSize: screenWidth >= 1440 ? '1.4rem' : '1.2rem',
                  padding: screenWidth >= 1440 ? '0.75rem 2.5rem' : '0.6rem 2rem'
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

        <div style={{
          ...imageWrapperStyle,
          width: screenWidth >= 1440 ? '50%' : '45%',
          maxWidth: screenWidth >= 1440 ? 'none' : '600px',
          height: screenWidth >= 1440 ? '125vh' : 'auto'
        }}>
          {heroImage && (
            <>
              <img src={heroImage} alt="Hero" style={dynamicHeroImageStyle} />
              <Cloud top="36%" right={cloudPositions.cloud1Right} size={cloudPositions.cloud1Size} zIndex={3} />
              <Cloud top="18%" left="40%" size="7%" zIndex={4} />
            </>
          )}
        </div>
      </div>

      <style jsx="true">{`
        @media (min-width: 1440px) {
          .content-container { 
            height: 95vh !important;       /* ✅ SMALLER RED */
            max-width: 1440px; 
            margin: 0 auto; 
            overflow: visible !important;
          }
          .left-section { margin-top: 10%; }
          .h1-title { 
            font-size: 82px !important;
            line-height: 1.05 !important;
            max-height: 175px !important;
            overflow: hidden !important;
          }
          .hero-image { 
            height: 115vh !important;
            max-height: 115vh !important;
            right: 45% !important;
            top: 0% !important;              /* ✅ TOP UP */
            transform: none !important;
          }
          .image-wrapper {
            height: 125vh !important;
          }
        }
        
        @media (max-width: 1439px) {
          .content-container {
            padding: 0 1.5% !important;
            gap: 20px !important;
            height: 100vh !important;
            overflow: hidden !important;
          }
          .left-section {
            margin-top: 9% !important;
            flex: 0 0 480px !important;
            max-width: 480px !important;
            padding-bottom: 1rem !important;
          }
          .text-column {
            padding-left: 10% !important;
            max-width: 450px !important;
          }
          .h1-title { font-size: 75px !important; }
          .description { 
            font-size: 1.1rem !important; 
            max-width: 450px !important; 
          }
          .logo-container { left: 4% !important; }
          .hero-image { 
            max-width: 92vw !important;
            max-height: 92vh !important;
            right: 40% !important;
            transform: translateY(18%) scale(1.4) !important;
          }
          .image-wrapper {
            width: 45% !important;
            max-width: 600px !important;
          }
        }
        
        @media (max-height: 850px) {
          .content-container { padding: 2% 1.5% !important; align-items: flex-start !important; }
          .left-section { margin-top: 7% !important; padding-bottom: 1rem !important; }
          .hero-image { height: 85vh !important; transform: translateY(15%) scale(1.3) !important; }
        }
      `}</style>
    </div>
  );
};

const containerStyle = {
  position: 'relative',
  height: '113vh',
  backgroundColor: '#F60945',
  overflow: 'hidden',
  width: '100vw',
  margin: 0,
  padding: 0,
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
  fontSize: '82px',
  lineHeight: '1.05',
  letterSpacing: '8%',
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
  className: 'image-wrapper',
};

export default HomeBanner;
