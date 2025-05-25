import React from 'react';
import { Modal, Button, Row, Col, ListGroup } from 'react-bootstrap';

function DetailOrderModal({ show, onHide, order }) {
  if (!order) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg" style={{ borderRadius: '10px' }}>
      <Modal.Header closeButton style={{ backgroundColor: '#007bff', color: '#fff', borderRadius: '10px 10px 0 0' }}>
        <Modal.Title style={{ fontWeight: 'bold' }}>Chi tiết đơn hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
        <Row>
          <Col md={6}>
            <h5 style={{ color: '#333', marginBottom: '15px' }}>Thông tin đơn hàng</h5>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '10px' }}>
                <strong>Số đơn hàng:</strong> {order.orderNumber}
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '10px' }}>
                <strong>Ngày đặt hàng:</strong> {order.orderDate}
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '10px' }}>
                <strong>Tổng giá:</strong> {order.totalPrice.toLocaleString('vi-VN')} VND
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '10px' }}>
                <strong>Phương thức thanh toán:</strong> {order.paymentMethod === 'online-payment' ? 'Thanh toán online' : 'Thanh toán khi nhận hàng'}
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '10px' }}>
                <strong>Trạng thái:</strong> {order.status}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={6}>
            <h5 style={{ color: '#333', marginBottom: '15px' }}>Thông tin vận chuyển</h5>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '10px' }}>
                <strong>Họ và tên:</strong> {order.shippingInfo.fullName}
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '10px' }}>
                <strong>Địa chỉ:</strong> {order.shippingInfo.address}
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '10px' }}>
                <strong>Số điện thoại:</strong> {order.shippingInfo.phone}
              </ListGroup.Item>
              <ListGroup.Item style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '10px' }}>
                <strong>Thành phố:</strong> {order.shippingInfo.city}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <h5 style={{ color: '#333', marginTop: '20px', marginBottom: '15px' }}>Sản phẩm</h5>
        <ListGroup variant="flush">
          {order.orderedItems.map((item, index) => (
            <ListGroup.Item
              key={index}
              style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '10px', padding: '15px' }}
            >
              <Row>
                <Col md={6}>
                  <strong>Tên sản phẩm:</strong> {item.name}<br />
                  <strong>Kích thước:</strong> {item.size}<br />
                  <strong>Số lượng:</strong> {item.quantity}
                </Col>
                <Col md={6} style={{ textAlign: 'right' }}>
                  <strong>Giá:</strong> {item.price.toLocaleString('vi-VN')} VND<br />
                  <strong>Tổng:</strong> {(item.price * item.quantity).toLocaleString('vi-VN')} VND
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#f8f9fa', borderRadius: '0 0 10px 10px' }}>
        <Button 
          variant="secondary" 
          onClick={onHide}
          style={{ backgroundColor: '#6c757d', borderColor: '#6c757d', padding: '8px 20px' }}
        >
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetailOrderModal;