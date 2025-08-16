import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Image, Form, Alert, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Cookies from 'js-cookie';
import { saveOrder } from '../services/orderApi';
import axios from 'axios';

function OrderPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);

  const orderedItems = state?.orderedItems?.length ? state.orderedItems : cartItems;
  const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {};
  const shippingMode = state?.shippingMode || 'storePickup';

  const [shippingInfo, setShippingInfo] = useState({
    fullName: userData.name || '',
    address: userData.address || '',
    phone: userData.phone || '',
    city: userData.city || '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const calculateTotalPrice = () => {
    return orderedItems.reduce((acc, item) => {
      const selectedSize = item.selectedSize || 'M';
      const priceBySize = item.sizes?.[selectedSize]?.price || item.price;
      return acc + priceBySize * item.quantity;
    }, 0) + (shippingMode === 'delivery' ? 9900 : 0);
  };

  const totalPrice = calculateTotalPrice();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shippingInfo.address) {
      setError('Vui lòng nhập địa chỉ giao hàng.');
      return;
    }

    const orderItems = orderedItems.map((item) => {
      const selectedSize = item.selectedSize || 'M';
      const sizeObj = item.productSizes?.find((s) => s.size === `Size ${selectedSize}`);
      return {
        productSizeId: sizeObj?.id || item.productSizeId,
        quantity: item.quantity,
      };
    }).filter((i) => i.productSizeId);

    const payload = {
      orderItems,
      address: shippingInfo.address,
    };

    try {
      setLoading(true);
      console.log("Submitting order with payload:", payload);
      const result = await saveOrder(payload);

      if (result.success) {
        // Lấy đúng UUID mà API trả về
        const orderId = result.order?.id;  // <-- dùng id, không phải orderCode
        console.log('Order ID created (UUID):', orderId);
      
        if (paymentMethod === 'online-payment') {
          try {
            const token = Cookies.get('accessToken');
            if (!token) {
              setError('Bạn chưa đăng nhập hoặc thiếu token để thanh toán.');
              return;
            }
      
            const paymentPayload = { orderId };
            console.log('Payment Payload:', paymentPayload);
      
            const paymentResponse = await axios.post(
              'https://api.dearfab.com/api/v1/payment',
              paymentPayload,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
              }
            );
      
            console.log('Payment Response:', paymentResponse.data);
      
            if (paymentResponse.data.status === 200) {
              const { checkoutUrl } = paymentResponse.data.data;
              window.location.href = checkoutUrl; // điều hướng tới trang thanh toán
            } else {
              setError('Tạo liên kết thanh toán thất bại: ' + paymentResponse.data.message);
            }
          } catch (error) {
            console.error('Payment API error:', error.response ? error.response.data : error.message);
            setError('Không thể tạo thanh toán online. Vui lòng thử lại.');
          }
        } else {
          // Thanh toán COD
          const orderState = {
            orderId, // dùng UUID cho tracking nội bộ
            orderedItems: orderedItems.map(item => ({
              ...item,
              price: item.sizes?.[item.selectedSize || 'M']?.price || item.price,
              size: item.selectedSize || 'M',
            })),
            totalPrice: totalPrice,
            userId: userData.id || 'guest',
            orderDate: new Date().toLocaleString('vi-VN', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }),
          };
      
          clearCart();
          navigate('/order-confirmation', { state: orderState });
        }
      } else {
        setError(result.message || 'Tạo order thất bại.');
      }
      
    } catch (error) {
      console.error('Error saving order or payment:', error.response ? error.response.data : error.message);
      setError('Lỗi khi tạo order hoặc thanh toán. Vui lòng thử lại. Chi tiết: ' + error.message);
    } finally {
      setLoading(false);
    }
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
                        const selectedSize = item.selectedSize || 'M';
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
                            </div>
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  )}
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>Vận chuyển: {shippingMode === 'delivery' ? '9,900 VND' : 'Miễn phí'}</span>
                  </div>
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
                      disabled={loading}
                    >
                      {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Xác Nhận Đặt Hàng'}
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