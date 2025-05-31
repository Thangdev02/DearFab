import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Image, Form, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Cookies from 'js-cookie';
import { saveOrder } from '../services/orderApi';

function OrderPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], clearCart } = useContext(CartContext);

  const orderedItems = state?.orderedItems?.length ? state.orderedItems : cartItems;
  const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {};

  const [shippingInfo, setShippingInfo] = useState({
    fullName: userData.name || '',
    address: userData.address || '',
    phone: userData.phone || '',
    city: userData.city || '',
  });

  const [sizes, setSizes] = useState(
    orderedItems.reduce((acc, item) => {
      acc[item.id] = 'M';
      return acc;
    }, {})
  );

  const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');
  const [error, setError] = useState('');

  const [orderDate] = useState(
    new Date().toLocaleString('vi-VN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (itemId, value) => {
    setSizes((prev) => ({ ...prev, [itemId]: value }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // 👉 Tổng tiền được tính theo size đã chọn
  const calculateTotalPrice = () => {
    return orderedItems.reduce((acc, item) => {
      const selectedSize = sizes[item.id] || 'M';
      const priceBySize = item.sizes?.[selectedSize]?.price || item.price;
      return acc + priceBySize * item.quantity;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shippingInfo.fullName || !shippingInfo.address || !shippingInfo.phone || !shippingInfo.city) {
      setError('Vui lòng điền đầy đủ thông tin giao hàng.');
      return;
    }

    const updatedOrderedItems = orderedItems.map((item) => {
      const selectedSize = sizes[item.id] || 'M';
      const priceBySize = item.sizes?.[selectedSize]?.price || item.price;

      return {
        ...item,
        size: selectedSize,
        price: priceBySize,
      };
    });

    const orderData = {
      userId: userData.id || 'guest',
      orderedItems: updatedOrderedItems,
      totalPrice,
      shippingInfo,
      paymentMethod,
      orderDate,
      orderNumber: `ORD-${Math.floor(Math.random() * 1000000)}`,
      status: 'pending',
    };

    const result = await saveOrder(orderData);
    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate('/order-confirmation', { state: orderData });
    clearCart();
  };

  return (
    <Container className="py-5 my-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Row>
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
                      {orderedItems.map((item) => {
                        const selectedSize = sizes[item.id] || 'M';
                        const sizeInfo = item.sizes?.[selectedSize];
                        const price = sizeInfo?.price || item.price;

                        return (
                          <ListGroup.Item key={item.id} className="d-flex align-items-center py-3">
                            <Image
                              src={item.image || 'https://via.placeholder.com/50'}
                              rounded
                              style={{ width: 60, height: 60, objectFit: 'cover', marginRight: '1rem' }}
                              alt={item.name}
                            />
                            <div className="flex-grow-1">
                              <strong>{item.name}</strong>
                              <div>Kích thước: {selectedSize}</div>
                              <div>Giá: {price.toLocaleString('vi-VN')} VND</div>
                              <div>Số lượng: {item.quantity}</div>
                              <div>
                                Tổng: {(price * item.quantity).toLocaleString('vi-VN')} VND
                              </div>
                              <Form.Group className="mt-2" controlId={`formSize-${item.id}`}>
                                <Form.Label>Kích thước:</Form.Label>
                                <Form.Select
                                  value={selectedSize}
                                  onChange={(e) => handleSizeChange(item.id, e.target.value)}
                                  style={{ width: '100px' }}
                                >
                                  {Object.keys(item.sizes || { M: {} }).map((sizeOption) => (
                                    <option key={sizeOption} value={sizeOption}>
                                      {sizeOption}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </div>
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  )}
                  <hr />
                  <h5 className="text-end">
                    Tổng Tiền: {totalPrice.toLocaleString('vi-VN')} VND
                  </h5>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h4 className="mb-4" style={{ color: '#28a745' }}>
                    Thông Tin Đặt Hàng
                  </h4>
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
