import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const HomeBanner = () => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch('https://correct-prize-f0a5924469.strapiapp.com/api/homebanners?populate=*')
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data[0]) {
          setBanner(data.data[0]);
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
      <div style={{
        backgroundColor: '#F60945',
        height:"500px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  if (!banner) {
    return (
      <div style={{
        backgroundColor: '#F60945',
       
        height:"900px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        No banner data
      </div>
    );
  }

  // Extract logo from nav_icon
  const logoImage = banner.nav_icon?.url || 
                   banner.nav_icon?.formats?.medium?.url ||
                   banner.nav_icon?.formats?.thumbnail?.url;

  // Your exact data extraction
  const title = banner.title || 'Default Title';
  const description = banner.description || 'Default Description';
  const whiteHoodieImage = banner.image?.url || 
                          banner.image?.formats?.medium?.url ||
                          banner.attributes?.image?.formats?.large?.url;

  const containerStyle = {
    height:"900px",
    position: 'relative',
    backgroundColor: '#F60945',
    bottom:"20px",
    overflow: "hidden"
  };

  // 🔥 NEW LOGO CONTAINER - Top Left
  const logoContainerStyle = {
    position: 'absolute',
    top: '25px',
    left: '25px',
    zIndex: 1000,
    width: '90px',
    height: '90px',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)'
  };

  const navbarContainerStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 1000
  };

  const contentStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
    width: '100%'
  };

  const textContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 0,
    marginLeft: '150px'
  };

  const kelloggsStyle = {
    backgroundColor: '#FCD34D',
    padding: '1.2rem 2rem',
    borderRadius: '26px',
    display: 'inline-block',
    marginTop: '70px',
    marginLeft: "100px",
    marginBottom: '0.5rem'
  };

  const titleStyle = {
    fontSize: '5rem',
    fontWeight: '900',
    color: 'white',
    marginBottom: '1rem',
    lineHeight: '1.1',
    maxWidth: '600px',
    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
    marginTop: '0',
    marginLeft: 0,
    paddingLeft: 0,
    textAlign: 'left'
  };

  const descStyle = {
    fontSize: '1.5rem',
    color: 'white',
    marginBottom: '3rem',
    lineHeight: '1.4',
    maxWidth: '550px',
    opacity: 0.95,
    marginLeft: 0,
    paddingLeft: 0,
    textAlign: 'left'
  };

  const buttonStyle = {
  backgroundColor: 'white',
  color: '#F60945',
  padding: '1.2rem 3rem',
  borderRadius: '50px',
  fontSize: '1.3rem',
  fontWeight: '700',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  cursor: 'pointer',
  boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
  transition: 'all 0.3s ease',
  marginLeft: "250px",
  whiteSpace: 'nowrap',
  lineHeight: 1.2
};

 const buttonHoverStyle = {
  backgroundColor: '#FCD34D',
  color: 'black',
  transform: 'translateY(-4px) scale(1.05)',
  boxShadow: '0 25px 60px rgba(252,211,77,0.4)',
  whiteSpace: 'nowrap',
  lineHeight: 1.2
};


  return (
    <div style={containerStyle}>
      {/* 🔥 LOGO - Top Left Corner */}
       <Navbar />
      {logoImage && (
        <div style={logoContainerStyle}>
          <img 
            src={logoImage}
            alt="Logo"
            style={{
              width: '70px',
              height: '70px',
              objectFit: 'contain',
              borderRadius: '16px'
            }}
          />
        </div>
      )}

      {/* Navbar - Top Right */}
      <div style={navbarContainerStyle}>
        {/* <Navbar /> */}
      </div>
      
      <div style={contentStyle}>
        {/* Left Side: Massive Title + Description */}
        <div style={textContainerStyle}>
          <div style={kelloggsStyle}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#F60945',
              margin: 0,
              letterSpacing: '1px'
            }}>
              Kellogg's Stories
            </h3>
          </div>
          
          <h1 style={titleStyle}>{title}</h1>
          
          <p style={descStyle}>{description}</p>
          
          <button 
            style={isHovered ? {...buttonStyle, ...buttonHoverStyle} : buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <svg 
              style={{width: '28px', height: '28px'}} 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <polygon points="5,3 19,12 5,21 5,3"/>
            </svg>
            Play Now
          </button>
        </div>
        
        {/* Right Side: YOUR EXACT IMAGE SIZE */}
        {whiteHoodieImage && (
          <img 
            src={whiteHoodieImage}
            alt="White hoodie character"
            style={{
              width: '100%',
              maxWidth: '1050px',
              height: '1000px',
              marginLeft: '-500px',
              borderRadius: '32px',
              objectFit: 'cover'
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HomeBanner;
