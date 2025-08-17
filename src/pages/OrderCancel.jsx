import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

function OrderCancle() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Lấy dữ liệu từ state, dùng giá trị mặc định nếu không có
  const orderedItems = state?.orderedItems || [];
  const totalPrice = state?.totalPrice || 0;
  const userId = state?.userId || 'guest';
  const orderNumber = state?.orderId || `ORD-${Math.floor(Math.random() * 1000000)}`; // Sử dụng orderId hoặc tạo ngẫu nhiên
  const orderDate = state?.orderDate || new Date().toLocaleString('vi-VN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <Container className="my-5 py-5" style={{maxHeight: '100vh'}}>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="text-center mb-4">
                <h2 style={{ color: 'red' }}>Đơn Hàng Chưa Được Xác Nhận!</h2>
                <p>DearFab chân thành xin lỗi vì đã có sự cố xảy ra, vui lòng thử lại.</p>
                <hr />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>

             <img style={{width: '30%'}} src='https://www.pngkey.com/png/full/67-676797_mb-image-png-red-x-in-a-box.png'/>
             </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderCancle;