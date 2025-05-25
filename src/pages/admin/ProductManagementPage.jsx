import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { deleteProduct, getProducts } from '../../services/api';
import EditProductModal from './EditProductModal';
import CreateProductModal from './CreateProductModal';

function ProductManagementPage() {
    const [products, setProducts] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    // Fetch products on mount
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const data = await getProducts();
          setProducts(data || []);
        } catch (err) {
          console.error('Error fetching products:', err);
        }
      };
      fetchProducts();
    }, []);
  
    // Add new product
    const handleAddProduct = (newProduct) => {
      // Check if product already exists to prevent duplicates
      if (!products.find((p) => p.id === newProduct.id)) {
        setProducts([...products, newProduct]);
      }
    };
  
    // Edit product
    const handleEditProduct = (updatedProduct) => {
      setProducts(
        products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    };
  
    // Delete product
    const handleDeleteProduct = async (id) => {
      if (window.confirm('Are you sure you want to delete this product?')) {
        try {
          await deleteProduct(id);
          setProducts(products.filter((p) => p.id !== id));
        } catch (error) {
          console.error('Error deleting product:', error);
          alert('Failed to delete product. Please try again.');
        }
      }
    };
  
    // Show detail modal when row is clicked
    const handleRowClick = (product) => {
      setSelectedProduct(product);
      setShowDetailModal(true);
    };
  
    return (
      <Container className="mt-4">
        <Row className="mb-3">
          <Col>
            <h2>Quản Lý Tranh</h2>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
               Thêm Tranh
            </Button>
          </Col>
        </Row>
  
        {/* Product Table */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Giá (Base)</th>
              <th>Loại</th>
              <th>Số Lượng</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                onClick={() => handleRowClick(product)}
                style={{ cursor: 'pointer' }}
              >
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price?.toLocaleString('vi-VN')} VND</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                      setShowEditModal(true);
                    }}
                  >
                     Chỉnh Sửa
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProduct(product.id);
                    }}
                  >
                    Xoá
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
  
        {/* Create Product Modal */}
        <CreateProductModal
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          onSave={handleAddProduct}
        />
  
        {/* Edit Product Modal */}
        <EditProductModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          productId={selectedProduct?.id}
          onSave={handleEditProduct}
        />
  
        {/* Detail Modal */}
        <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Chi Tiết Sản Phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <div>
                <h4>{selectedProduct.name}</h4>
                <p><strong>Mô Tả:</strong> {selectedProduct.description}</p>
                <p><strong>Giá:</strong> {selectedProduct.price?.toLocaleString('vi-VN')} VND</p>
                <p><strong>Loại:</strong> {selectedProduct.category}</p>
                <p><strong>Số Lượng:</strong> {selectedProduct.quantity}</p>
                <p><strong>Sản Phẩm Mới:</strong> {selectedProduct.isNew ? 'Yes' : 'No'}</p>
                <p><strong>Sản Phẩm Nổi Bật:</strong> {selectedProduct.isFeatured ? 'Yes' : 'No'}</p>
                <p><strong>Hình Ảnh:</strong> <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} /></p>
                <h5>Kích Thước:</h5>
                <ul>
                  {Object.entries(selectedProduct.sizes).map(([size, details]) => (
                    <li key={size}>
                      {size}: Giá - {details.price?.toLocaleString('vi-VN')} VND, Số Lượng - {details.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
  
  export default ProductManagementPage;