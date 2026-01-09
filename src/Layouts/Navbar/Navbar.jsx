import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return null;
  }

  return (
    <nav className='navbar'>
      {menu.map((item) => (
        <NavLink
          key={item.id}
          to={item.route}
          className={({ isActive }) => {
            if (item.isButton) {
              return isActive ? 'nav-active-button' : 'nav-button';
            }
            return isActive ? 'nav-active-item' : 'nav-item';
          }}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;