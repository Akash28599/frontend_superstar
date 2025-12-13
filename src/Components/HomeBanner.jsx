import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../fonts.css';

const HomeBanner = () => {
  const [banner, setBanner] = useState(null);
  const [cloudImage, setCloudImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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
        {/* LEFT SECTION */}
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

        {/* RIGHT SECTION */}
        <div style={imageWrapperStyle}>
          {heroImage && (
            <>
              <img src={heroImage} alt="Hero" style={heroImageStyle} />
              <Cloud top="30%" right="9%" size="20%" zIndex={3} />
              <Cloud top="8%" left="-6%" size="17%" zIndex={4} />
            </>
          )}
        </div>
      </div>
      
      {/* Add media query styles */}
      <style jsx="true">{`
        @media (max-width: 1400px) {
          .logo-container {
            left: 4% !important;
            width: 140px !important;
            height: 170px !important;
          }
          
          .logo-container img {
            width: 80px !important;
            height: 120px !important;
          }
          
          .h1-title {
            font-size: 75px !important;
            margin-left: 0 !important;
          }
          
          .text-column {
            padding-left: 10% !important;
          }
          
          .hero-image {
            right: 30% !important;
            transform: translateY(9%) scale(1.1) !important;
          }
        }
        
        @media (max-width: 1200px) {
          .logo-container {
            left: 3% !important;
            width: 120px !important;
            height: 150px !important;
          }
          
          .logo-container img {
            width: 70px !important;
            height: 110px !important;
          }
          
          .h1-title {
            font-size: 65px !important;
          }
          
          .description {
            font-size: 1.1rem !important;
            max-width: 450px !important;
          }
          
          .text-column {
            padding-left: 8% !important;
          }
          
          .hero-image {
            right: 25% !important;
          }
        }
        
        @media (max-width: 1024px) {
          .logo-container {
            left: 2% !important;
            width: 100px !important;
            height: 130px !important;
          }
          
          .logo-container img {
            width: 60px !important;
            height: 90px !important;
          }
          
          .h1-title {
            font-size: 55px !important;
          }
          
          .description {
            font-size: 1rem !important;
            max-width: 400px !important;
          }
          
          .text-column {
            padding-left: 6% !important;
          }
          
          .hero-image {
            right: 20% !important;
            transform: translateY(9%) scale(1) !important;
          }
        }
      `}</style>
    </div>
  );
};

/* ===================== ORIGINAL STYLES (keep as is) ===================== */

const containerStyle = {
  position: 'relative',
  minHeight: '100vh',
  backgroundColor: '#F60945',
  overflow: 'hidden',
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
  className: 'logo-container', // Added class for media queries
};

const logoStyle = {
  width: '90px',
  height: '140px',
  objectFit: 'contain',
  borderRadius: '16px',
};

const contentStyle = {
  minHeight: '100vh',
  margin: '0 auto',
  padding: '0 5%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '50px',
};

const leftSectionStyle = {
  flex: '0 0 600px',
  zIndex: 5,
  marginTop: '5%',
  paddingLeft: '0',
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
  className: 'text-column', // Added class for media queries
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
  textIndent: '100',
  paddingLeft: '0',
  textAlign: 'left',
  className: 'h1-title', // Added class for media queries
};

const descStyle = {
  color: '#fff',
  maxWidth: '520px',
  fontFamily: "'Kellogg's Sans', sans-serif",
  fontWeight: 500,
  fontSize: '1.3rem',
  lineHeight: '1.2',
  letterSpacing: '0%',
  marginBottom: '2.5rem',
  alignSelf: 'flex-start',
  textAlign: 'left',
  paddingLeft: '2%',
  className: 'description', // Added class for media queries
};

const buttonStyle = {
  padding: '0.75rem 2rem',
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
  height: 'calc(100vh - 50px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transform: 'translateY(2%)',
};

const heroImageStyle = {
  width: 'auto',
  height: '100%',
  maxWidth: '97vw',
  maxHeight: '97vh',
  objectFit: 'contain',
  position: 'relative',
  right: '40%',
  transform: 'translateY(9%) scale(1.2)',
  className: 'hero-image', // Added class for media queries
};

export default HomeBanner;