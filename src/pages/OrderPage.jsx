import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Image, Form, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Cookies from 'js-cookie';
import { saveOrder } from '../services/orderApi'; // Import the new API service

function OrderPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], clearCart } = useContext(CartContext);

  // Extract order details from navigation state
  const orderedItems = state?.orderedItems || [];
  const totalPrice = state?.totalPrice || 0;

  // Get user data from cookie
  const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {};

  // State for shipping information and payment method, pre-filled with cookie data
  const [shippingInfo, setShippingInfo] = useState({
    fullName: userData.name || '',
    address: userData.address || '',
    phone: userData.phone || '',
    city: userData.city || '',
  });

  // State for sizes of each item (initialize with default size "M")
  const [sizes, setSizes] = useState(
    orderedItems.reduce((acc, item) => {
      acc[item.id] = 'M'; // Default size
      return acc;
    }, {})
  );

  const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');
  const [error, setError] = useState('');

  // Current date and time (02:00 AM +07, May 24, 2025)
  const orderDate = new Date('2025-05-24T02:00:00+07:00').toLocaleString('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // Handle input changes for shipping info
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  // Handle size change for each item
  const handleSizeChange = (itemId, value) => {
    setSizes(prev => ({ ...prev, [itemId]: value }));
  };

  // Handle payment method change
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shippingInfo.fullName || !shippingInfo.address || !shippingInfo.phone || !shippingInfo.city) {
      setError('Vui lòng điền đầy đủ thông tin giao hàng.');
      return;
    }

    // Add selected sizes to ordered items
    const updatedOrderedItems = orderedItems.map(item => ({
      ...item,
      size: sizes[item.id] || 'M', // Use selected size or default to 'M'
    }));

    // Prepare order data
    const orderData = {
      orderedItems: updatedOrderedItems,
      totalPrice,
      shippingInfo,
      paymentMethod,
      orderDate,
      orderNumber: `ORD-${Math.floor(Math.random() * 1000000)}`,
      status: 'pending', // Initial status
    };

    // Save order to db.json
    const result = await saveOrder(orderData);
    if (!result.success) {
      setError(result.message);
      return;
    }

    // Navigate to confirmation page with order data
    navigate('/order-confirmation', { state: orderData });
    clearCart();
  };

  return (
    <Container className="py-5 my-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Row>
            {/* Left Side: Order Summary */}
            <Col md={6} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h4 className="mb-4" style={{ color: '#28a745' }}>
                    Tóm Tắt Đơn Hàng
                  </h4>
                  {orderedItems.length === 0 ? (
                    <p>Không có sản phẩm nào trong giỏ hàng.</p>
                  ) : (
                    <ListGroup variant="flush" className="mb-4">
                      {orderedItems.map(item => (
                        <ListGroup.Item key={item.id} className="d-flex align-items-center py-3">
                          <Image
                            src={item.image || 'https://via.placeholder.com/50'}
                            rounded
                            style={{ width: 60, height: 60, objectFit: 'cover', marginRight: '1rem' }}
                            alt={item.name}
                          />
                          <div className="flex-grow-1">
                            <strong>{item.name}</strong>
                            <div>Giá: {item.price.toLocaleString('vi-VN')} VND</div>
                            <div>Số lượng: {item.quantity}</div>
                            <div>
                              Tổng: {(item.price * item.quantity).toLocaleString('vi-VN')} VND
                            </div>
                            <Form.Group className="mt-2" controlId={`formSize-${item.id}`}>
                              <Form.Label>Kích thước:</Form.Label>
                              <Form.Select
                                value={sizes[item.id] || 'M'}
                                onChange={(e) => handleSizeChange(item.id, e.target.value)}
                                style={{ width: '100px' }}
                              >
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                              </Form.Select>
                            </Form.Group>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                  <hr />
                  <h5 className="text-end">
                    Tổng Tiền: {totalPrice.toLocaleString('vi-VN')} VND
                  </h5>
                </Card.Body>
              </Card>
            </Col>

            {/* Right Side: Shipping Information and Payment Method */}
            <Col md={6} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h4 className="mb-4" style={{ color: '#28a745' }}>
                    Thông Tin Đặt Hàng
                  </h4>

                  {/* Shipping Information Form */}
                  <h5 className="mb-3">Thông Tin Giao Hàng</h5>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formFullName">
                      <Form.Label>Họ và Tên</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleInputChange}
                        placeholder="Nhập họ và tên"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAddress">
                      <Form.Label>Địa Chỉ</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        placeholder="Nhập địa chỉ"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhone">
                      <Form.Label>Số Điện Thoại</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        placeholder="Nhập số điện thoại"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCity">
                      <Form.Label>Thành Phố</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        placeholder="Nhập thành phố"
                        required
                      />
                    </Form.Group>

                    {/* Payment Method */}
                    <h5 className="mb-3">Phương Thức Thanh Toán</h5>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="radio"
                        label="Thanh toán khi nhận hàng (COD)"
                        name="paymentMethod"
                        value="cash-on-delivery"
                        checked={paymentMethod === 'cash-on-delivery'}
                        onChange={handlePaymentChange}
                      />
                      <Form.Check
                        type="radio"
                        label="Thanh toán online"
                        name="paymentMethod"
                        value="online-payment"
                        checked={paymentMethod === 'online-payment'}
                        onChange={handlePaymentChange}
                      />
                    </Form.Group>

                    <Button
                      variant="success"
                      type="submit"
                      className="w-100 mt-3"
                      style={{ fontWeight: '600', fontSize: '1.1rem' }}
                    >
                      Xác Nhận Đặt Hàng
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderPage;