import React, { useState, useEffect } from 'react';
import './HomeBanner.css'
import { constants } from '../../Utils/constants';

import Navbar from '../Navbar';

const HomeBanner = () => {
  const [banner, setBanner] = useState(null);
  const [cloudImage, setCloudImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isEdge = /Edg|Edge/.test(navigator.userAgent);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [starImage, setStarImage] = useState(null);

  useEffect(() => {
    // Fetch banner data
    fetch(`${process.env.REACT_APP_STRAPI_URL}/api/homebanners?populate=*`)
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

    // Fetch star data from coco-heads
    fetch(`${process.env.REACT_APP_STRAPI_URL}/api/coco-heads?populate=*`)
        .then(res => res.json())
        .then(json => {
            const data = json.data || [];
            const starItem = data.find(d => !(d.icon_description && d.icons));
            if (starItem?.icons) {
                const starUrl = starItem.icons.formats?.small?.url ||
                    starItem.icons.formats?.thumbnail?.url ||
                    starItem.icons.url;
                setStarImage(starUrl);
            }
        })
        .catch(err => console.log("Star fetch error", err));
  }, []);

  if (loading) return <div style={loadingStyle}>Loading...</div>;
  if (!banner) return <div style={loadingStyle}>No banner data</div>;

  const isConstrained = screenWidth < 1350;

  const logoImage =
    banner.nav_icon?.formats?.small?.url ||
    banner.nav_icon?.formats?.thumbnail?.url ||
    banner.nav_icon?.url;

  const heroImage =
    banner.image?.formats?.large?.url ||
    banner.image?.formats?.medium?.url ||
    banner.image?.url;

  // fluid cloud positioning
  const getCloudPositions = () => {
    if (screenWidth >= 1600) return { cloud1Right: '8%', cloud1Size: '10%' };
    if (screenWidth >= 1440) return { cloud1Right: '8%', cloud1Size: '10%' };
    if (screenWidth >= 1200) return { cloud1Right: '10%', cloud1Size: '9%' };
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
    background: 'linear-gradient(180deg,#ffb366,#ff8a2b)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '12px',
    boxShadow: `2px 3px 0px ${constants.red}, 0 4px 12px rgba(0,0,0,0.1)`,
    transition: 'all 0.3s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  };

  const dynamicLeftSectionStyle = {
    flex: 1,
    zIndex: 5,
    marginTop: '0',
    alignSelf: 'flex-end',
    paddingLeft: '15%',
    paddingBottom: '10vh',
    paddingTop: screenWidth < 1200 ? '20vh' : (isConstrained ? '15vh' : '12vh'), // Increased padding for all desktop sizes to prevent overlap
    maxWidth: 'none',
    className: 'left-section',
    transition: 'all 0.3s ease',
  };

  const dynamicContentStyle = {
    height: 'auto',
    flex: 1,
    margin: isConstrained ? '0% 1%' : '0% 5%',
    padding: '0 2%',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: '5vw', 
    maxWidth: '1600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    className: 'content-container',
  };

  const dynamicHeroImageStyle = {
    width: screenWidth < 1200 ? '45vw' : (isConstrained ? '55vw' : '48vw'),
    height: 'auto',
    flexShrink: 0,
    // Increased max height for all resolutions as requested
    maxHeight: isConstrained ? '125vh' : '115vh',
    maxWidth: 'none', 
    objectFit: 'contain',
    position: 'relative',
    marginTop: screenWidth >= 1440 ? '2%' : (isConstrained ? '5%' : '5%'),
    transition: 'all 0.3s ease',
    className: 'hero-image',
  };

  return (
    <div style={containerStyle}>
      <Navbar customStyle={{
        top: '0',
        left: 'auto',
        transform: 'none',
        // Granular left margin - Adjusted for robustness
        // Adjusted negative margins to prevent overlap on 1680px/etc
        margin: screenWidth < 1200
          ? '20px auto 0px 25%' // Removed negative margin for small screens
          : (screenWidth < 1350 
            ? '20px auto -20px 25%' 
            : '20px auto -80px 25%'), // Reduced from -220px to -80px for safety
        
        // Adjust max-width to match margins
        maxWidth: screenWidth < 1350 
          ? '70vw' 
          : '71vw',
          
        paddingRight: isConstrained ? '28px' : '40px',
        position: 'relative',
        zIndex: 20
      }} />

      {logoImage && (
        <div style={{
          ...logoContainerStyle,
          left: '5%',
          // Dynamic overrides for constrained width
          width: isConstrained ? '7rem' : '9rem',
          height: isConstrained ? '8.5rem' : '11rem',
        }}>
          <img src={logoImage} alt="Logo" style={{
              ...logoStyle,
              width: isConstrained ? '65px' : '90px',
              height: isConstrained ? '110px' : '140px',
          }} />
        </div>
      )}

      <div style={dynamicContentStyle}>
        <div style={dynamicLeftSectionStyle}>
          <div style={textContainerStyle}>
            <div style={{
              ...textColumnStyle,
              paddingLeft: '0',
              width: '100%'
            }}>
              <div style={{
                ...badgeStyle,
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  ...badgeTextStyle,
                  fontSize: screenWidth >= 1440 ? '1.2rem' : (isConstrained ? '1rem' : '1.2rem'),
                  whiteSpace: 'nowrap',
                }}>{banner.topheading}</h3>
              </div>

              <h1 style={{
                ...h1Style,
                // Adaptive font size
                fontSize: screenWidth >= 1600 ? '4.5rem' : (screenWidth >= 1350 ? '3.5rem' : '3.3rem'),
                lineHeight: '1.2',
              }}>
                {banner.title && banner.title.split(' ').length > 1 ? (
                  <>
                    {banner.title.split(' ')[0]}
                    <br />
                    {banner.title.split(' ').slice(1).join(' ')}
                  </>
                ) : (
                  banner.title
                )}
              </h1>
              <p style={{
                ...descStyle,
                fontSize: screenWidth >= 1440 ? '1.3rem' : (isConstrained ? '1.1rem' : '1.3rem'),
              }}>{banner.description}</p>

              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: isHovered ? constants.gold : '#fff',
                  color: constants.red,
                  fontSize: screenWidth >= 1440 ? '1.4rem' : (screenWidth < 1200 ? '0.8rem' : isConstrained ? '1.1rem' : '1.4rem'),
                  padding: screenWidth < 1200 ? '0.6rem 2rem' : '0.75rem 2.5rem',
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
          display: 'flex',
          justifyContent: 'center',
          flex: '1',
          alignItems: 'flex-end'
        }}>
          {heroImage && (
            <>
              <img src={heroImage} alt="Hero" style={dynamicHeroImageStyle} />
              {/* Right Cloud - Lower & Inward - Increased Size (Reduced slightly) */}
              <Cloud top="45%" right="5%" size="17%" zIndex={3} />
              {/* Left Cloud - Lower & Inward - Increased Size (Reduced slightly) */}
              <Cloud top="30%" left="1%" size="9%" zIndex={4} />
            </>
          )}
        </div>
        {/* Floating Star overlapped */}
        {starImage && (
            <div style={{
                position: 'absolute',
                // Overlap: Move down by roughly half the height (negative bottom)
                // Using vw ensures it scales with width
                bottom: '-14vw', 
                left: '0.5%',
                // Robust size: 15% of viewport width, clamped for sanity
                width: '15vw',
                minWidth: '200px',
                maxWidth: '300px',
                zIndex: 10,
                transform: 'rotate(-10deg)',
                pointerEvents: 'none'
            }}>
                <img src={starImage} alt="star" style={{
                    width: '100%',
                    height: 'auto'
                }} />
            </div>
        )}
      </div>

      <style jsx="true">{`
        @media (min-width: 1600px) {
            .content-container {
                max-width: 1800px;
            }
        }
        /* Mobile/Tablet adjustments could go here if needed, but we focus on desktop */
      `}</style>
    </div>
  );
};

