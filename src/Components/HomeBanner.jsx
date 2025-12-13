import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import '../fonts.css';

const HomeBanner = () => {
  const [banner, setBanner] = useState(null);
  const [cloudImage, setCloudImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const containerRef = useRef(null);

  // Calculate scale factor with better thresholds
  useEffect(() => {
    const calculateScale = () => {
      const baseWidth = 1440; // Using your MacBook 13" as base (1440px width)
      const currentWidth = window.innerWidth;
      let factor = currentWidth / baseWidth;
      
      // More aggressive scaling for larger screens, less for smaller
      if (currentWidth >= 1920) {
        factor = 1.2; // 4K screens - slightly bigger
      } else if (currentWidth >= 1600) {
        factor = 1.1; // Large laptops
      } else if (currentWidth <= 1024) {
        factor = Math.max(0.85, factor); // Minimum scale for tablets
      } else if (currentWidth <= 768) {
        factor = Math.max(0.7, factor); // Minimum scale for mobile
      }
      
      setScaleFactor(factor);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
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

  const Cloud = ({ top, left, right, size, zIndex }) =>
    cloudImage && (
      <img
        src={cloudImage}
        alt="Cloud"
        style={{
          position: 'absolute',
          top: `calc(${top} * ${scaleFactor})`,
          left: left && `calc(${left} * ${scaleFactor})`,
          right: right && `calc(${right} * ${scaleFactor})`,
          width: `calc(${size} * ${Math.max(1, scaleFactor)})`, // Clouds scale up more
          minWidth: '80px',
          zIndex,
          pointerEvents: 'none',
        }}
      />
    );

  const iconCircleStyle = {
    width: `${36 * scaleFactor}px`,
    height: `${36 * scaleFactor}px`,
    borderRadius: '50%',
    backgroundColor: isHovered ? '#F60945' : '#FCD34D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: `${12 * scaleFactor}px`,
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <Navbar scaleFactor={scaleFactor} />

      {logoImage && (
        <div style={{
          ...logoContainerStyle,
          left: `${6 * scaleFactor}%`,
          width: `${9 * scaleFactor}rem`,
          height: `${11 * scaleFactor}rem`,
          borderRadius: `0 0 ${30 * scaleFactor}px ${30 * scaleFactor}px`,
        }}>
          <img 
            src={logoImage} 
            alt="Logo" 
            style={{
              width: `${90 * scaleFactor}px`,
              height: `${140 * scaleFactor}px`,
              objectFit: 'contain',
              borderRadius: `${16 * scaleFactor}px`,
            }} 
          />
        </div>
      )}

      <div style={contentStyle}>
        {/* Main Grid Container */}
        <div style={{
          ...gridContainer,
          gridTemplateColumns: `minmax(500px, 1fr) minmax(600px, 1.2fr)`,
          gap: `${Math.min(80, 80 * scaleFactor)}px`,
        }}>
          {/* LEFT SECTION - Text Content */}
          <div style={{
            ...textColumnStyle,
            // Remove padding-left here and control alignment through badgeContainerStyle
          }}>
            <div style={{
              ...badgeContainerStyle,
              // Align badge with its container width
              marginLeft: '0',
              paddingLeft: `${13 * scaleFactor}%`, // Same as your original 13%
            }}>
              <div style={{
                ...badgeStyle,
                padding: `${0.75 * scaleFactor}rem ${1.5 * scaleFactor}rem`,
                borderRadius: `${26 * scaleFactor}px`,
                // Remove marginRight to let padding control alignment
                marginRight: '0',
              }}>
                <h3 style={{
                  ...badgeTextStyle,
                  fontSize: `${1.2 * scaleFactor}rem`,
                }}>{banner.topheading}</h3>
              </div>
            </div>
            
            {/* Title container with same alignment */}
            <div style={{
              ...titleContainerStyle,
              paddingLeft: `${13 * scaleFactor}%`, // Same alignment as badge
            }}>
              <h1 style={{
                ...h1Style,
                fontSize: `clamp(3.5rem, ${9 * scaleFactor}vw, ${90 * scaleFactor}px)`,
                marginBottom: `${1.2 * scaleFactor}rem`,
                lineHeight: 0.9,
                // Remove any left padding/margin that might cause misalignment
                paddingLeft: '0',
                marginLeft: '0',
              }}>{banner.title}</h1>
              
              <p style={{
                ...descStyle,
                fontSize: `${1.3 * scaleFactor}rem`,
                maxWidth: `${520 * scaleFactor}px`,
                marginBottom: `${2.5 * scaleFactor}rem`,
                // Align with title
                paddingLeft: '0',
                marginLeft: '0',
              }}>{banner.description}</p>

              <button
                style={{
                  ...buttonStyle,
                  padding: `${0.85 * scaleFactor}rem ${2 * scaleFactor}rem`,
                  borderRadius: `${50 * scaleFactor}px`,
                  fontSize: `${1.4 * scaleFactor}rem`,
                  backgroundColor: isHovered ? '#FCD34D' : '#fff',
                  color: '#F60945',
                  // Align with title and description
                  marginLeft: '0',
                  paddingLeft: '0',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Play Now
                <div style={iconCircleStyle}>
                  <svg 
                    width={`${20 * scaleFactor}px`}
                    height={`${20 * scaleFactor}px`}
                    viewBox="0 0 24 24" 
                    fill="#fff"
                  >
                    <polygon points="8,5 8,19 19,12" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* RIGHT SECTION - Hero Image (BIGGER) */}
          <div style={{
            ...imageColumnStyle,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
            {heroImage && (
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* Hero Image - Much Bigger */}
                <img 
                  src={heroImage} 
                  alt="Hero" 
                  style={{
                    ...heroImageStyle,
                    height: `${100 * Math.min(1.2, scaleFactor)}vh`,
                    maxHeight: '95vh',
                    minHeight: '500px',
                    width: 'auto',
                    maxWidth: 'none',
                    objectFit: 'contain',
                    transform: `scale(${1.1 * scaleFactor})`,
                    marginLeft: `${-120 * scaleFactor}%`, // Bring it closer to center
                    marginTop:`${20 * scaleFactor}%`,
                  }} 
                />
                
                {/* Clouds positioned relative to the hero image */}
                {cloudImage && (
                  <>
                    <img
                      src={cloudImage}
                      alt="Cloud"
                      style={{
                        position: 'absolute',
                        top: '30%',
                        right: '38%',
                        width: `${20 * Math.max(1, scaleFactor)}%`,
                        maxWidth: '300px',
                        minWidth: '120px',
                        zIndex: 3,
                        pointerEvents: 'none',
                      }}
                    />
                    <img
                      src={cloudImage}
                      alt="Cloud"
                      style={{
                        position: 'absolute',
                        top: '8%',
                        left: '-18%',
                        width: `${17 * Math.max(1, scaleFactor)}%`,
                        maxWidth: '250px',
                        minWidth: '100px',
                        zIndex: 4,
                        pointerEvents: 'none',
                      }}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive CSS */}
      <style jsx="true">{`
        @media (max-width: 1400px) {
          .grid-container {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
          
          .hero-image {
            transform: scale(${1.05 * Math.min(1, scaleFactor)}) !important;
            margin-left: -5% !important;
          }
          
          /* Adjust alignment for smaller screens */
          .badge-container, .title-container {
            padding-left: calc(10% * ${scaleFactor}) !important;
          }
        }
        
        @media (max-width: 1200px) {
          .grid-container {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto !important;
            gap: 30px !important;
          }
          
          .text-column {
            order: 2 !important;
            text-align: center !important;
            align-items: center !important;
            padding: 0 !important;
          }
          
          .badge-container, .title-container {
            padding-left: 0 !important;
            align-items: center !important;
            text-align: center !important;
          }
          
          .image-column {
            order: 1 !important;
            height: 60vh !important;
            min-height: 400px !important;
          }
          
          .hero-image {
            height: 80vh !important;
            max-height: 600px !important;
            margin-left: 0 !important;
            transform: scale(1) !important;
          }
        }
        
        @media (max-width: 768px) {
          .grid-container {
            gap: 20px !important;
          }
          
          .hero-image {
            height: 50vh !important;
            min-height: 300px !important;
          }
          
          .logo-container {
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 7rem !important;
            height: 9rem !important;
          }
          
          h1 {
            font-size: 3rem !important;
            line-height: 1 !important;
          }
          
          .title-container {
            padding: 0 20px !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-image {
            height: 40vh !important;
            min-height: 250px !important;
          }
          
          .logo-container {
            width: 6rem !important;
            height: 8rem !important;
          }
          
          h1 {
            font-size: 2.5rem !important;
          }
        }
        
        /* For extra large screens */
        @media (min-width: 2000px) {
          .hero-image {
            transform: scale(1.3) !important;
            margin-left: -15% !important;
          }
          
          .grid-container {
            gap: 100px !important;
          }
          
          /* Keep alignment consistent */
          .badge-container, .title-container {
            padding-left: calc(13% * 1.2) !important;
          }
        }
      `}</style>
    </div>
  );
};

/* ===================== STYLES ===================== */

const containerStyle = {
  position: 'relative',
  minHeight: '100vh',
  backgroundColor: '#F60945',
  overflow: 'hidden',
  width: '100%',
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
  backgroundColor: 'rgba(255,255,255,0.95)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
};

const contentStyle = {
  minHeight: '100vh',
  margin: '0 auto',
  padding: '0 5%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '1600px',
};

const gridContainer = {
  display: 'grid',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const textColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 5,
  // Remove padding-left from here - control alignment per element
  paddingLeft: '0',
  width: '100%',
};

const badgeContainerStyle = {
  marginBottom: '1rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const titleContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
};

const badgeStyle = {
  backgroundColor: '#FCD34D',
  display: 'inline-block',
};

const badgeTextStyle = {
  margin: 0,
  fontFamily: "'Kellogg's Sans', sans-serif",
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '0%',
  color: '#F60945',
};

const h1Style = {
  fontFamily: "'Kellogg's Sans', sans-serif",
  fontWeight: 700,
  letterSpacing: '2%',
  margin: 0,
  color: '#fff',
  width: '100%',
  textAlign: 'left',
  // Ensure no extra padding/margin that breaks alignment
  alignSelf: 'flex-start',
};

const descStyle = {
  color: '#fff',
  fontFamily: "'Kellogg's Sans', sans-serif",
  fontWeight: 500,
  lineHeight: '1.4',
  letterSpacing: '0%',
  textAlign: 'left',
  alignSelf: 'flex-start',
  width: '100%',
};

const buttonStyle = {
  border: 'none',
  backgroundColor: '#fff',
  color: '#F60945',
  fontFamily: "'Kellogg's Sans', sans-serif",
  fontWeight: 600,
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  alignSelf: 'flex-start',
};

const imageColumnStyle = {
  position: 'relative',
  overflow: 'visible',
};

const heroImageStyle = {
  objectFit: 'contain',
  position: 'relative',
  zIndex: 2,
};

export default HomeBanner;