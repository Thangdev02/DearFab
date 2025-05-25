import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function AdminHeader({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('user');
    navigate('/login');
  };

  const toggleBtnStyle = {
    display: window.innerWidth < 768 ? 'block' : 'none',
    marginRight: '10px',
  };

  return (
    <Navbar style={{ backgroundColor: '#013d21' }} variant="dark" expand="lg" className="mb-4" sticky="top">
      <Container>
        <Button
          variant="outline-light"
          onClick={toggleSidebar}
          style={toggleBtnStyle}
        >
          ☰
        </Button>
        {/* <Navbar.Brand href="/admin">Admin Dashboard</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="admin-nav" />
        <Navbar.Collapse id="admin-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/admin/products">Products</Nav.Link>
            <Nav.Link href="/admin/orders">Orders</Nav.Link>
            <Nav.Link href="/admin/users">Users</Nav.Link>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;
