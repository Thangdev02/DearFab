import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getProductById, updateProduct } from '../../services/api';

function EditProductModal({ show, onHide, productId, onSave }) {
  const [editedProduct, setEditedProduct] = useState({
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

  // Fetch product details when modal opens
  useEffect(() => {
    const fetchProduct = async () => {
      if (show && productId) {
        try {
          const product = await getProductById(productId);
          setEditedProduct({
            ...product,
            price: product.price || '',
            quantity: product.quantity || '',
            sizes: product.sizes || {
              S: { price: '', quantity: '' },
              M: { price: '', quantity: '' },
              L: { price: '', quantity: '' },
            },
          });
        } catch (error) {
          console.error('Error fetching product:', error);
          alert('Failed to load product details.');
        }
      }
    };
    fetchProduct();
  }, [show, productId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'isNew' || name === 'isFeatured') {
      setEditedProduct({ ...editedProduct, [name]: checked });
    } else if (name.startsWith('sizes.')) {
      const [size, field] = name.split('.').slice(1);
      setEditedProduct({
        ...editedProduct,
        sizes: {
          ...editedProduct.sizes,
          [size]: {
            ...editedProduct.sizes[size],
            [field]: field === 'quantity' ? parseInt(value) || 0 : value,
          },
        },
      });
    } else {
      setEditedProduct({ ...editedProduct, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...editedProduct,
        price: parseInt(editedProduct.price) || 0,
        quantity: parseInt(editedProduct.quantity) || 0,
        sizes: {
          S: { price: parseInt(editedProduct.sizes.S.price) || 0, quantity: parseInt(editedProduct.sizes.S.quantity) || 0 },
          M: { price: parseInt(editedProduct.sizes.M.price) || 0, quantity: parseInt(editedProduct.sizes.M.quantity) || 0 },
          L: { price: parseInt(editedProduct.sizes.L.price) || 0, quantity: parseInt(editedProduct.sizes.L.quantity) || 0 },
        },
      };

      const updatedProduct = await updateProduct(productId, payload);
      onSave(updatedProduct); // Pass the updated product back
      onHide();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh Sửa Tranh</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giá (Base)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              placeholder="Enter base price"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mô Tả</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
              placeholder="Enter description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Địa Chỉ Hình Ảnh</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={editedProduct.image}
              onChange={handleInputChange}
              placeholder="Enter image URL"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Loại</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={editedProduct.category}
              onChange={handleInputChange}
              placeholder="Enter category"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Số Lượng (Base)</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={editedProduct.quantity}
              onChange={handleInputChange}
              placeholder="Enter base quantity"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="isNew"
              label="Sản Phẩm Mới"
              checked={editedProduct.isNew}
              onChange={handleInputChange}
            />
            <Form.Check
              type="checkbox"
              name="isFeatured"
              label="Sản Phẩm Nổi Bật"
              checked={editedProduct.isFeatured}
              onChange={handleInputChange}
            />
          </Form.Group>
          {/* Size Options */}
          {['S', 'M', 'L'].map((size) => (
            <div key={size} className="mb-3">
              <h6>{size}Kích Thước</h6>
              <Form.Group className="mb-2">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="number"
                  name={`sizes.${size}.price`}
                  value={editedProduct.sizes[size].price}
                  onChange={handleInputChange}
                  placeholder={`Enter ${size} price`}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Số Lượng</Form.Label>
                <Form.Control
                  type="number"
                  name={`sizes.${size}.quantity`}
                  value={editedProduct.sizes[size].quantity}
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
        <Button variant="primary" onClick={handleSave}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProductModal;