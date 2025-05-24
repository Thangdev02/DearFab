import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authApi';
import Cookies from 'js-cookie';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await loginUser(email, password);
    setLoading(false);

    if (result.success) {
      // Store user data in a cookie
      const userData = {
        name: result.user.name,
        role: result.role,
        address: result.user.address,
        phone: result.user.phone,
        city: result.user.city,
      };
      Cookies.set('user', JSON.stringify(userData), { expires: 7 });

      // Store role in localStorage (optional, for compatibility with existing code)
      localStorage.setItem('userRole', result.role);
      localStorage.setItem('userName', result.user.name);

      if (result.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f5f5f5',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
        marginTop:'3%'

      }}
    >
      <Container
        fluid
        style={{
          height: '100%',
          padding: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Row
          style={{
            width: '100%',
            maxWidth: '1200px',
            height: '80vh',
            margin: '0 auto',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Left Column - Form */}
          <Col
            md={6}
            style={{
              backgroundColor: '#fff',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold' }}>© DearFab</span>
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>Đăng Nhập vào DearFabt</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>Đăng nhập vào để bắt đầu mua sắm</p>


            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label style={{ fontWeight: '500' }}>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ borderRadius: '8px', padding: '10px', border: '1px solid #ccc' }}
                />
              </Form.Group>

              <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label style={{ fontWeight: '500' }}>Mật Khẩu*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ borderRadius: '8px', padding: '10px', border: '1px solid #ccc' }}
                />
              </Form.Group>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}
              >
                <Form.Check
                  type="checkbox"
                  label="Lưu mật khẩu"
                  style={{ fontSize: '14px' }}
                />
                <a href="/forgot-password" style={{ color: '#28a745', fontSize: '14px' }}>
                   Quên mật khẩu?
                </a>
              </div>

              <Button
                variant="dark"
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: '#333',
                  color: '#fff',
                  fontWeight: '600',
                  border: 'none',
                }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      style={{ marginRight: '8px' }}
                    />
                    Đang xử lý...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </Form>
          </Col>

          {/* Right Column - Image and Info */}
          <Col
            md={6}
            style={{
              backgroundColor: '#e0f0e5',
              padding: '40px',
              position: 'relative',
              borderTopRightRadius: '20px',
              borderBottomRightRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 20px 100%, 0 50%)',
            }}
          >
            <img
              src="https://i.pinimg.com/736x/92/b3/d0/92b3d077297e8d27865a7b6ee0a4285c.jpg"
              alt="Furniture"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                opacity: 0.7,
              }}
            />
            <div style={{ position: 'relative', zIndex: 2, color: '#333' }}>
              <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>
                Tham Gia Cùng Chúng Tôi
              </h3>
              <p style={{ fontSize: '16px', marginBottom: '30px' }}>
                Vải Ơi! Tranh ghép vải làm từ vải tái chế</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <Button
                  variant="outline-light"
                  style={{
                    borderRadius: '20px',
                    padding: '8px 20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: '#fff',
                    color: '#333',
                  }}
                >
                  100% Tái Chế
                </Button>
                <Button
                  variant="outline-light"
                  style={{
                    borderRadius: '20px',
                    padding: '8px 20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: '#fff',
                    color: '#333',
                  }}
                >
                  Chất liệu vải
                </Button>
              </div>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                 Chưa có tài khoản? <a href="/register" style={{ color: '#28a745', fontWeight: '500' }}>Đăng Ký</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;