import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { createProduct, getSizes } from '../../services/api';
const API_URL = import.meta.env.VITE_API_URL;

function CreateProductModal({ show, onHide, onSave }) {
  const [step, setStep] = useState(1);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    if (show && step === 2) {

      const fetchSizes = async () => {
        setLoading(true);
        const result = await getSizes();
        setLoading(false);
        if (result.success) {
          setSizes(result.sizes);
        } else {
          setError(result.message);
        }
      };
      fetchSizes();
    }
  }, [show, step]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewProduct({ ...newProduct, image: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleSizeChange = (e, sizeId) => {
    const { name, value } = e.target;
    const updatedSizes = selectedSizes.map((size) =>
      size.id === sizeId
        ? { ...size, [name]: name === 'quantity' || name === 'price' ? parseInt(value.replace(/^0+/, '') || '0', 10) : value }
        : size
    );
    setSelectedSizes(updatedSizes);
  };

  const handleNextStep = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.image) {
      setError('Vui lòng điền đầy đủ thông tin và tải ảnh lên.');
      return;
    }
    setStep(2);
    setError('');
  };

  const handleSizeSelection = (sizeId) => {
    const size = sizes.find((s) => s.id === sizeId);
    if (size && !selectedSizes.some((s) => s.id === sizeId)) {
      setSelectedSizes([...selectedSizes, { ...size, price: 0, quantity: 0 }]);
    }
  };

  const handleSave = async () => {
    if (step === 1) {
      handleNextStep();
      return;
    }
  
    if (selectedSizes.length === 0) {
      setError('Vui lòng chọn ít nhất một kích thước.');
      return;
    }
  
    setLoading(true);
    setError('');
  
    const sizesArray = selectedSizes.map(size => ({
      sizeId: size.id,
      price: typeof size.price === 'number' ? size.price : parseInt(String(size.price).replace(/^0+/, '') || '0', 10),
      quantity: typeof size.quantity === 'number' ? size.quantity : parseInt(String(size.quantity).replace(/^0+/, '') || '0', 10),
    }));
  
    const formData = new FormData();
    formData.append('Name', newProduct.name); // Viết hoa như API Postman
    formData.append('Description', newProduct.description);
    if (newProduct.image) {
      formData.append('Image', newProduct.image);
    }
    formData.append('Sizes', JSON.stringify(sizesArray)); // append vào form-data thay vì query string
  
    try {
      const result = await createProduct(formData, `${API_URL}/product`);
  
      if (result.success) {
        onSave(result.product);
        onHide();
        setStep(1);
        setNewProduct({
          name: '',
          description: '',
          image: null,
        });
        setSelectedSizes([]);
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{step === 1 ? 'Bước 1: Thông Tin Sản Phẩm' : 'Bước 2: Chọn Kích Thước'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          {step === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên sản phẩm"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mô Tả</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  placeholder="Nhập mô tả"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ảnh</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  accept="image/*"
                />
              </Form.Group>
            </>
          )}
          {step === 2 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Chọn Kích Thước</Form.Label>
                {sizes.map((size) => (
                  <Form.Check
                    key={size.id}
                    type="checkbox"
                    label={size.label}
                    checked={selectedSizes.some((s) => s.id === size.id)}
                    onChange={() => handleSizeSelection(size.id)}
                  />
                ))}
              </Form.Group>
              {selectedSizes.map((size) => (
                <div key={size.id} className="mb-3">
                  <h6>{size.label}</h6>
                  <Form.Group className="mb-2">
                    <Form.Label>Giá</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={size.price}
                      onChange={(e) => handleSizeChange(e, size.id)}
                      placeholder={`Nhập giá cho ${size.label}`}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Số Lượng</Form.Label>
                    <Form.Control
                      type="number"
                      name="quantity"
                      value={size.quantity}
                      onChange={(e) => handleSizeChange(e, size.id)}
                      placeholder={`Nhập số lượng cho ${size.label}`}
                    />
                  </Form.Group>
                </div>
              ))}
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
        {step === 1 ? (
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? 'Đang Tải...' : 'Tiếp Theo'}
          </Button>
        ) : (
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? 'Đang Tạo...' : 'Tạo'}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default CreateProductModal;