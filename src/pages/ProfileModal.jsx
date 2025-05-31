import React, { useState, useEffect } from 'react';
import { Modal, Button, Image, Tabs, Tab, Form, ListGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getOrders, updateUser } from '../services/orderApi';
import axios from 'axios';

function ProfileModal({ show, handleClose, user }) {
  const defaultAvatar = 'https://t4.ftcdn.net/jpg/06/43/68/65/360_F_643686558_Efl6HB1ITw98bx1PdAd1wy56QpUTMh47.jpg';
  const navigate = useNavigate();

  // Get user data from cookie as fallback
  const userDataFromCookie = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {};

  // Split full name into first name and last name
  const [firstName, ...lastNameParts] = (user?.name || userDataFromCookie.name || '').split(' ') || ['', ''];
  const lastName = lastNameParts.join(' ');

  // State for active tab
  const [activeTab, setActiveTab] = useState('thong-tin-tai-khoan');

  // State for orders
  const [orders, setOrders] = useState([]);
  const userId = userDataFromCookie.id || 'guest';

  // State for edit mode and form data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || userDataFromCookie.name || '',
    email: user?.email || userDataFromCookie.email || '',
    address: user?.address || userDataFromCookie.address || '',
    phone: user?.phone || userDataFromCookie.phone || '',
    city: user?.city || userDataFromCookie.city || '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // State for cities
  const [cities, setCities] = useState([]);

  // Fetch Vietnamese provinces from the API
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/?depth=1');
        setCities(response.data.map(province => province.name));
      } catch (err) {
        setError('Lỗi khi tải danh sách tỉnh thành.');
        const vietnamCities = [
          'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
          'Nha Trang', 'Huế', 'Vũng Tàu', 'Đồng Nai', 'Bình Dương',
        ];
        setCities(vietnamCities);
      }
    };
    fetchCities();
  }, []);

  // Fetch and sort orders
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders();
      if (response.success) {
        const userOrders = response.orders.filter(order => order.userId === userId);
        userOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrders(userOrders);
      }
    };
    fetchOrders();
  }, [userId]);

  const handleLogout = () => {
    Cookies.remove('user');
    handleClose();
    navigate('/login');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle save changes
  const handleSave = async () => {
    try {
      const updatedUser = {
        id: userId,
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        city: formData.city,
      };
      const response = await updateUser(userId, updatedUser);
      if (response.success) {
        setSuccess('Cập nhật thông tin thành công!');
        setError('');
        // Update cookie with new user data
        Cookies.set('user', JSON.stringify(updatedUser), { expires: 7 });
        setIsEditing(false);
      } else {
        setError(response.message || 'Cập nhật thất bại');
        setSuccess('');
      }
    } catch (error) {
      setError('Lỗi khi cập nhật thông tin: ' + error.message);
      setSuccess('');
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setFormData({
      name: user?.name || userDataFromCookie.name || '',
      email: user?.email || userDataFromCookie.email || '',
      address: user?.address || userDataFromCookie.address || '',
      phone: user?.phone || userDataFromCookie.phone || '',
      city: user?.city || userDataFromCookie.city || '',
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="xl" style={{ borderRadius: '8px' }}>
      <Modal.Header closeButton style={{ borderBottom: '1px solid #e9ecef', padding: '15px 20px' }}>
        <Modal.Title style={{ color: '#000', fontWeight: 'bold', fontSize: '20px' }}>
          Tài Khoản
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '0', display: 'flex', height: '500px', backgroundColor: '#f8f9fa', '@media (max-width: 768px)': { flexDirection: 'column' } }}>
        {/* Left Sidebar */}
        <div
          style={{
            width: '220px',
            backgroundColor: '#f0f2f5',
            borderRight: '1px solid #e9ecef',
            padding: '20px 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '@media (max-width: 768px)': {
              width: '100%',
              borderRight: 'none',
              borderBottom: '1px solid #e9ecef',
              padding: '10px 0',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
            },
          }}
        >
          <div style={{ '@media (max-width: 768px)': { display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' } }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 20px',
                color: activeTab === 'thong-tin-tai-khoan' ? '#008200' : '#495057',
                fontWeight: activeTab === 'thong-tin-tai-khoan' ? '600' : 'normal',
                cursor: 'pointer',
                '@media (max-width: 768px)': {
                  padding: '8px 15px',
                  fontSize: '14px',
                  backgroundColor: activeTab === 'thong-tin-tai-khoan' ? '#e0f0e5' : 'transparent',
                  borderRadius: '20px',
                },
              }}
              onClick={() => setActiveTab('thong-tin-tai-khoan')}
            >
              Thông Tin Tài Khoản
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 20px',
                color: activeTab === 'lich-su-don-hang' ? '#008200' : '#495057',
                fontWeight: activeTab === 'lich-su-don-hang' ? '600' : 'normal',
                cursor: 'pointer',
                '@media (max-width: 768px)': {
                  padding: '8px 15px',
                  fontSize: '14px',
                  backgroundColor: activeTab === 'lich-su-don-hang' ? '#e0f0e5' : 'transparent',
                  borderRadius: '20px',
                },
              }}
              onClick={() => setActiveTab('lich-su-don-hang')}
            >
              Lịch Sử Đơn Hàng
            </div>
          </div>
          <div style={{ padding: '10px 20px', '@media (max-width: 768px)': { padding: '10px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' } }}>
            {!isEditing ? (
              <Button
                variant="success"
                onClick={() => setIsEditing(true)}
                style={{ width: '100%', borderRadius: '4px', padding: '6px 12px', '@media (max-width: 768px)': { width: 'auto', padding: '6px 20px', borderRadius: '20px' } }}
              >
                Chỉnh sửa
              </Button>
            ) : (
              <>
                <Button
                  variant="success"
                  onClick={handleSave}
                  style={{ width: '100%', borderRadius: '4px', padding: '6px 12px', marginBottom: '10px', '@media (max-width: 768px)': { width: 'auto', padding: '6px 20px', marginBottom: '0', borderRadius: '20px' } }}
                >
                  Lưu
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  style={{ width: '100%', borderRadius: '4px', padding: '6px 12px', '@media (max-width: 768px)': { width: 'auto', padding: '6px 20px', borderRadius: '20px' } }}
                >
                  Hủy
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', overflowY: 'auto', '@media (max-width: 768px)': { padding: '10px' } }}>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            style={{ borderBottom: '1px solid #e9ecef', marginBottom: '20px', '@media (max-width: 768px)': { marginBottom: '10px', display: 'none' } }}
            className="nav-tabs-custom"
          >
            <Tab eventKey="thong-tin-tai-khoan" title="Thông Tin Tài Khoản">
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', '@media (max-width: 768px)': { flexDirection: 'column', gap: '10px' } }}>
                {/* Avatar */}
                <div style={{ '@media (max-width: 768px)': { marginBottom: '10px' } }}>
                  <Image
                    src={defaultAvatar}
                    rounded
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      border: '2px solid #dee2e6',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      '@media (max-width: 768px)': { width: '100px', height: '100px' },
                    }}
                    alt="Ảnh đại diện"
                  />
                </div>

                {/* Form Fields */}
                <div style={{ flex: 1, minWidth: 0, maxHeight: '350px', overflowY: 'auto', paddingRight: '10px', '@media (max-width: 768px)': { paddingRight: '0' } }}>
                  {error && <Alert variant="danger" style={{ '@media (max-width: 768px)': { fontSize: '14px' } }}>{error}</Alert>}
                  {success && <Alert variant="success" style={{ '@media (max-width: 768px)': { fontSize: '14px' } }}>{success}</Alert>}
                  <Form>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', '@media (max-width: 768px)': { flexDirection: 'column', gap: '10px' } }}>
                      <Form.Group style={{ flex: 1 }}>
                        <Form.Label style={{ fontWeight: '500', color: '#495057', '@media (max-width: 768px)': { fontSize: '14px' } }}>Họ *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name.split(' ')[0] || 'N/A'}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: isEditing ? '#fff' : '#f8f9fa', '@media (max-width: 768px)': { fontSize: '14px' } }}
                        />
                      </Form.Group>
                      <Form.Group style={{ flex: 1 }}>
                        <Form.Label style={{ fontWeight: '500', color: '#495057', '@media (max-width: 768px)': { fontSize: '14px' } }}>Tên *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name.split(' ').slice(1).join(' ') || 'N/A'}
                          onChange={(e) => {
                            const [first, ...rest] = formData.name.split(' ');
                            setFormData(prev => ({ ...prev, name: [first, e.target.value].filter(Boolean).join(' ') }));
                          }}
                          readOnly={!isEditing}
                          style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: isEditing ? '#fff' : '#f8f9fa', '@media (max-width: 768px)': { fontSize: '14px' } }}
                        />
                      </Form.Group>
                    </div>
                    <Form.Group style={{ marginBottom: '15px' }}>
                      <Form.Label style={{ fontWeight: '500', color: '#495057', '@media (max-width: 768px)': { fontSize: '14px' } }}>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email || 'N/A'}
                        onChange={handleInputChange}
                        readOnly={!isEditing || true} // Email thường không cho chỉnh sửa
                        style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: isEditing ? '#fff' : '#f8f9fa', '@media (max-width: 768px)': { fontSize: '14px' } }}
                      />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: '15px' }}>
                      <Form.Label style={{ fontWeight: '500', color: '#495057', '@media (max-width: 768px)': { fontSize: '14px' } }}>Số Điện Thoại</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone || 'N/A'}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: isEditing ? '#fff' : '#f8f9fa', '@media (max-width: 768px)': { fontSize: '14px' } }}
                      />
                    </Form.Group>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', '@media (max-width: 768px)': { flexDirection: 'column', gap: '10px' } }}>
                      <Form.Group style={{ flex: 1, marginBottom: '15px' }}>
                        <Form.Label style={{ fontWeight: '500', color: '#495057', '@media (max-width: 768px)': { fontSize: '14px' } }}>Địa Chỉ</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address || 'N/A'}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: isEditing ? '#fff' : '#f8f9fa', '@media (max-width: 768px)': { fontSize: '14px' } }}
                        />
                      </Form.Group>
                      <Form.Group style={{ flex: 1, marginBottom: '15px' }}>
                        <Form.Label style={{ fontWeight: '500', color: '#495057', '@media (max-width: 768px)': { fontSize: '14px' } }}>Tỉnh</Form.Label>
                        {isEditing ? (
                          <Form.Select
                            name="city"
                            value={formData.city || ''}
                            onChange={handleInputChange}
                            style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: '#fff', '@media (max-width: 768px)': { fontSize: '14px' } }}
                          >
                            <option value="">Chọn tỉnh</option>
                            {cities.map((cityName, index) => (
                              <option key={index} value={cityName}>{cityName}</option>
                            ))}
                          </Form.Select>
                        ) : (
                          <Form.Control
                            type="text"
                            name="city"
                            value={formData.city || 'N/A'}
                            readOnly
                            style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: '#f8f9fa', '@media (max-width: 768px)': { fontSize: '14px' } }}
                          />
                        )}
                      </Form.Group>
                    </div>
                  </Form>
                </div>
              </div>
            </Tab>
            <Tab eventKey="lich-su-don-hang" title="Lịch Sử Đơn Hàng">
              <div style={{ padding: '20px', '@media (max-width: 768px)': { padding: '10px' } }}>
                {orders.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#6c757d', '@media (max-width: 768px)': { fontSize: '14px' } }}>Chưa có đơn nào</p>
                ) : (
                  <ListGroup>
                    {orders.map(order => (
                      <ListGroup.Item key={order.id} className="mb-2">
                        <div style={{ '@media (max-width: 768px)': { fontSize: '14px' } }}>
                          <strong>Đơn Hàng #{order.orderNumber}</strong>
                          <p><strong>Ngày đặt hàng:</strong> {order.orderDate}</p>
                          <p><strong>Trạng thái:</strong> {order.status}</p>
                          <p><strong>Tổng Tiền:</strong> {order.totalPrice.toLocaleString('vi-VN')} VND</p>
                        </div>
                        <ListGroup variant="flush">
                          {order.orderedItems.map(item => (
                            <ListGroup.Item key={item.id} className="d-flex align-items-center py-2" style={{ '@media (max-width: 768px)': { flexDirection: 'column', alignItems: 'flex-start', gap: '5px' } }}>
                              <Image
                                src={item.image || 'https://via.placeholder.com/50'}
                                rounded
                                style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px', '@media (max-width: 768px)': { width: '40px', height: '40px', marginRight: '0', marginBottom: '5px' } }}
                                alt={item.name}
                              />
                              <div style={{ '@media (max-width: 768px)': { fontSize: '14px' } }}>
                                <strong>{item.name}</strong>
                                <div>Giá: {item.price.toLocaleString('vi-VN')} VND</div>
                                <div>Số lượng: {item.quantity}</div>
                                <div>Kích thước: {item.size}</div>
                              </div>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: '1px solid #e9ecef', padding: '10px 20px', justifyContent: 'flex-end', '@media (max-width: 768px)': { padding: '10px' } }}>
        <Button
          variant="outline-success"
          onClick={handleLogout}
          style={{ marginRight: '10px', borderRadius: '4px', padding: '6px 12px', '@media (max-width: 768px)': { width: '100%', marginRight: '0' } }}
        >
          Đăng Xuất
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileModal;