import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authApi';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password || !fullName || !address || !phone) {
      setError('Vui lòng điền đầy đủ thông tin.');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ.');
      setLoading(false);
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError('Số điện thoại phải là 10 chữ số.');
      setLoading(false);
      return;
    }

    const newUser = { email, password, fullName, address, phone };
    const result = await registerUser(newUser);

    if (result.success) {
      setShowToast(true);
      setEmail('');
      setPassword('');
      setFullName('');
      setAddress('');
      setPhone('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#f5f5f5',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
        paddingTop: '8%',
      }}
    >
      <Container
        fluid
        style={{
          minHeight: '100%',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Row
          style={{
            width: '100%',
            maxWidth: '1200px',
            minHeight: '80vh',
            margin: '0 auto',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Left Column - Form */}
          <Col
            xs={12}
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
              <span style={{ fontSize: '24px', fontWeight: 'bold' }}>© DearFab</span>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label style={{ fontWeight: '500' }}>Họ và tên*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  style={{ borderRadius: '8px', padding: '10px', border: '1px solid #ccc' }}
                />
              </Form.Group>

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
                <Form.Label style={{ fontWeight: '500' }}>Mật khẩu*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ borderRadius: '8px', padding: '10px', border: '1px solid #ccc' }}
                />
              </Form.Group>

              <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label style={{ fontWeight: '500' }}>Số điện thoại*</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Nhập số điện thoại của bạn"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{ borderRadius: '8px', padding: '10px', border: '1px solid #ccc' }}
                />
              </Form.Group>

              <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label style={{ fontWeight: '500' }}>Địa chỉ*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập địa chỉ của bạn"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  style={{ borderRadius: '8px', padding: '10px', border: '1px solid #ccc' }}
                />
              </Form.Group>

              <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Check
                  type="checkbox"
                  label="Tôi đồng ý với các điều khoản"
                  required
                  style={{ fontSize: '14px' }}
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}

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
                  'Đăng Ký'
                )}
              </Button>
            </Form>
          </Col>

          {/* Right Column - Image and Info */}
          <Col
            xs={12}
            md={6}
            style={{
              backgroundColor: '#e0f0e5',
              padding: '40px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              minHeight: '300px',
              clipPath:
                window.innerWidth >= 768
                  ? 'polygon(20px 0, 100% 0, 100% 100%, 20px 100%, 0 50%)'
                  : 'none',
            }}
          >
            <img
              src="https://i.pinimg.com/736x/92/b3/d0/92b3d077297e8d27865a7b6ee0a4285c.jpg"
              alt="Furniture"
              style={{
                width: '100%',
                height: '100%',
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
                Vải Ơi! Tranh ghép vải làm từ vải tái chế
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
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
                Đã có tài khoản?{' '}
                <a href="/login" style={{ color: '#28a745', fontWeight: '500' }}>
                  Đăng Nhập
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Toast for success message */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          minWidth: '250px',
        }}
        delay={2000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto" style={{ color: '#28a745' }}>
            Thông Báo
          </strong>
        </Toast.Header>
        <Toast.Body>Đăng ký thành công!</Toast.Body>
      </Toast>
    </div>
  );
}

export default RegisterPage;