// Pure constant styles defined below (unchanged mostly)
const containerStyle = {
  position: 'relative',
  minHeight: '100vh', 
  backgroundColor: constants.red,
  overflow: 'visible', // Changed from hidden to visible so the star can poke out
  width: '100%',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column', 
};

const loadingStyle = {
  minHeight: '100vh',
  backgroundColor: constants.red,
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
};

const logoContainerStyle = {
  position: 'absolute',
  top: '0%',
  // width/height overridden in component
  backgroundColor: 'rgba(255,255,255,0.95)',
  borderRadius: '0 0 30px 30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  className: 'logo-container',
};

const logoStyle = {
  // width/height overridden in component
  objectFit: 'contain',
  borderRadius: '16px',
};

const textContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
};

const badgeContainerStyle = {
  marginBottom: '0.5rem',
  width: '100%',
  marginLeft: '0', 
};

const badgeStyle = {
  backgroundColor: constants.gold,
  padding: '0.75rem 1.5rem',
  borderRadius: '26px',
  display: 'inline-block',
  className: 'badge',
};

const badgeTextStyle = {
  margin: 0,
  fontWeight: 500,
  lineHeight: '100%',
  letterSpacing: '0%',
  color: constants.red,
};

const textColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  className: 'text-column',
};

const h1Style = {
  fontFamily: constants.fontFamily,
  fontWeight: 700,
  margin: '0 0 1.2rem 0',
  color: '#fff',
  textAlign: 'left',
  className: 'h1-title',
};

const descStyle = {
  color: '#fff',
  fontFamily: constants.fontFamily,
  fontWeight: 500,
  lineHeight: '1.2',
  marginBottom: '1.5rem',
  textAlign: 'left',
  className: 'description',
};

const buttonStyle = {
  padding: '0.75rem 2.5rem',
  borderRadius: '50px',
  border: 'none',
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontFamily: constants.fontFamily
};

const imageWrapperStyle = {
  flex: 1,
  height: 'auto',
  position: 'relative',
  className: 'image-wrapper',
};

export default HomeBanner;

