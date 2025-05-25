import React from 'react';
import { Modal, Button, Image, Tabs, Tab, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProfileModal({ show, handleClose, user }) {
  // Default avatar URL (using the provided placeholder)
  const defaultAvatar = 'https://t4.ftcdn.net/jpg/06/43/68/65/360_F_643686558_Efl6HB1ITw98bx1PdAd1wy56QpUTMh47.jpg';
const navigate = useNavigate();
  // Split full name into first name and last name
  const [firstName, ...lastNameParts] = (user?.name || '').split(' ') || ['', ''];
  const lastName = lastNameParts.join(' ');

  const handleLogout = () => {
      Cookies.remove('user');
      handleClose();
      navigate('/login');
  }
  // Debug user object to ensure email is accessible
//   console.log('User object:', user);

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" style={{ borderRadius: '8px' }}>
      <Modal.Header closeButton style={{ borderBottom: '1px solid #e9ecef', padding: '15px 20px' }}>
        <Modal.Title style={{ color: '#000', fontWeight: 'bold', fontSize: '20px' }}>
          Tài Khoản
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '0', display: 'flex', height: '500px', backgroundColor: '#f8f9fa' }}>
        {/* Left Sidebar */}
        <div
          style={{
            width: '200px',
            backgroundColor: '#f0f2f5',
            borderRight: '1px solid #e9ecef',
            padding: '20px 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 20px',
              color: user?.activeTab === 'account' ? '#007bff' : '#495057',
              fontWeight: user?.activeTab === 'account' ? '600' : 'normal',
              cursor: 'pointer',
            }}
            onClick={() => user?.setActiveTab('account')}
          >
            <span style={{ marginRight: '10px' }}>📋</span> Account Details
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 20px',
              color: user?.activeTab === 'orders' ? '#007bff' : '#495057',
              fontWeight: user?.activeTab === 'orders' ? '600' : 'normal',
              cursor: 'pointer',
            }}
            onClick={() => user?.setActiveTab('orders')}
          >
            <span style={{ marginRight: '10px' }}>📦</span> Order History
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', overflowY: 'auto' }}>
          <Tabs
            activeKey={user?.activeTab || 'account'}
            onSelect={(k) => user?.setActiveTab(k)}
            style={{ borderBottom: '1px solid #e9ecef', marginBottom: '20px' }}
            className="nav-tabs-custom"
          >
            <Tab eventKey="account" title="Account Details">
              <div style={{ display: 'flex', gap: '20px' }}>
                {/* Avatar */}
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
                    alt="User Avatar"
                  />
                  
                </div>

                {/* Form Fields */}
                <div style={{ flex: 1, maxHeight: '350px', overflowY: 'auto', paddingRight: '10px' }}>
                  <Form>
                    <Form.Group style={{ marginBottom: '15px' }}>
                      <Form.Label style={{ fontWeight: '500', color: '#495057' }}>Họ *</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={firstName || 'N/A'}
                        readOnly
                        style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: '#f8f9fa' }}
                      />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: '15px' }}>
                      <Form.Label style={{ fontWeight: '500', color: '#495057' }}>Tên *</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={lastName || 'N/A'}
                        readOnly
                        style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: '#f8f9fa' }}
                      />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: '15px' }}>
                      <Form.Label style={{ fontWeight: '500', color: '#495057' }}>E-Mail *</Form.Label>
                      <Form.Control
                        type="email"
                        defaultValue={user?.email || 'N/A'}
                        readOnly
                        style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: '#f8f9fa' }}
                      />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: '15px' }}>
                      <Form.Label style={{ fontWeight: '500', color: '#495057' }}>Địa Chỉ</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={user?.address || 'N/A'}
                        readOnly
                        style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: '#f8f9fa' }}
                      />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: '15px' }}>
                      <Form.Label style={{ fontWeight: '500', color: '#495057' }}>Số Điện Thoại</Form.Label>
                      <Form.Control
                        type="tel"
                        defaultValue={user?.phone || 'N/A'}
                        readOnly
                        style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: '#f8f9fa' }}
                      />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: '15px' }}>
                      <Form.Label style={{ fontWeight: '500', color: '#495057' }}>Tỉnh</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={user?.city || 'N/A'}
                        readOnly
                        style={{ borderRadius: '4px', borderColor: '#ced4da', backgroundColor: '#f8f9fa' }}
                      />
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </Tab>
            <Tab eventKey="orders" title="Order History">
              <div style={{ padding: '20px', textAlign: 'center', color: '#6c757d' }}>
                 Chưa có đơn nào
              </div>
            </Tab>
          </Tabs>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: '1px solid #e9ecef', padding: '10px 20px', justifyContent: 'flex-end' }}>
        <Button
          variant="outline-primary"
          onClick={handleLogout}
          style={{ marginRight: '10px', borderRadius: '4px', padding: '6px 12px' }}
        >
           Đăng Xuất
        </Button>
      
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileModal;