import React, { useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

function CheckoutPage() {
  const { cart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container className="reveal">
      <h1>Thanh toán</h1>
      <Row>
        <Col md={8}>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control type="text" placeholder="Nhập họ và tên" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control type="text" placeholder="Nhập địa chỉ giao hàng" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control type="text" placeholder="Nhập số điện thoại" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPayment">
              <Form.Label>Phương thức thanh toán</Form.Label>
              <Form.Select>
                <option>Thanh toán khi nhận hàng (COD)</option>
                <option>Chuyển khoản ngân hàng</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">Xác nhận đơn hàng</Button>
          </Form>
        </Col>
        <Col md={4}>
          <h4>Tóm tắt đơn hàng</h4>
          <p>Tổng cộng: {total.toLocaleString('vi-VN')} VND</p>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutPage;