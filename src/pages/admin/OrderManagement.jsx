import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { deleteOrder, getOrders } from '../../services/orderApi';
import CreateOrderModal from './CreateOrderModal';
import EditOrderModal from './EditOrderModal';
import DetailOrderModal from './OrderDetailModa';

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchOrders = async () => {
        const { success, orders } = await getOrders();
        if (success) setOrders(orders || []);
        setLoading(false);
      };
      fetchOrders();
    }, []);
  
    const handleAddOrder = (newOrder) => {
      setOrders([...orders, newOrder]);
    };
  
    const handleEditOrder = (updatedOrder) => {
      setOrders(orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
    };
  
    const handleDeleteOrder = async (id) => {
      if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
        const { success, message } = await deleteOrder(id);
        if (success) {
          setOrders(orders.filter((o) => o.id !== id));
        } else {
          alert(message);
        }
      }
    };
  
    const handleRowClick = (order) => {
      setSelectedOrder(order);
      setShowDetailModal(true); // Show detail modal on row click
    };
  
    if (loading) return <Container><h2>Đang tải...</h2></Container>;
  
    return (
      <Container className="mt-4">
        <Row className="mb-3">
          <Col>
            <h2 style={{ fontWeight: 'bold', color: '#333' }}>Quản lý đơn hàng</h2>
          </Col>
          <Col className="text-end">
            <Button 
              variant="primary" 
              onClick={() => setShowCreateModal(true)}
              style={{ backgroundColor: '#007bff', borderColor: '#007bff', padding: '8px 20px', fontWeight: '500' }}
            >
              Thêm đơn hàng
            </Button>
          </Col>
        </Row>
  
        <Table striped bordered hover responsive className="shadow-sm" style={{ backgroundColor: '#fff', borderRadius: '8px' }}>
          <thead style={{ backgroundColor: '#007bff', color: '#fff' }}>
            <tr>
              <th>ID</th>
              <th>Số đơn hàng</th>
              <th>Tên khách hàng</th>
              <th>Tổng giá</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr 
                key={order.id} 
                onClick={() => handleRowClick(order)} 
                style={{ cursor: 'pointer', transition: 'background-color 0.3s', backgroundColor: '#f8f9fa' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e9ecef')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
              >
                <td style={{ padding: '12px' }}>{order.id}</td>
                <td style={{ padding: '12px' }}>{order.orderNumber}</td>
                <td style={{ padding: '12px' }}>{order.shippingInfo.fullName}</td>
                <td style={{ padding: '12px' }}>{order.totalPrice.toLocaleString('vi-VN')} VND</td>
                <td style={{ padding: '12px' }}>{order.status}</td>
                <td style={{ padding: '12px' }}>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOrder(order);
                      setShowEditModal(true);
                    }}
                    style={{ backgroundColor: '#ffc107', borderColor: '#ffc107', padding: '6px 12px' }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteOrder(order.id);
                    }}
                    style={{ backgroundColor: '#dc3545', borderColor: '#dc3545', padding: '6px 12px' }}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  
        <CreateOrderModal
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          onSave={handleAddOrder}
        />
  
        <EditOrderModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          orderId={selectedOrder?.id}
          onSave={handleEditOrder}
        />
  
        <DetailOrderModal
          show={showDetailModal}
          onHide={() => setShowDetailModal(false)}
          order={selectedOrder}
        />
      </Container>
    );
  }
  
  export default OrderManagement;