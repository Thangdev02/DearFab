import React, { useState, useEffect } from 'react';
import { Modal, Button, Image, Tabs, Tab, Form, ListGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getOrders, getOrderDetails, updateUser } from '../services/orderApi';
import axios from 'axios';

function ProfileModal({ show, handleClose, user }) {
  const defaultAvatar = 'https://t4.ftcdn.net/jpg/06/43/68/65/360_F_643686558_Efl6HB1ITw98bx1PdAd1wy56QpUTMh47.jpg';
  const navigate = useNavigate();

  // Get user data from cookie as fallback
  const userDataFromCookie = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {};

  const [firstName, ...lastNameParts] = (user?.name || userDataFromCookie.name || '').split(' ') || ['', ''];
  const lastName = lastNameParts.join(' ');

  const [activeTab, setActiveTab] = useState('thong-tin-tai-khoan');
  const [orders, setOrders] = useState([]);
  const [orderError, setOrderError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [orderDetailsError, setOrderDetailsError] = useState('');
  const userId = userDataFromCookie.id || 'guest';

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
  const [cities, setCities] = useState([]);

  // Fetch Vietnamese provinces
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

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        console.log('getOrders Response:', response);
        if (response.success) {
          const userOrders = response.orders || [];
          console.log('User Orders before sorting:', userOrders);
          userOrders.sort((a, b) => b.id.localeCompare(a.id));
          console.log('User Orders after sorting:', userOrders);
          setOrders(userOrders);
          setOrderError('');
        } else {
          console.log('Failed to fetch orders:', response.message);
          setOrderError(response.message || 'Không thể tải lịch sử đơn hàng.');
          setOrders([]);
        }
      } catch (error) {
        console.error('Error in fetchOrders:', error);
        setOrderError('Lỗi khi tải lịch sử đơn hàng: ' + error.message);
        setOrders([]);
      }
    };
    fetchOrders();
  }, [userId]);

  // Handle click to view order details
  const handleViewDetails = async (orderId) => {
    try {
      const response = await getOrderDetails(orderId);
      console.log('Order Details for', orderId, ':', response);
      if (response.success) {
        setSelectedOrder(response.order);
        setOrderDetailsError('');
        setShowDetailsModal(true);
      } else {
        setOrderDetailsError(response.message || 'Không thể tải chi tiết đơn hàng.');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      setOrderDetailsError('Lỗi khi tải chi tiết đơn hàng: ' + error.message);
    }
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedOrder(null);
    setOrderDetailsError('');
  };

  const handleLogout = () => {
    Cookies.remove('user');
    Cookies.remove('accessToken');
    handleClose();
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
    <>
      <Modal show={show} onHide={handleClose} centered size="xl" style={{ borderRadius: '8px' }}>
        <Modal.Header closeButton style={{ borderBottom: '1px solid #e9ecef', padding: '15px 20px' }}>
          <Modal.Title style={{ color: '#000', fontWeight: 'bold', fontSize: '20px' }}>
            Tài Khoản
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '0', display: 'flex', height: '500px', backgroundColor: '#f8f9fa' }}>
          <div style={{ width: '220px', backgroundColor: '#f0f2f5', borderRight: '1px solid #e9ecef', padding: '20px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  color: activeTab === 'thong-tin-tai-khoan' ? '#008200' : '#495057',
                  fontWeight: activeTab === 'thong-tin-tai-khoan' ? '600' : 'normal',
                  cursor: 'pointer',
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
                }}
                onClick={() => setActiveTab('lich-su-don-hang')}
              >
                Lịch Sử Đơn Hàng
              </div>
            </div>
            <div style={{ padding: '10px 20px' }}>
              {!isEditing ? (
                <Button
                  variant="success"
                  onClick={() => setIsEditing(true)}
                  style={{ width: '100%', borderRadius: '4px', padding: '6px 12px' }}
                >
                  Chỉnh sửa
                </Button>
              ) : (
                <>
                  <Button
                    variant="success"
                    onClick={handleSave}
                    style={{ width: '100%', borderRadius: '4px', padding: '6px 12px', marginBottom: '10px' }}
                  >
                    Lưu
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleCancel}
                    style={{ width: '100%', borderRadius: '4px', padding: '6px 12px' }}
                  >
                    Hủy
                  </Button>
                </>
              )}
            </div>
          </div>
          <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', overflowY: 'auto' }}>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              style={{ borderBottom: '1px solid #e9ecef', marginBottom: '20px' }}
              className="nav-tabs-custom"
            >
              <Tab eventKey="thong-tin-tai-khoan" title="Thông Tin Tài Khoản">
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div>
                    <Image
                      src={defaultAvatar}
                      rounded
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        border: '2px solid #dee2e6',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }}
                      alt="Ảnh đại diện"
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, maxHeight: '350px', overflowY: 'auto', paddingRight: '10px' }}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <Form.Group style={{ flex: 1 }}>
                          <Form.Label style={{ fontWeight: '500', color: '#495057' }}>Họ *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name.split(' ')[0] || 'N/A'}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                            style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: isEditing ? '#fff' : '#f8f9fa' }}
                          />
                        </Form.Group>
                        <Form.Group style={{ flex: 1 }}>
                          <Form.Label style={{ fontWeight: '500', color: '#495057' }}>Tên *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name.split(' ').slice(1).join(' ') || 'N/A'}
                            onChange={(e) => {
                              const [first, ...rest] = formData.name.split(' ');
                              setFormData(prev => ({ ...prev, name: [first, e.target.value].filter(Boolean).join(' ') }));
                            }}
                            readOnly={!isEditing}
                            style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: isEditing ? '#fff' : '#f8f9fa' }}
                          />
                        </Form.Group>
                      </div>
                      <Form.Group style={{ marginBottom: '15px' }}>
                        <Form.Label style={{ fontWeight: '500', color: '#495057' }}>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email || 'N/A'}
                          onChange={handleInputChange}
                          readOnly={!isEditing || true}
                          style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: isEditing ? '#fff' : '#f8f9fa' }}
                        />
                      </Form.Group>
                      <Form.Group style={{ marginBottom: '15px' }}>
                        <Form.Label style={{ fontWeight: '500', color: '#495057' }}>Số Điện Thoại</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone || 'N/A'}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: isEditing ? '#fff' : '#f8f9fa' }}
                        />
                      </Form.Group>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <Form.Group style={{ flex: 1, marginBottom: '15px' }}>
                          <Form.Label style={{ fontWeight: '500', color: '#495057' }}>Địa Chỉ</Form.Label>
                          <Form.Control
                            type="text"
                            name="address"
                            value={formData.address || 'N/A'}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                            style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: isEditing ? '#fff' : '#f8f9fa' }}
                          />
                        </Form.Group>
                        <Form.Group style={{ flex: 1, marginBottom: '15px' }}>
                          <Form.Label style={{ fontWeight: '500', color: '#495057' }}>Tỉnh</Form.Label>
                          {isEditing ? (
                            <Form.Select
                              name="city"
                              value={formData.city || ''}
                              onChange={handleInputChange}
                              style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: '#fff' }}
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
                              style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: '#f8f9fa' }}
                            />
                          )}
                        </Form.Group>
                      </div>
                    </Form>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="lich-su-don-hang" title="Lịch Sử Đơn Hàng">
                <div style={{ padding: '20px' }}>
                  {orderError && <Alert variant="danger">{orderError}</Alert>}
                  {orders.length === 0 && !orderError ? (
                    <p style={{ textAlign: 'center', color: '#6c757d' }}>Chưa có đơn nào</p>
                  ) : (
                    <ListGroup>
                      {orders.map(order => (
                        <ListGroup.Item
                          key={order.id}
                          className="mb-2"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleViewDetails(order.id)}
                        >
                          <div>
                            <strong className='text-success'> #{order.id}</strong>
                            <p><strong>Địa chỉ:</strong> {order.address}</p>
                            <p><strong>Trạng thái:</strong> {order.status}</p>
                            <p><strong>Tổng Tiền:</strong> {order.totalPrice.toLocaleString('vi-VN')} VND</p>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </div>
              </Tab>
            </Tabs>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: '1px solid #e9ecef', padding: '10px 20px', justifyContent: 'flex-end' }}>
          <Button
            variant="outline-success"
            onClick={handleLogout}
            style={{ marginRight: '10px', borderRadius: '4px', padding: '6px 12px' }}
          >
            Đăng Xuất
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal hiển thị chi tiết đơn hàng */}
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>#{selectedOrder?.id || ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderDetailsError && <Alert variant="danger">{orderDetailsError}</Alert>}
          {selectedOrder && (
            <div>
              <p><strong>Địa chỉ:</strong> {selectedOrder.address}</p>
              <p><strong>Trạng thái:</strong> {selectedOrder.status}</p>
              <p><strong>Tổng Tiền:</strong> {selectedOrder.totalPrice.toLocaleString('vi-VN')} VND</p>
              <h5>Sản Phẩm</h5>
              <ListGroup variant="flush">
                {(selectedOrder.items || []).map(item => (
                  <ListGroup.Item key={item.id} className="d-flex align-items-center py-2">
                    <Image
                      src={item.image || 'https://via.placeholder.com/50'}
                      rounded
                      style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                      alt={item.name}
                    />
                    <div>
                      <strong>{item.name}</strong>
                      <div><strong>Mô tả:</strong> {item.description}</div>
                      <div><strong>Giá:</strong> {item.price.toLocaleString('vi-VN')} VND</div>
                      <div><strong>Số lượng:</strong> {item.quantity}</div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailsModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileModal;