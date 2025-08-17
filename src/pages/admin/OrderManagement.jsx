import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import { getOrders, getOrderById } from "../../services/orderApi";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const { success, orders } = await getOrders();
      if (success) setOrders(orders || []);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleViewDetail = async (id) => {
    const { success, order } = await getOrderById(id);
    if (success) {
      setSelectedOrder(order);
      setShowDetailModal(true);
    }
  };

  if (loading) return <Container><h2>Đang tải...</h2></Container>;

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h2 style={{ fontWeight: "bold", color: "#333" }}>Quản lý đơn hàng</h2>
        </Col>
      </Row>

      <Table striped bordered hover responsive className="shadow-sm" style={{ backgroundColor: "#fff", borderRadius: "8px" }}>
        <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
          <tr>
            <th>ID</th>
            <th>Tổng giá</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td style={{ padding: "12px" }}>{order.id}</td>
                <td style={{ padding: "12px" }}>{order.totalPrice?.toLocaleString("vi-VN")} VND</td>
                <td style={{ padding: "12px" }}>{order.status}</td>
                <td style={{ padding: "12px" }}>
                  <Button 
                    variant="info" 
                    size="sm" 
                    onClick={() => handleViewDetail(order.id)}
                  >
                    Xem chi tiết
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                Không có đơn hàng nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal chi tiết đơn hàng */}
      <Modal 
        show={showDetailModal} 
        onHide={() => setShowDetailModal(false)} 
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder ? (
            <div>
              <p><strong>ID:</strong> {selectedOrder.id}</p>
              <p><strong>Số đơn hàng:</strong> {selectedOrder.orderNumber}</p>
              <p><strong>Tên khách hàng:</strong> {selectedOrder.shippingInfo?.fullName}</p>
              <p><strong>Email:</strong> {selectedOrder.shippingInfo?.email}</p>
              <p><strong>Số điện thoại:</strong> {selectedOrder.shippingInfo?.phone}</p>
              <p><strong>Địa chỉ:</strong> {selectedOrder.shippingInfo?.address}</p>
              <p><strong>Tổng giá:</strong> {selectedOrder.totalPrice?.toLocaleString("vi-VN")} VND</p>
              <p><strong>Trạng thái:</strong> {selectedOrder.status}</p>
              <hr />
              <h5>Sản phẩm trong đơn:</h5>
              <ul>
                {selectedOrder.items?.map((item) => (
                  <li key={item.id}>
                    {item.productName} - SL: {item.quantity} - Giá: {item.price?.toLocaleString("vi-VN")} VND
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Không có dữ liệu đơn hàng.</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default OrderManagement;
