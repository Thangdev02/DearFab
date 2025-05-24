import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  // Fetch Vietnamese provinces from the API
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/?depth=1');
        setCities(response.data.map(province => province.name));
      } catch (err) {
        setError('Lỗi khi tải danh sách thành phố.');
        const vietnamCities = [
          'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
          'Nha Trang', 'Huế', 'Vũng Tàu', 'Đồng Nai', 'Bình Dương',
        ];
        setCities(vietnamCities);
      }
    };
    fetchCities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password || !name || !address || !phone || !city) {
      setError('Vui lòng điền đầy đủ thông tin.');
      setLoading(false);
      return;
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
      name,
      address,
      phone,
      city,
      role: 'user',
    };

    try {
      const response = await axios.post('https://dearfab.onrender.com/users', newUser);
      if (response.status === 201) {
        setShowToast(true);
        setEmail('');
        setPassword('');
        setName('');
        setAddress('');
        setPhone('');
        setCity('');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError('Đăng ký thất bại. Email đã tồn tại hoặc có lỗi khác.');
      setLoading(false);
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
              <span style={{ fontSize: '24px', fontWeight: 'bold' }}>© DearFab</span>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label style={{ fontWeight: '500' }}>Họ và tên*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ borderRadius: '8px', padding: '10px', border: '1px solid #ccc' }}
                />
              </Form.Group>

              <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label style={{ fontWeight: '500' }}>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
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
                    placeholder="Enter your phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    style={{ borderRadius: '8px', padding: '10px', border: '1px solid #ccc' }}
                  />
                </Form.Group>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

                <Form.Group style={{ marginBottom: '20px' }}>
                  <Form.Label style={{ fontWeight: '500' }}>Địa chỉ*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    style={{ borderRadius: '8px', padding: '10px', border: '1px solid #ccc', width: '300px' }}
                  />
                </Form.Group>

                
                <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Label style={{ fontWeight: '500' }}>Tỉnh*</Form.Label>
                <Form.Select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  style={{ borderRadius: '8px', padding: '10px', border: '1px solid #ccc' }}
                >
                  <option value="">Chọn</option>
                  {cities.map((cityName, index) => (
                    <option key={index} value={cityName}>{cityName}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              </div>
              

              <Form.Group style={{ marginBottom: '20px' }}>
                <Form.Check
                  type="checkbox"
                  label="Tôi đồng ý với các điều khoản"
                  required
                  style={{ fontSize: '14px' }}
                />
              </Form.Group>

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
              <div style={{ textAlign: 'center', marginTop: '20px'}}>
                Đã có tài khoản? <a href="/login" style={{ color: '#28a745', fontWeight: '500' }}>Đăng Nhập</a>
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
          <strong className="me-auto" style={{ color: '#28a745' }}>Thông Báo</strong>
        </Toast.Header>
        <Toast.Body>Đăng ký thành công!</Toast.Body>
      </Toast>
    </div>
  );
}

export default RegisterPage;