import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createProduct } from '../../services/api';

function CreateProductModal({ show, onHide, onSave }) {
    const [newProduct, setNewProduct] = useState({
      name: '',
      price: '',
      description: '',
      image: '',
      category: '',
      quantity: '',
      isNew: false,
      isFeatured: false,
      sizes: {
        S: { price: '', quantity: '' },
        M: { price: '', quantity: '' },
        L: { price: '', quantity: '' },
      },
    });
    const [loading, setLoading] = useState(false); // Add loading state
  
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      if (name === 'isNew' || name === 'isFeatured') {
        setNewProduct({ ...newProduct, [name]: checked });
      } else if (name.startsWith('sizes.')) {
        const [size, field] = name.split('.').slice(1);
        setNewProduct({
          ...newProduct,
          sizes: {
            ...newProduct.sizes,
            [size]: {
              ...newProduct.sizes[size],
              [field]: field === 'quantity' ? parseInt(value) || 0 : value,
            },
          },
        });
      } else {
        setNewProduct({ ...newProduct, [name]: value });
      }
    };
  
    const handleSave = async () => {
      setLoading(true); // Disable button during request
      try {
        const payload = {
          ...newProduct,
          price: parseInt(newProduct.price) || 0,
          quantity: parseInt(newProduct.quantity) || 0,
          sizes: {
            S: { price: parseInt(newProduct.sizes.S.price) || 0, quantity: parseInt(newProduct.sizes.S.quantity) || 0 },
            M: { price: parseInt(newProduct.sizes.M.price) || 0, quantity: parseInt(newProduct.sizes.M.quantity) || 0 },
            L: { price: parseInt(newProduct.sizes.L.price) || 0, quantity: parseInt(newProduct.sizes.L.quantity) || 0 },
          },
        };
  
        const createdProduct = await createProduct(payload);
        onSave(createdProduct); // Pass the created product back
        onHide();
      } catch (error) {
        console.error('Error creating product:', error);
        alert('Failed to create product. Please try again.');
      } finally {
        setLoading(false); // Re-enable button
      }
    };
  
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo Tranh Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giá (Base)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                placeholder="Enter base price"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô Tả</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ hình ảnh</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Loại</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                placeholder="Enter category"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số Lượng (Base)</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleInputChange}
                placeholder="Enter base quantity"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isNew"
                label="Sản Phẩm Mới"
                checked={newProduct.isNew}
                onChange={handleInputChange}
              />
              <Form.Check
                type="checkbox"
                name="isFeatured"
                label="Nổi bật"
                checked={newProduct.isFeatured}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Size Options */}
            {['S', 'M', 'L'].map((size) => (
              <div key={size} className="mb-3">
                <h6>{size} Kích Thước</h6>
                <Form.Group className="mb-2">
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    type="number"
                    name={`sizes.${size}.price`}
                    value={newProduct.sizes[size].price}
                    onChange={handleInputChange}
                    placeholder={`Enter ${size} price`}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Số Lượng</Form.Label>
                  <Form.Control
                    type="number"
                    name={`sizes.${size}.quantity`}
                    value={newProduct.sizes[size].quantity}
                    onChange={handleInputChange}
                    placeholder={`Enter ${size} quantity`}
                  />
                </Form.Group>
              </div>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? 'Đang Tạo...' : 'Tạo'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export default CreateProductModal;