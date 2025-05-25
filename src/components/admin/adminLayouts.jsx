import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './adminHeader';
import AdminSidebar from './adminSideBar';

function AdminLayout() {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      setShowSidebar(!isNowMobile); // show sidebar on desktop, hide on mobile
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const layoutStyle = {
    display: 'flex',
    flexDirection: 'row',
  };

  const contentStyle = {
    marginLeft: !isMobile ? '250px' : '0',
    padding: '20px',
    width: '100%',
    transition: 'margin-left 0.3s ease',
  };

  return (
    <div>
      <AdminHeader toggleSidebar={() => setShowSidebar(!showSidebar)} />
      <div style={layoutStyle}>
        {showSidebar && (
          <AdminSidebar
            show={showSidebar}
            onClose={() => isMobile && setShowSidebar(false)}
          />
        )}
        <div style={contentStyle}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
