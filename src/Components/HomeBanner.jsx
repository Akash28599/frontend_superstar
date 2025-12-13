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
      
      {/* Proportional scaling for all laptops */}
      <style jsx="true">{`
        /* Base scaling for different screen sizes */
        @media (min-width: 1920px) {
          /* 4K screens - keep original size */
        }
        
        @media (max-width: 1919px) and (min-width: 1600px) {
          /* Large laptops - 95% scale */
          .logo-container {
            left: 5.7% !important; /* 6% * 0.95 */
            width: 8.55rem !important; /* 9rem * 0.95 */
            height: 10.45rem !important; /* 11rem * 0.95 */
          }
          
          .logo-container img {
            width: 85.5px !important; /* 90px * 0.95 */
            height: 133px !important; /* 140px * 0.95 */
          }
          
          .h1-title {
            font-size: 85.5px !important; /* 90px * 0.95 */
          }
          
          .text-column {
            padding-left: 12.35% !important; /* 13% * 0.95 */
          }
          
          .description {
            font-size: 1.235rem !important; /* 1.3rem * 0.95 */
          }
          
          .hero-image {
            right: 38% !important; /* 40% * 0.95 */
            transform: translateY(9%) scale(1.14) !important; /* 1.2 * 0.95 */
          }
        }
        
        @media (max-width: 1599px) and (min-width: 1400px) {
          /* Medium laptops - 90% scale */
          .logo-container {
            left: 5.4% !important; /* 6% * 0.9 */
            width: 8.1rem !important; /* 9rem * 0.9 */
            height: 9.9rem !important; /* 11rem * 0.9 */
          }
          
          .logo-container img {
            width: 81px !important; /* 90px * 0.9 */
            height: 126px !important; /* 140px * 0.9 */
          }
          
          .h1-title {
            font-size: 81px !important; /* 90px * 0.9 */
          }
          
          .text-column {
            padding-left: 11.7% !important; /* 13% * 0.9 */
          }
          
          .description {
            font-size: 1.17rem !important; /* 1.3rem * 0.9 */
          }
          
          .hero-image {
            right: 36% !important; /* 40% * 0.9 */
            transform: translateY(9%) scale(1.08) !important; /* 1.2 * 0.9 */
          }
        }
        
        @media (max-width: 1399px) and (min-width: 1200px) {
          /* Small laptops - 85% scale */
          .logo-container {
            left: 5.1% !important; /* 6% * 0.85 */
            width: 7.65rem !important; /* 9rem * 0.85 */
            height: 9.35rem !important; /* 11rem * 0.85 */
          }
          
          .logo-container img {
            width: 76.5px !important; /* 90px * 0.85 */
            height: 119px !important; /* 140px * 0.85 */
          }
          
          .h1-title {
            font-size: 76.5px !important; /* 90px * 0.85 */
          }
          
          .text-column {
            padding-left: 11.05% !important; /* 13% * 0.85 */
          }
          
          .description {
            font-size: 1.105rem !important; /* 1.3rem * 0.85 */
            max-width: 442px !important; /* 520px * 0.85 */
          }
          
          .hero-image {
            right: 34% !important; /* 40% * 0.85 */
            transform: translateY(9%) scale(1.02) !important; /* 1.2 * 0.85 */
          }
        }
        
        @media (max-width: 1199px) and (min-width: 1024px) {
          /* Very small laptops - 80% scale */
          .logo-container {
            left: 4.8% !important; /* 6% * 0.8 */
            width: 7.2rem !important; /* 9rem * 0.8 */
            height: 8.8rem !important; /* 11rem * 0.8 */
          }
          
          .logo-container img {
            width: 72px !important; /* 90px * 0.8 */
            height: 112px !important; /* 140px * 0.8 */
          }
          
          .h1-title {
            font-size: 72px !important; /* 90px * 0.8 */
          }
          
          .text-column {
            padding-left: 10.4% !important; /* 13% * 0.8 */
          }
          
          .description {
            font-size: 1.04rem !important; /* 1.3rem * 0.8 */
            max-width: 416px !important; /* 520px * 0.8 */
          }
          
          .hero-image {
            right: 32% !important; /* 40% * 0.8 */
            transform: translateY(9%) scale(0.96) !important; /* 1.2 * 0.8 */
          }
        }
        
        /* Ensure button scales proportionally */
        .play-button {
          font-size: calc(1.4rem * var(--scale-factor, 1)) !important;
          padding: calc(0.75rem * var(--scale-factor, 1)) calc(2rem * var(--scale-factor, 1)) !important;
        }
        
        /* Dynamic scaling with viewport width */
        @media (max-width: 1800px) {
          :root {
            --scale-factor: calc(100vw / 1920);
          }
          
          .logo-container {
            left: calc(6% * var(--scale-factor)) !important;
            width: calc(9rem * var(--scale-factor)) !important;
            height: calc(11rem * var(--scale-factor)) !important;
          }
          
          .h1-title {
            font-size: calc(90px * var(--scale-factor)) !important;
          }
          
          .description {
            font-size: calc(1.3rem * var(--scale-factor)) !important;
            max-width: calc(520px * var(--scale-factor)) !important;
          }
          
          .text-column {
            padding-left: calc(13% * var(--scale-factor)) !important;
          }
          
          .hero-image {
            right: calc(40% * var(--scale-factor)) !important;
            transform: translateY(9%) scale(calc(1.2 * var(--scale-factor))) !important;
          }
        }
      `}</style>
    </div>
  );
};

/* ===================== ORIGINAL STYLES ===================== */

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
  className: 'logo-container',
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
  marginBottom: '2.5rem',
  alignSelf: 'flex-start',
  textAlign: 'left',
  paddingLeft: '2%',
  className: 'description',
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
  className: 'play-button',
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
  className: 'hero-image',
};

export default HomeBanner;