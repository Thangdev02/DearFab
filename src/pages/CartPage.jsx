// CartPage.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Image, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CartContext } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa'; // Import FaTrash
function CartPage() {
  const { cartItems, setCartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [shippingMode, setShippingMode] = useState('storePickup');

  useEffect(() => {
    Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 }); // Lưu trong 7 ngày
  }, [cartItems]);

  // Khôi phục giỏ hàng từ cookies khi trang được tải
  useEffect(() => {
    const savedCart = Cookies.get('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [setCartItems]);

  const basePrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = shippingMode === 'storePickup' ? 0 : 9900;
  const totalPrice = basePrice + shippingCost;

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleCheckout = () => {
    navigate('/order', {
      state: { orderedItems: cartItems, totalPrice }
    });
    clearCart();
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <Container style={{ padding: '8% 0', minHeight: '100vh' }}>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1 style={{ fontWeight: '700', fontSize: '2.5rem', color: '#333' }}>
              Giỏ Hàng Của Bạn
            </h1>
            <Button
              variant="link"
              onClick={handleContinueShopping}
              style={{ color: '#006400', fontWeight: '500', textDecoration: 'underline' }}
            >
              Tiếp Tục Mua Sắm
            </Button>
          </div>
        </Col>
      </Row>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem', color: '#666' }}>
          Giỏ hàng đang trống
        </p>
      ) : (
        <Row>
          <Col md={8}>
            <Row className="mb-3">
              <Col md={4}>
                <strong style={{ color: '#666' }}>Sản Phẩm</strong>
              </Col>
              <Col md={3}>
                <strong style={{ color: '#666' }}>Kích thước & Giá</strong>
              </Col>
              <Col md={2}>
                <strong style={{ color: '#666' }}>Số Lượng</strong>
              </Col>
              <Col md={3} className="text-end">
                <strong style={{ color: '#666' }}>Tổng</strong>
              </Col>
            </Row>

            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item
                  key={`${item.id}-${item.selectedSize}`} // Đảm bảo key duy nhất dựa trên id và size
                  className="d-flex align-items-center"
                  style={{ border: 'none', padding: '15px 0', borderBottom: '1px solid #eee' }}
                >
                  <Col md={4} className="d-flex align-items-center">
                    <Image
                      src={item.image || 'https://via.placeholder.com/50'}
                      alt={item.name}
                      style={{ width: 60, height: 60, objectFit: 'cover', marginRight: '15px' }}
                    />
                    <div onClick={() => handleProductClick(item.id)} style={{ cursor: 'pointer' }}>
                      <strong>{item.name}</strong>
                      <p style={{ fontSize: '1rem', color: '#333', margin: 0 }}>
                      Size: {item.selectedSize || 'N/A'}<br />
                    </p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <p style={{ fontSize: '1rem', color: '#333', margin: 0 }}>
                      {item.price.toLocaleString('vi-VN')} VND
                    </p>
                    {item.extras && (
                      <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
                        + {item.extrasPrice?.toLocaleString('vi-VN')} VND ({item.extras})
                      </p>
                    )}
                  </Col>
                  <Col md={2} className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      style={{ borderRadius: '50%', width: '30px', height: '30px', padding: 0 }}
                    >
                      -
                    </Button>
                    <span style={{ margin: '0 10px', fontSize: '1rem' }}>{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      style={{ borderRadius: '50%', width: '30px', height: '30px', padding: 0 }}
                    >
                      +
                    </Button>
                  </Col>
                  <Col md={3} className="text-end">
                    <p style={{ fontSize: '1rem', color: '#333', margin: 0 }}>
                      {(item.price * item.quantity).toLocaleString('vi-VN')} VND
                    </p>
                    <Button
                      variant="link"
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      style={{ color: '#ff0000', textDecoration: 'none', fontSize: '1.2rem' }}
                    >
                      <FaTrash/>
                    </Button>
                  </Col>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col md={4}>
            <div
              style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              <h5 style={{ fontWeight: '700', marginBottom: '15px' }}>
                Chọn phương thức vận chuyển:
              </h5>
              <Form.Check
                type="radio"
                label="Nhận tại cửa hàng (miễn phí trong 20 phút)"
                name="shippingMode"
                value="storePickup"
                checked={shippingMode === 'storePickup'}
                onChange={() => setShippingMode('storePickup')}
                style={{ marginBottom: '10px' }}
              />
                <Form.Check
                type="radio"
                label="Giao Hàng"
                name="shippingMode"
                value="storePickup"
                checked={shippingMode === 'storePickup'}
                onChange={() => setShippingMode('storePickup')}
                style={{ marginBottom: '10px' }}
              />
              <hr />
              <div className="d-flex justify-content-between">
                <span>Tổng phụ TTC:</span>
                <span>{basePrice.toLocaleString('vi-VN')} VND</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Vận chuyển:</span>
                <span>{shippingCost === 0 ? 'Miễn phí' : `${shippingCost.toLocaleString('vi-VN')} VND`}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <strong>Tổng cộng:</strong>
                <strong>{totalPrice.toLocaleString('vi-VN')} VND</strong>
              </div>
              <Button
                variant="success"
                className="w-100 mt-3"
                onClick={handleCheckout}
                style={{ fontWeight: '600', fontSize: '1.1rem' }}
              >
                Thanh Toán {totalPrice.toLocaleString('vi-VN')} VND
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default CartPage;