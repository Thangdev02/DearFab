import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'; // Thêm Badge từ react-bootstrap
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext'; // Thêm CartContext để lấy cartItems
import ProfileModal from '../../pages/ProfileModal';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import Cookies from 'js-cookie';
import Logo from '../../../public/logo.png';

function NavBar() {
  const { user: contextUser, logout } = useContext(UserContext);
  const { cartItems } = useContext(CartContext); // Lấy cartItems từ CartContext
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();
  const [cookieUser, setCookieUser] = useState(null);

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Fetch user data from cookie and re-check on changes
  useEffect(() => {
    const checkCookie = () => {
      const userCookie = Cookies.get('user');
      if (userCookie) {
        const parsedUser = JSON.parse(userCookie);
        setCookieUser(parsedUser);
      } else {
        setCookieUser(null);
      }
    };

    checkCookie();
    const interval = setInterval(checkCookie, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleShowCart = () => {
    navigate('/cart');
  };

  const handleUserClick = () => {
    if (cookieUser || contextUser) {
      setShowProfileModal(true);
    } else {
      navigate('/login');
    }
  };

  const handleCloseProfileModal = () => setShowProfileModal(false);

  const handleLogout = () => {
    Cookies.remove('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    logout();
    setCookieUser(null);
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
        style={{ borderBottom: '1px solid #ccc', padding: '0 4%' }}
      >
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ color: 'green', fontWeight: 'bolder', fontSize: '2rem' }}
        >
          <img src={Logo} alt="Logo" style={{ width: '100%', height: '50px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ color: 'green', fontWeight: 'bolder' }}>
              Trang Chủ
            </Nav.Link>
            <Nav.Link as={Link} to="/products" style={{ color: 'green', fontWeight: 'bolder' }}>
              Sản Phẩm
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ color: 'green', fontWeight: 'bolder' }}>
              Giới Thiệu
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center gap-3">
            <Nav.Link onClick={handleShowCart} style={{ color: 'green', fontSize: '1.5rem', position: 'relative' }}>
              <FaShoppingCart />
              {cartCount > 0 && (
                <Badge
                  bg="danger"
                  style={{
                    position: 'absolute',
                    fontSize: '0.7rem',
                    padding: '3px 6px',
                  }}
                >
                  {cartCount}
                </Badge>
              )}
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
      </Navbar>

      {/* Profile Modal */}
      <ProfileModal
        show={showProfileModal}
        handleClose={handleCloseProfileModal}
        user={cookieUser}
        handleLogout={handleLogout}
      />
    </>
  );
}

export default NavBar;