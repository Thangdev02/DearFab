import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getOrderById, updateOrder } from '../../services/orderApi';

function EditOrderModal({ show, onHide, orderId, onSave }) {
  const [order, setOrder] = useState({
    orderedItems: [],
    totalPrice: 0,
    shippingInfo: {
      fullName: '',
      address: '',
      phone: '',
      city: '',
    },
    paymentMethod: 'online-payment',
    orderDate: '',
    orderNumber: '',
    status: 'pending',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (show && orderId) {
        setLoading(true);
        try {
          const { success, order } = await getOrderById(orderId);
          if (success) {
            setOrder(order || {
              orderedItems: [],
              totalPrice: 0,
              shippingInfo: { fullName: '', address: '', phone: '', city: '' },
              paymentMethod: 'online-payment',
              orderDate: new Date().toLocaleString('vi-VN', { hour12: false }),
              orderNumber: `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
              status: 'pending',
            });
          }
        } catch (error) {
          alert('Lỗi khi tải đơn hàng.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrder();
  }, [show, orderId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('shippingInfo.')) {
      const field = name.split('.')[1];
      setOrder({
        ...order,
        shippingInfo: { ...order.shippingInfo, [field]: value },
      });
    } else {
      setOrder({ ...order, [name]: value });
    }
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setOrder((prev) => {
      const updatedItems = [...prev.orderedItems];
      updatedItems[index] = { ...updatedItems[index], [name]: value };
      return {
        ...prev,
        orderedItems: updatedItems,
        totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      };
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { success, order: updatedOrder, message } = await updateOrder(orderId, order);
      if (success) {
        onSave(updatedOrder);
        onHide();
      } else {
        alert(message);
      }
    } catch (error) {
      alert('Lỗi khi cập nhật đơn hàng.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Sửa đơn hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Số đơn hàng</Form.Label>
            <Form.Control value={order.orderNumber} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngày đặt hàng</Form.Label>
            <Form.Control value={order.orderDate} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              name="shippingInfo.fullName"
              value={order.shippingInfo.fullName}
              onChange={handleInputChange}
              placeholder="Nhập họ và tên"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              name="shippingInfo.address"
              value={order.shippingInfo.address}
              onChange={handleInputChange}
              placeholder="Nhập địa chỉ"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              name="shippingInfo.phone"
              value={order.shippingInfo.phone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Thành phố</Form.Label>
            <Form.Control
              name="shippingInfo.city"
              value={order.shippingInfo.city}
              onChange={handleInputChange}
              placeholder="Nhập thành phố"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phương thức thanh toán</Form.Label>
            <Form.Select name="paymentMethod" value={order.paymentMethod} onChange={handleInputChange}>
              <option value="online-payment">Thanh toán online</option>
              <option value="cash-on-delivery">Thanh toán khi nhận hàng</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select name="status" value={order.status} onChange={handleInputChange}>
              <option value="pending">Chờ xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="shipped">Đã giao</option>
              <option value="delivered">Đã giao hàng</option>
              <option value="cancelled">Đã hủy</option>
            </Form.Select>
          </Form.Group>
          <h5>Sản phẩm</h5>
          {order.orderedItems.map((item, index) => (
            <div key={item.id} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Nhập tên sản phẩm"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Nhập giá"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  min={1}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Kích thước</Form.Label>
                <Form.Select name="size" value={item.size} onChange={(e) => handleItemChange(index, e)}>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </Form.Select>
              </Form.Group>
            </div>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Đóng</Button>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? 'Đang lưu...' : 'Lưu'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditOrderModal;