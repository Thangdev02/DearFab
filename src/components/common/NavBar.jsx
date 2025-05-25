import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import CartSidebar from '../../pages/CartPage';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import Cookies from 'js-cookie';
import ProfileModal from '../../pages/ProfileModal';
import Logo from '../../../public/logo.png';

function NavBar() {
  const { user: contextUser, logout } = useContext(UserContext);
  const [showCart, setShowCart] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false); // State for ProfileModal visibility
  const navigate = useNavigate();
  const [cookieUser, setCookieUser] = useState(null);

  // Fetch user data from cookie and re-check on changes
  useEffect(() => {
    const checkCookie = () => {
      const userCookie = Cookies.get('user');
      if (userCookie) {
        const parsedUser = JSON.parse(userCookie);
        setCookieUser(parsedUser);
      } else {
        setCookieUser(null); // Reset if no cookie
      }
    };

    checkCookie(); // Initial check
    const interval = setInterval(checkCookie, 1000); // Check every second (adjust as needed)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []); // Empty dependency array to run only on mount

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  const handleUserClick = () => {
    if (cookieUser || contextUser) {
      setShowProfileModal(true); // Open ProfileModal instead of navigating to /profile
    } else {
      navigate('/login');
    }
  };

  const handleCloseProfileModal = () => setShowProfileModal(false);

  // Handle logout
  const handleLogout = () => {
    Cookies.remove('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    logout(); // Call context logout if implemented
    setCookieUser(null); // Update state immediately
    navigate('/login');
  };

  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        className="reveal"
        fixed="top"
        style={{ borderBottom: '1px solid #ccc' }}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{ color: 'green', fontWeight: 'bold', fontSize: '1.5rem' }}
          >
            <img src={Logo} alt="Logo" style={{ width: '100%', height: '50px' }}></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" style={{ color: 'green' }}>Trang Chủ</Nav.Link>
              <Nav.Link as={Link} to="/products" style={{ color: 'green' }}>Sản Phẩm</Nav.Link>
              <Nav.Link as={Link} to="/about" style={{ color: 'green' }}>Giới Thiệu</Nav.Link>
            </Nav>
            <Nav className="align-items-center gap-3">
              <Nav.Link onClick={handleShowCart} style={{ color: 'green', fontSize: '1.5rem' }}>
                <FaShoppingCart />
              </Nav.Link>
              <Nav.Link onClick={handleUserClick} style={{ color: 'green', fontSize: '1rem' }}>
                {cookieUser ? (
                  <span style={{ fontWeight: '500' }}>{cookieUser.name}</span>
                ) : (
                  <FaUser style={{ fontSize: '1.5rem' }} />
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offcanvas giỏ hàng */}
      <CartSidebar show={showCart} handleClose={handleCloseCart} />

      {/* Profile Modal */}
      <ProfileModal
        show={showProfileModal}
        handleClose={handleCloseProfileModal}
        user={cookieUser}
        handleLogout={handleLogout} // Pass logout function to ProfileModal
      />
    </>
  );
}

export default NavBar; // Corrected export