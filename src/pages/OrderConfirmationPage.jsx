import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

function OrderConfirmationPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const orderedItems = state?.orderedItems || [];
  const totalPrice = state?.totalPrice || 0;
  const userId = state?.userId || 'guest';
  const orderNumber = state?.orderNumber || `ORD-${Math.floor(Math.random() * 1000000)}`;
  const orderDate = state?.orderDate || new Date().toLocaleString('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }); // Lấy từ state hoặc dùng ngày hiện tại

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <Container className="my-5 py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="text-center mb-4">
                <h2 style={{ color: '#28a745' }}>Đơn Hàng Đã Được Xác Nhận!</h2>
                <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.</p>
                <hr />
              </div>
              <div className="mb-4">
                <h5>Thông Tin Đơn Hàng</h5>
                <p><strong>Mã đơn hàng:</strong> {orderNumber}</p>
                <p><strong>Ngày đặt hàng:</strong> {orderDate}</p>
                <p><strong>Mã người dùng:</strong> {userId}</p>
              </div>
              <h5>Chi Tiết Đơn Hàng</h5>
              {orderedItems.length === 0 ? (
                <p>Không có sản phẩm nào trong đơn hàng.</p>
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
                        <div>Kích thước: {item.size}</div>
                        <div>
                          Tổng: {(item.price * item.quantity).toLocaleString('vi-VN')} VND
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              <hr />
              <h5 className="text-end">
                Tổng Tiền: {totalPrice.toLocaleString('vi-VN')} VND
              </h5>
              <div className="text-center mt-4">
                <Button
                  variant="success"
                  onClick={handleContinueShopping}
                  style={{ fontWeight: '600', fontSize: '1.1rem' }}
                >
                  Tiếp Tục Mua Sắm
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderConfirmationPage;