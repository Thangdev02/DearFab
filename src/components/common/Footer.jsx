import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Logo from '../../../public/logo.png';

function Footer() {
  return (
    <footer style={styles.footer}>
      <Container className="py-4">
        {/* Email Signup Section */}
        <Row className="justify-content-center mb-4">
          <Col md={6} className="text-center">
            <div style={styles.logo}><img style={{width: '10%'}} src="dearFabLogo.png"/></div>
            <h2 style={styles.signupTitle}>
              Tranh ghép vải làm từ vải tái chế
            </h2>
            <Form inline className="mb-3 d-flex justify-content-center">
              <Form.Control
                type="email"
                placeholder="Nhập email của bạn"
                style={styles.emailInput}
              />
              <Button variant="success" style={styles.tryButton}>
                Thử Ngay
              </Button>
            </Form>
          </Col>

        </Row>

        {/* Navigation Links */}
        <Row className="justify-content-center mb-2">
          <Col className="text-center">
            <ul style={styles.navList}>
              <li style={styles.navItem}>Tính năng</li>
              <li style={styles.navItem}>Kế hoạch & Giá</li>
              <li style={styles.navItem}>Tin tức & Blog</li>
              <li style={styles.navItem}>Nghề nghiệp</li>
              <li style={styles.navItem}>Về chúng tôi</li>
              <li style={styles.navItem}>Điều khoản</li>
              <li style={styles.navItem}>Quyền riêng tư</li>
              <li style={styles.navItem}>Cookie</li>
            </ul>
          </Col>
        </Row>
      
      </Container>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'rgb(37, 41, 38)',
    color: '#ffffff',
    paddingTop: '40px',
    paddingBottom: '20px',
    borderTop: '5px solid #28a745',
  },
  logo: {
    marginBottom: '10px',
  },
  signupTitle: {
    fontSize: '1.3rem',
    color: '#ffffff',
    marginBottom: '20px',
    fontWeight: '500',
  },
  emailInput: {
    width: '70%',
    maxWidth: '300px',
    borderRadius: '20px 0 0 20px',
    border: 'none',
    padding: '10px',
    marginRight: '-1px',
  },
  tryButton: {
    backgroundColor: '#28a745',
    borderRadius: '0 20px 20px 0',
    border: 'none',
    padding: '10px 20px',
    color: '#ffffff',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#218838',
    },
  },
  navList: {
    listStyle: 'none',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  navItem: {
    fontSize: '0.9rem',
    color: '#ffffff',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#28a745',
    },
  },
};

export default Footer;