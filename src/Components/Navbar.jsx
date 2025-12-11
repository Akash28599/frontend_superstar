import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://correct-prize-f0a5924469.strapiapp.com/api/navbars?populate=*')
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

  const currentPath = window.location.pathname;

  const navbarStyle = {
    position: 'relative',
    top: '35px',
    left: '60%',
    transform: 'translateX(-50%)',
    background: 'white',
    padding: '8px 24px',
    borderRadius: '30px',
    boxShadow: '0 6px 25px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    width: 'fit-content',     // Keeps navbar only as wide as content
    maxWidth: '90vw'          // Prevents overflow on small screens
    // REMOVED: marginLeft: "100px" - this was causing right extension
  };

  const navItemStyle = {
    color: '#4B5563',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const activeItemStyle = {
    ...navItemStyle,
    color: '#000000',
    backgroundColor: '#F3F4F6',
    fontWeight: '600'
  };

  const contactStyle = {
    backgroundColor: '#F60945',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    padding: '8px 20px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 3px 12px rgba(246, 9, 69, 0.25)'
  };

  const isActive = (route) => currentPath === route;

  if (loading) {
    return null;
  }

  return (
    <nav style={navbarStyle}>
      {menu.slice(0, -1).map((item) => (
        <a
          key={item.id}
          href={item.route}
          style={isActive(item.route) ? activeItemStyle : navItemStyle}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = item.route;
          }}
        >
          {item.label}
        </a>
      ))}
      
      {/* Contact - Special styling */}
      {menu.find(item => item.label === 'Contact') && (
        <a
          href="/contact"
          style={contactStyle}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/contact';
          }}
        >
          Contact
        </a>
      )}
    </nav>
  );
};

export default Navbar;
