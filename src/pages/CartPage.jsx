import React, { useContext } from 'react';
import { Offcanvas, Button, ListGroup, Image, Form } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartSidebar({ show, handleClose }) {
  const { cartItems = [], removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleProductClick = (id) => {
    handleClose();
    navigate(`/product/${id}`);
  };

  const handleCheckout = () => {
    // Pass cart items and total price to OrderConfirmationPage
    navigate('/order', {
      state: { orderedItems: cartItems, totalPrice }
    });
    // Clear the cart after successful checkout (optional, depends on your flow)
    clearCart();
    handleClose();
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: '500px' }}
      backdrop={true}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: '700', fontSize: '1.5rem' }}>
          Giỏ hàng của bạn
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(12px)',
          color: 'white',
          height: '100%',
          paddingTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {cartItems.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>
            Giỏ hàng đang trống
          </p>
        ) : (
          <ListGroup variant="flush" style={{ flexGrow: 1, overflowY: 'auto' }}>
            {cartItems.map(item => (
              <ListGroup.Item
                key={item.id}
                className="d-flex justify-content-between align-items-center"
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '1rem 0',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{ gap: '1rem' }}
                  onClick={() => handleProductClick(item.id)}
                >
                  <Image
                    src={item.image || 'https://via.placeholder.com/50'}
                    rounded
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                    alt={item.name}
                  />
                  <div>
                    <strong>{item.name}</strong>
                    <br />
                    <small>Giá: {item.price.toLocaleString('vi-VN')} VND</small>
                  </div>
                </div>
                <div className="text-end">
                  <Form.Control
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    style={{ width: '70px', display: 'inline-block' }}
                  />
                  <div className="mt-1">
                    <span style={{ fontSize: '0.9rem' }}>
                      Tổng: {(item.price * item.quantity).toLocaleString('vi-VN')} VND
                    </span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="ms-2"
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <hr style={{ borderColor: 'rgba(255,255,255,0.2)', margin: '1rem 0' }} />
        <h5 style={{ fontWeight: '700' }}>
          Tổng tiền: {totalPrice.toLocaleString('vi-VN')} VND
        </h5>
        <Button
          variant="success"
          className="w-100 mt-3"
          onClick={handleCheckout}
          style={{ fontWeight: '600', fontSize: '1.1rem' }}
        >
          Thanh toán
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CartSidebar;