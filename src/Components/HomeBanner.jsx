import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

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

        // pick banner: first item that has a non-empty title (robust to changed order)
        const bannerItem = items.find(item => item.title && item.title.trim().length > 0) || items[0] || null;
        setBanner(bannerItem || null);

        // pick cloud image: item that likely has image but no title (like your cloud1 record),
        // fallback to any item that has an image
        const cloudItem =
          items.find(item => (!item.title || item.title === null) && item.image) ||
          items.find(item => item.image) ||
          null;

        if (cloudItem && cloudItem.image) {
          const img = cloudItem.image;
          const url =
            img.formats?.medium?.url ||
            img.formats?.small?.url ||
            img.formats?.thumbnail?.url ||
            img.url;
          setCloudImage(url);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching banner:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: '#F60945',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.2rem',
        }}
      >
        Loading...
      </div>
    );
  }

  if (!banner) {
    return (
      <div
        style={{
          backgroundColor: '#F60945',
          height: '900px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.2rem',
        }}
      >
        No banner data
      </div>
    );
  }

  const logoImage =
    banner.nav_icon?.formats?.small?.url ||
    banner.nav_icon?.formats?.thumbnail?.url ||
    banner.nav_icon?.url;

  const whiteHoodieImage =
    banner.image?.formats?.large?.url ||
    banner.image?.formats?.medium?.url ||
    banner.image?.url;

  const title = banner.title || 'Default Title';
  const description = banner.description || 'Default Description';

  const containerStyle = {
    position: 'relative',
    backgroundColor: '#F60945',
    height: '900px',
    overflow: 'hidden',
  };

  const logoContainerStyle = {
    position: 'absolute',
    top: '25px',
    left: '125px',
    zIndex: 1000,
    width: '160px',
    height: '190px',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: '0 0 30px 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
  };

  const navbarContainerStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 1000,
  };

  const textContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  };

  const kelloggsStyle = {
    backgroundColor: '#FCD34D',
    padding: '1rem 2rem',
    borderRadius: '26px',
    display: 'inline-block',
    marginBottom: '-50px',
  };

  const titleStyle = {
    fontSize: '5rem',
    fontWeight: '900',
    color: 'white',
    marginBottom: '1rem',
    lineHeight: '1.05',
    maxWidth: '600px',
    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
  };

  const descStyle = {
    fontSize: '1.1rem',
    color: 'white',
    marginBottom: '3rem',
    lineHeight: '1.4',
    maxWidth: '520px',
    opacity: 0.95,
    position:'relative',
    top:"50px"
  };

  // Base button style
  const buttonStyle = {
    backgroundColor: 'white',
    color: '#F60945',
    padding: '1.1rem 3rem',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '700',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    cursor: 'pointer',
    boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
    marginLeft: '200px',
    marginTop:"40px",
    position: 'relative',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  const contentStyle = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '100px',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 40px',
    marginLeft:"10%"
  };

  const leftSectionStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '600px',
    zIndex: 1001,
    position:'relative',
    top:"10%"
  };

  const heroImageWrapper = {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    position: 'relative',
    maxWidth: '600px',
    zIndex: 900,
  };

  const heroImageStyle = {
    height: '860px',
    width: 'auto',
    objectFit: 'cover',
    transform: 'translateY(90px)',
    pointerEvents: 'none',
  };

  const Cloud = ({ top, left, right, bottom, size, zIndex = 2 }) =>
    cloudImage ? (
      <img
        src={cloudImage}
        alt="Cloud"
        style={{
          position: 'absolute',
          top,
          left,
          right,
          bottom,
          width: size,
          height: 'auto',
          zIndex,
          pointerEvents: 'none',
        }}
      />
    ) : null;

  const handlePlayClick = () => {
    console.log('Adventure starts here clicked');
    // wire up navigation/modal here if needed
  };

  return (
    <div style={containerStyle}>
      <Navbar />

      {logoImage && (
        <div style={logoContainerStyle}>
          <img
            src={logoImage}
            alt="Logo"
            style={{
              width: '90px',
              height: '140px',
              objectFit: 'contain',
              borderRadius: '16px',
            }}
          />
        </div>
      )}

      <div style={navbarContainerStyle}>{/* optional nav items */}</div>

      <div style={contentStyle}>
        <div style={leftSectionStyle}>
          <div style={textContainerStyle}>
            {/* Yellow badge now comes from API title */}
            <div style={kelloggsStyle}>
              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#F60945',
                  margin: 0,
                  letterSpacing: '1px',
                }}
              >
                {title}
              </h3>
            </div>

            {/* Big headline - also using API title for now (you can change this to a different field if desired) */}
           

            {/* Description from API */}
            <p style={descStyle}>{description}</p>

            {/* Button text changed to "Adventure starts here" */}
            <button
              style={{
                ...buttonStyle,
                backgroundColor: isHovered ? '#FCD34D' : 'white',
                color: isHovered ? 'black' : '#F60945',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handlePlayClick}
              aria-label="Adventure starts here"
            >
              <svg
                style={{ width: '28px', height: '28px' }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <polygon points="5,3 19,12 5,21 5,3" />
              </svg>
              Adventure starts here
            </button>
          </div>
        </div>

        <div style={heroImageWrapper}>
          {whiteHoodieImage && (
            <div style={{ position: 'relative' }}>
              <img
                src={whiteHoodieImage}
                alt="White hoodie character"
                style={heroImageStyle}
              />

              <Cloud top="430px" right="9%" size="120px" zIndex={901} />
              <Cloud top="380px" left="48%" size="90px" zIndex={902} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
