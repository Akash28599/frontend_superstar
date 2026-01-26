import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { constants } from '../Utils/constants';
import { API_CONFIG } from '../common/config';

const Navbar = ({ customStyle = {} }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isConstrained = screenWidth < 1350;
  const isHighScale = screenWidth < 1050;
  const isVerySmall = screenWidth < 480; // Very small phones
  const isOlderLaptop = screenWidth >= 800 && screenWidth < 1024; // 800x600, 1024x768

  useEffect(() => {
    fetch(`${API_CONFIG.BASE_URL}/api/navbars?populate=*`)
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data[0] && data.data[0].menu) {
          setMenu(data.data[0].menu);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching navbar:', err);
        setLoading(false);
      });
  }, []);

  const navbarStyle = {
    position: 'relative',
    top: isMobile ? '10px' : isOlderLaptop ? '15px' : '25px',
    left: isMobile ? 'auto' : '50%',
    marginLeft: isMobile ? 'auto' : '0',
    marginRight: isMobile ? '16px' : '0',
    transform: isMobile ? 'none' : 'translateX(-50%)',
    background: 'white',
    padding: isMobile ? '12px 16px' : isVerySmall ? '10px 12px' : isHighScale ? '8px 14px' : isConstrained ? '10px 18px' : '12px 28px',
    height: 'auto', // Changed to auto to prevent overflow
    minHeight: isMobile ? '48px' : isHighScale ? '40px' : isConstrained ? '44px' : '50px',
    borderRadius: '30px',
    boxShadow: '0 6px 25px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    flexWrap: isConstrained && !isMobile ? 'nowrap' : 'wrap', // Allow wrapping on very constrained screens
    gap: isMobile ? '0' : isVerySmall ? '4px' : isHighScale ? '8px' : isConstrained ? '12px' : '20px',
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    width: 'fit-content', // Always fit content, even on mobile
    maxWidth: isMobile ? '95vw' : '90vw',
    transition: 'all 0.3s ease',
    paddingLeft: isMobile ? '16px' : isVerySmall ? '12px' : isHighScale ? '20px' : isConstrained ? '28px' : '40px',
    paddingRight: isMobile ? '16px' : isVerySmall ? '12px' : isHighScale ? '20px' : isConstrained ? '28px' : '40px',
    flexDirection: isMobile ? 'column' : 'row',
    marginBottom: isMobile ? '20px' : '0', // Add margin to prevent overlap with content
    ...customStyle
  };

  const navItemStyle = {
    fontFamily: "'Kellogg's Sans', sans-serif",
    fontWeight: 400,
    fontSize: isMobile ? '14px' : isVerySmall ? '11px' : isHighScale ? '11px' : isOlderLaptop ? '13px' : isConstrained ? '14px' : '16px',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: '#807D7E',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    padding: isMobile ? '10px 16px' : isVerySmall ? '4px 6px' : isHighScale ? '5px 8px' : isOlderLaptop ? '6px 10px' : isConstrained ? '7px 12px' : '8px 14px',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    width: isMobile ? '100%' : 'auto',
    textAlign: isMobile ? 'center' : 'left',
    flexShrink: 0, // Prevent shrinking
  };

  const activeItemStyle = {
    ...navItemStyle,
    fontWeight: 700,
    color: '#000000',
  };

  const ButtonStyle = {
    fontFamily: "'Kellogg's Sans', sans-serif",
    fontWeight: 700,
    fontSize: isMobile ? '14px' : isVerySmall ? '10px' : isHighScale ? '11px' : isOlderLaptop ? '12px' : isConstrained ? '13px' : '14px',
    lineHeight: '100%',
    letterSpacing: '0%',
    backgroundColor: constants.red,
    color: 'white',
    textDecoration: 'none',
    padding: isMobile ? '10px 20px' : isVerySmall ? '5px 8px' : isHighScale ? '6px 10px' : isOlderLaptop ? '7px 12px' : isConstrained ? '7px 14px' : '9px 18px',
    borderRadius: isConstrained ? '14px' : '18px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 3px 12px rgba(228, 31, 53, 0.25)',
    width: isMobile ? '100%' : 'auto',
    textAlign: 'center',
    flexShrink: 0, // Prevent shrinking
  };

  const ActiveButtonStyle = {
    ...ButtonStyle,
    backgroundColor: constants.gold,
    color: 'black',
    boxShadow: '0 3px 12px rgba(246, 9, 69, 0.25)',
  };

  const hamburgerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    cursor: 'pointer',
    padding: '8px',
  };

  const hamburgerLineStyle = {
    width: '24px',
    height: '3px',
    backgroundColor: constants.red,
    borderRadius: '2px',
    transition: 'all 0.3s ease',
  };

  if (loading) {
    return null;
  }

  return (
    <nav style={navbarStyle}>
      {isMobile ? (
        <>
          {/* Hamburger menu centered */}
          <div 
            style={{
              ...hamburgerStyle,
              alignSelf: 'center',
              margin: '0 auto',
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div style={{
              ...hamburgerLineStyle,
              transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}></div>
            <div style={{
              ...hamburgerLineStyle,
              opacity: mobileMenuOpen ? 0 : 1,
            }}></div>
            <div style={{
              ...hamburgerLineStyle,
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}></div>
          </div>
          
          {/* Mobile dropdown menu - positioned below hamburger */}
          {mobileMenuOpen && (
            <div style={{ 
              width: '100%', 
              paddingTop: '16px',
              paddingBottom: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              borderTop: '1px solid #eee',
              marginTop: '12px',
            }}>
              {menu.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.route}
                  style={({ isActive }) =>
                    isActive
                      ? item.isButton
                        ? ActiveButtonStyle
                        : activeItemStyle
                      : item.isButton
                        ? ButtonStyle
                        : navItemStyle
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </>
      ) : (
        menu.map((item) => (
          <NavLink
            key={item.id}
            to={item.route}
            style={({ isActive }) =>
              isActive
                ? item.isButton
                  ? ActiveButtonStyle
                  : activeItemStyle
                : item.isButton
                  ? ButtonStyle
                  : navItemStyle
            }
          >
            {item.label}
          </NavLink>
        ))
      )}
    </nav>
  );
};

export default Navbar;