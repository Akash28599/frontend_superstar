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
        {/* LEFT SECTION - Text Content */}
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

        {/* RIGHT SECTION - Hero Image */}
        <div style={imageWrapperStyle}>
          {heroImage && (
            <>
              <img src={heroImage} alt="Hero" style={heroImageStyle} />
              <Cloud top="30%" right="10%" size="20%" zIndex={3} />
              <Cloud top="8%" left="0%" size="17%" zIndex={4} />
            </>
          )}
        </div>
      </div>
      
      {/* Desktop-only responsive scaling */}
      <style jsx="true">{`
        /* Base for 1440px (MacBook 13") */
        @media (min-width: 1440px) {
          .content-container {
            max-width: 1440px;
            margin: 0 auto;
            gap: 50px;
          }
          
          .logo-container {
            left: 6%;
          }
          
          .text-column {
            padding-left: 13%;
          }
          
          .h1-title {
            font-size: 90px;
          }
          
          .hero-image {
            right: 35%;
            transform: translateY(10%) scale(1.1);
          }
        }
        
        /* 1920px and above (Desktop/4K) */
        @media (min-width: 1920px) {
          .content-container {
            max-width: 1600px;
            gap: 80px;
            padding: 0 7%;
          }
          
          .logo-container {
            left: 9%;
            width: 10rem;
            height: 12rem;
          }
          
          .logo-container img {
            width: 100px;
            height: 155px;
          }
          
          .text-container {
            padding-left: 15%;
          }
          
          .text-column {
            padding-left: 15%;
          }
          
          .h1-title {
            font-size: 100px;
          }
          
          .description {
            font-size: 1.4rem;
            max-width: 580px;
          }
          
          .hero-image {
            right: 25%;
            transform: translateY(10%) scale(1.2);
          }
          
          .badge {
            margin-right: 15%;
          }
        }
        
        /* 1600px to 1919px */
        @media (min-width: 1600px) and (max-width: 1919px) {
          .content-container {
            max-width: 1500px;
            gap: 60px;
            padding: 0 6%;
          }
          
          .logo-container {
            left: 7%;
            width: 9.5rem;
            height: 11.5rem;
          }
          
          .logo-container img {
            width: 95px;
            height: 148px;
          }
          
          .text-container {
            padding-left: 14%;
          }
          
          .text-column {
            padding-left: 14%;
          }
          
          .h1-title {
            font-size: 95px;
          }
          
          .description {
            font-size: 1.35rem;
            max-width: 550px;
          }
          
          .hero-image {
            right: 30%;
            transform: translateY(10%) scale(1.15);
          }
          
          .badge {
            margin-right: 12%;
          }
        }
        
        /* 1200px to 1599px */
        @media (min-width: 1200px) and (max-width: 1599px) {
          .content-container {
            max-width: 1200px;
            gap: 40px;
            padding: 0 4%;
          }
          
          .logo-container {
            left: 5%;
            width: 8rem;
            height: 10rem;
          }
          
          .logo-container img {
            width: 80px;
            height: 125px;
          }
          
          .text-container {
            padding-left: 11%;
          }
          
          .text-column {
            padding-left: 11%;
          }
          
          .h1-title {
            font-size: 80px;
          }
          
          .description {
            font-size: 1.2rem;
            max-width: 480px;
          }
          
          .hero-image {
            right: 35%;
            transform: translateY(10%) scale(1);
          }
          
          .badge {
            margin-right: 8%;
          }
        }
        
        /* 1024px to 1199px (Small laptops) */
        @media (min-width: 1024px) and (max-width: 1199px) {
          .content-container {
            max-width: 1024px;
            gap: 30px;
            padding: 0 3%;
          }
          
          .logo-container {
            left: 4%;
            width: 7rem;
            height: 9rem;
          }
          
          .logo-container img {
            width: 70px;
            height: 110px;
          }
          
          .text-container {
            padding-left: 10%;
          }
          
          .text-column {
            padding-left: 10%;
          }
          
          .h1-title {
            font-size: 70px;
          }
          
          .description {
            font-size: 1.1rem;
            max-width: 440px;
          }
          
          .hero-image {
            right: 40%;
            transform: translateY(10%) scale(0.95);
          }
          
          .badge {
            margin-right: 5%;
            padding: 0.7rem 1.4rem;
          }
          
          .badge h3 {
            font-size: 1.1rem;
          }
          
          button {
            font-size: 1.3rem;
            padding: 0.8rem 1.9rem;
          }
        }
        
        /* 800px to 1023px (Smallest desktop/tablet landscape) */
        @media (min-width: 800px) and (max-width: 1023px) {
          .content-container {
            max-width: 900px;
            gap: 20px;
            padding: 0 2%;
          }
          
          .logo-container {
            left: 3%;
            width: 6rem;
            height: 8rem;
            border-radius: 0 0 20px 20px;
          }
          
          .logo-container img {
            width: 60px;
            height: 95px;
            border-radius: 12px;
          }
          
          .text-container {
            padding-left: 8%;
          }
          
          .text-column {
            padding-left: 8%;
          }
          
          .h1-title {
            font-size: 60px;
          }
          
          .description {
            font-size: 1rem;
            max-width: 380px;
          }
          
          .hero-image {
            right: 45%;
            transform: translateY(10%) scale(0.85);
          }
          
          .badge {
            padding: 0.6rem 1.2rem;
            margin-right: 3%;
          }
          
          .badge h3 {
            font-size: 1rem;
          }
          
          button {
            font-size: 1.2rem;
            padding: 0.7rem 1.8rem;
          }
        }
        
        /* Special fix for screens between 1300px-1400px where overlap happens */
        @media (min-width: 1300px) and (max-width: 1400px) {
          .logo-container {
            left: 5.5%;
          }
          
          .text-container {
            padding-left: 12%;
          }
          
          .text-column {
            padding-left: 12%;
          }
          
          .hero-image {
            right: 38%;
            transform: translateY(10%) scale(1.05);
          }
        }
        
        /* Special fix for screens between 1100px-1200px */
        @media (min-width: 1100px) and (max-width: 1199px) {
          .logo-container {
            left: 4.5%;
          }
          
          .text-container {
            padding-left: 10.5%;
          }
          
          .text-column {
            padding-left: 10.5%;
          }
          
          .hero-image {
            right: 42%;
          }
        }
      `}</style>
    </div>
  );
};

/* ===================== BASE STYLES (for 1440px) ===================== */

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
  maxWidth: '1440px',
  className: 'content-container',
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
  className: 'text-container',
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
  right: '35%',
  transform: 'translateY(10%) scale(1.1)',
  className: 'hero-image',
};

export default HomeBanner;