import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../../public/logo.png';

function AdminSidebar({ show, onClose }) {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  const sidebarBaseStyle = {
    backgroundColor: '#02542e',
    width: '250px',
    height: '100vh',
    padding: '15px',
    position: 'fixed',
    top: 0,
    left: show ? '0' : '-250px',
    transition: 'left 0.3s ease',
    zIndex: 1040,
    color: 'white',
  };

  const closeBtnStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    marginBottom: '10px',
    cursor: 'pointer',
    display: window.innerWidth < 768 ? 'block' : 'none',
  };

  const linkStyle = (path) => ({
    color: 'white',
    padding: '10px 15px',
    textDecoration: 'none',
    backgroundColor:
      location.pathname === path
        ? '#007b5f' // Active link background
        : hovered === path
        ? '#00664a' // Hover background
        : 'transparent',
    borderRadius: '5px',
    marginBottom: '5px',
    display: 'block',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    transition: 'all 0.2s',
  });

  return (
    <div style={sidebarBaseStyle}>
      <button style={closeBtnStyle} onClick={onClose}>✕</button>
      <img style={{ width: '100%', height: 'auto', padding: '4%', marginBottom:'4%' }} src={Logo} alt="Logo" />
      <Nav className="flex-column">
        {[
          { to: '/admin', label: 'Dashboard' },
          { to: '/admin/products', label: 'Product Management' },
          { to: '/admin/orders', label: 'Order Management' },
          { to: '/admin/users', label: 'User Management' },
        ].map((item) => (
          <Nav.Link
            key={item.to}
            as={Link}
            to={item.to}
            style={linkStyle(item.to)}
            onMouseEnter={() => setHovered(item.to)}
            onMouseLeave={() => setHovered(null)}
          >
            {item.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
}

export default AdminSidebar;
