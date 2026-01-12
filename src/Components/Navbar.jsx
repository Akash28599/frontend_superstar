import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { constants } from '../Utils/constants';

const Navbar = ({ customStyle = {} }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isConstrained = screenWidth < 1350;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_STRAPI_URL}/api/navbars?populate=*`)
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
    top: '25px',
    left: '60%',
    transform: 'translateX(-50%)',
    background: 'white',
    padding: isConstrained ? '8px 16px' : '10px 24px',
    height: isConstrained ? '40px' : '45px',
    borderRadius: '30px',
    boxShadow: '0 6px 25px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: isConstrained ? '16px' : '24px',
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    width: 'fit-content',
    maxWidth: '90vw',
    transition: 'all 0.3s ease',
    // Push items to the right as requested
    paddingLeft: isConstrained ? '24px' : '40px', 
    ...customStyle
  };

  // Regular (non-active) menu item style - JUST TEXT COLOR
  const navItemStyle = {
    fontFamily: "'Kellogg's Sans', sans-serif",
    fontWeight: 400,
    fontSize: isConstrained ? '15px' : '18px',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: '#807D7E', // Inactive text color
    textDecoration: 'none',
    whiteSpace: 'nowrap', // Prevent wrapping
    padding: isConstrained ? '6px 12px' : '8px 16px',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backgroundColor: 'transparent', // No background
  };

  // Active menu item style - JUST TEXT COLOR (no background)
  const activeItemStyle = {
    fontFamily: "'Kellogg's Sans', sans-serif",
    fontWeight: 700,
    fontSize: isConstrained ? '15px' : '18px',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: '#3C4242', // Active text color (NOT background)
    textDecoration: 'none',
    whiteSpace: 'nowrap', // Prevent wrapping
    padding: isConstrained ? '6px 12px' : '8px 16px',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backgroundColor: 'transparent', // No background
  };

  const ButtonStyle = {
    fontFamily: "'Kellogg's Sans', sans-serif",
    fontWeight: 700,
    fontSize: isConstrained ? '13px' : '15px',
    lineHeight: '100%',
    letterSpacing: '0%',
    backgroundColor: constants.red,
    color: 'white',
    textDecoration: 'none',
    padding: isConstrained ? '6px 12px' : '8px 16px',
    borderRadius: isConstrained ? '16px' : '20px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 3px 12px rgba(228, 31, 53, 0.25)'
  };

    const ActiveButtonStyle = {
    fontFamily: "'Kellogg's Sans', sans-serif",
    fontWeight: 700,
    fontSize: isConstrained ? '15px' : '18px',
    lineHeight: '100%',
    letterSpacing: '0%',
    backgroundColor: constants.gold,
    color: 'black',
    textDecoration: 'none',
    padding: isConstrained ? '6px 14px' : '8px 20px',
    borderRadius: isConstrained ? '16px' : '20px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 3px 12px rgba(246, 9, 69, 0.25)',
  };


  if (loading) {
    return null;
  }

  return (
    <nav style={navbarStyle}>
      {menu.map((item) => (
        // <a
        //   key={item.id}
        //   href={item.route}
        //   style={item.isButton ? ButtonStyle : isActive(item.route) ? activeItemStyle : navItemStyle}
        //   onClick={(e) => {
        //     e.preventDefault();
        //     window.location.href = item.route;
        //   }}
        // >
        //   {item.label}
        // </a>

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

      ))}

      {/* Contact - Special styling
      {menu.find(item => item.isButton) && (
        <a
          href={item.route}
          style={contactStyle}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = item.route;
          }}
        >
          Contact
        </a>
      )} */}
    </nav>
  );
};

export default Navbar;