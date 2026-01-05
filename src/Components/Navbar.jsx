import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const currentPath = location.pathname;

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
    top: '35px',
    left: '60%',
    transform: 'translateX(-50%)',
    background: 'white',
    padding: '12px 24px',
    height: '50px',
    borderRadius: '30px',
    boxShadow: '0 6px 25px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    width: 'fit-content',
    maxWidth: '90vw',
  };

  // Regular (non-active) menu item style - JUST TEXT COLOR
  const navItemStyle = {
    fontFamily: "'Kellogg's Sans', sans-serif",
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: '#807D7E', // Inactive text color
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backgroundColor: 'transparent', // No background
  };

  // Active menu item style - JUST TEXT COLOR (no background)
  const activeItemStyle = {
    fontFamily: "'Kellogg's Sans', sans-serif",
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: '#3C4242', // Active text color (NOT background)
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backgroundColor: 'transparent', // No background
  };

  const contactStyle = {
    fontFamily: "'Kellogg's Sans', sans-serif",
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '100%',
    letterSpacing: '0%',
    backgroundColor: '#F60945',
    color: 'white',
    textDecoration: 'none',
    padding: '8px 20px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 3px 12px rgba(246, 9, 69, 0.25)'
  };

  const normalizePath = (path) => path.replace(/^\/|\/$/g, '');
  const isActive = (route) => normalizePath(currentPath) === normalizePath(route);


  if (loading) {
    return null;
  }

  return (
    <nav style={navbarStyle}>
      {menu.map((item) => (
        // <a
        //   key={item.id}
        //   href={item.route}
        //   style={item.isButton ? contactStyle : isActive(item.route) ? activeItemStyle : navItemStyle}
        //   onClick={(e) => {
        //     e.preventDefault();
        //     window.location.href = item.route;
        //   }}
        // >
        //   {item.label}
        // </a>

        <NavLink
          to={item.route}
          style={({ isActive }) =>
            isActive
              ? activeItemStyle
              : item.isButton
                ? contactStyle
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