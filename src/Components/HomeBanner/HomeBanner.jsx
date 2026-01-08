import React, { useState, useEffect } from 'react';
import './HomeBanner.css'
const HomeBanner = () => {
  const [banner, setBanner] = useState(null);
  const [cloudImage, setCloudImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
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
  }, []);

  if (loading) return <div className='h-loading'>Loading...</div>;
  if (!banner) return <div className='h-loading'>No banner data</div>;

  const logoImage =
    banner.nav_icon?.formats?.small?.url ||
    banner.nav_icon?.formats?.thumbnail?.url ||
    banner.nav_icon?.url;

  const heroImage =
    banner.image?.formats?.large?.url ||
    banner.image?.formats?.medium?.url ||
    banner.image?.url;

  const Cloud = ({ className }) =>
    cloudImage && (
      <img
        src={cloudImage}
        alt="Cloud"
        className={`h-cloud ${className}`}
        aria-hidden="true"
      />
    );

  const dynamicLeftSectionStyle = {
    flex: screenWidth >= 1440 ? '0 0 550px' : '0 0 480px',
    marginTop: screenWidth >= 1440 ? '14%' : '20%',
    maxWidth: screenWidth >= 1440 ? '550px' : '480px',
  };

  const dynamicContentStyle = {
    height: screenWidth >= 1440 ? '95vh' : '100vh',
    padding: screenWidth >= 1440 ? '0 3%' : '0 1.5%',
    justifyContent: screenWidth >= 1440 ? 'center' : 'flex-start',
    gap: screenWidth >= 1440 ? '35px' : '20px',
  };

  const dynamicHeroImageStyle = {
    height: screenWidth >= 1440 ? '115vh' : '100%',
    maxWidth: screenWidth >= 1440 ? '97vw' : '92vw',
    maxHeight: screenWidth >= 1440 ? '115vh' : '92vh',
    right: screenWidth >= 1440 ? '0%' : '0%',
    top: screenWidth >= 1440 ? '4%' : '0%',
    transform: screenWidth >= 1440 ? 'none' : 'translateY(10%) scale(1.4)',
  };

  return (
    <div className='h-container'>

      {logoImage && (
        <div
          className='h-logo-container'
          style={{
            left: screenWidth >= 1440 ? '6%' : '4%'
          }}>
          <img src={logoImage} alt="Logo" className='h-logo' />
        </div>
      )}

      <div className='h-content' style={dynamicContentStyle}>
        <div className='h-left-section' style={dynamicLeftSectionStyle}>
          <div className='h-text-container'
            style={{
              paddingLeft: screenWidth >= 1440 ? '12%' : '10%'
            }}>
            <div className='h-badge-container'>
              <div
                className='h-badge'
                style={{

                  marginLeft: screenWidth >= 1440 ? '6%' : '0%',
                  marginRight: screenWidth >= 1440 ? '0%' : '10%',
                }}>
                <h3
                  className='h-badge-text'
                  style={{
                    fontSize: screenWidth >= 1440 ? '1.2rem' : '1rem',
                  }}>{banner.topheading}</h3>
              </div>
            </div>

            <div
              className='h-text-column'
              style={{
                paddingLeft: screenWidth >= 1440 ? '13%' : '10%',
                maxWidth: screenWidth >= 1440 ? '520px' : '450px'
              }}>
              <h1
                className='h-h1'
                style={{
                  fontSize: screenWidth >= 1440 ? '76px' : '70px',
                  lineHeight: screenWidth >= 1440 ? '1.05' : '0.9',
                  maxHeight: screenWidth >= 1440 ? '175px' : '140px',
                }}>
                {banner.title}
              </h1>
              <p
                className='h-desc'
                style={{
                  fontSize: screenWidth >= 1440 ? '1.3rem' : '1.1rem',
                  maxWidth: screenWidth >= 1440 ? '520px' : '450px'
                }}>{banner.description}</p>

              <button
                className='h-button'
                style={{
                  fontSize: screenWidth >= 1440 ? '1.4rem' : '1.2rem',
                  padding: screenWidth >= 1440 ? '0.75rem 2.5rem' : '0.6rem 2rem'
                }}
              >
                Play Now
                <div className='h-icon-circle'>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                    <polygon points="8,5 8,19 19,12" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div
          className='h-image-wrapper'
          style={{
            width: screenWidth >= 1440 ? '50%' : '45%',
            maxWidth: screenWidth >= 1440 ? 'none' : '600px',
            height: screenWidth >= 1440 ? '125vh' : 'auto'
          }}>
          {heroImage && (
            <>
              <img src={heroImage} alt="Hero" className='h-hero-image' style={dynamicHeroImageStyle} />
              <Cloud className="h-cloud-1" />
              <Cloud className="h-cloud-2" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;