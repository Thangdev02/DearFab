import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Image } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { getOrders } from '../services/orderApi';

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {};
  const userId = userData.id || 'guest';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders(); // Trả về { success: true, orders: [...] }
        if (response.success) {
          const userOrders = response.orders.filter(order => order.userId === userId); // Lọc trên response.orders
          setOrders(userOrders);
        } else {
          throw new Error(response.message || 'Không thể lấy danh sách đơn hàng');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  if (loading) {
    return <Container><h2>Đang tải...</h2></Container>;
  }

  return (
    <Container className="py-5 my-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h2 className="mb-4" style={{ color: '#28a745' }}>
            Lịch Sử Mua Hàng
          </h2>
          {orders.length === 0 ? (
            <p>Bạn chưa có đơn hàng nào.</p>
          ) : (
            orders.map(order => (
              <Card key={order.id} className="shadow-sm border-0 mb-4">
                <Card.Body>
                  <h5>Đơn Hàng #{order.orderNumber}</h5>
                  <p><strong>Ngày đặt hàng:</strong> {order.orderDate}</p>
                  <p><strong>Trạng thái:</strong> {order.status}</p>
                  <ListGroup variant="flush" className="mb-4">
                    {order.orderedItems.map(item => (
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
                  <hr />
                  <h5 className="text-end">
                    Tổng Tiền: {order.totalPrice.toLocaleString('vi-VN')} VND
                  </h5>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default OrderHistoryPage;