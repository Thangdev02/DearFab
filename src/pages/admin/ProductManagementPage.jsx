import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Image, Pagination } from 'react-bootstrap';
import { deleteProduct, getProducts } from '../../services/api';
import EditProductModal from './EditProductModal';
import CreateProductModal from './CreateProductModal';
import axios from 'axios';

function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const [loadingSizes, setLoadingSizes] = useState(false);
  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

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

  // Tính toán sản phẩm hiển thị trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Tính tổng số trang
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddProduct = (newProduct) => {
    if (!products.find((p) => p.id === newProduct.id)) {
      setProducts([...products, newProduct]);
    }
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
        // Nếu trang hiện tại không còn sản phẩm, chuyển về trang trước
        if (currentProducts.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  const handleViewSizes = async (id) => {
    setLoadingSizes(true);
    try {
      const res = await axios.get(`https://api.dearfab.com/api/v1/product/${id}`);
      setProductDetail(res.data?.data || null);
      setShowSizeModal(true);
    } catch (error) {
      console.error('Error fetching product detail:', error);
      alert('Không thể lấy thông tin sản phẩm.');
    } finally {
      setLoadingSizes(false);
    }
  };

  const formatVND = (n) =>
    typeof n === 'number' ? `${n.toLocaleString('vi-VN')} VND` : '—';

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h2>Quản Lý Sản Phẩm</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            Thêm Sản Phẩm
          </Button>
        </Col>
      </Row>

      {/* Bảng sản phẩm */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá (Base)</th>
            <th>Số Lượng</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id} style={{ cursor: 'pointer' }}>
              <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.id}</td>
              <td>{product.name}</td>
              <td>{formatVND(product.price)}</td>
              <td>{product.quantity}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleViewSizes(product.id)}
                >
                  Xem Chi Tiết
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowEditModal(true);
                  }}
                >
                  Chỉnh Sửa
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Xoá
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Phân trang */}
      <Pagination className="justify-content-center mt-3">
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>

      {/* Modal tạo */}
      <CreateProductModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSave={handleAddProduct}
      />

      {/* Modal sửa */}
      <EditProductModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        productId={selectedProduct?.id}
        onSave={handleEditProduct}
      />

      {/* Modal xem chi tiết (ảnh + mô tả + bảng size) */}
      <Modal show={showSizeModal} onHide={() => setShowSizeModal(false)} centered size="lg">
        <Modal.Header
          closeButton
          style={{
            background: 'linear-gradient(90deg,rgb(3, 83, 47),rgb(11, 172, 100))',
            color: '#fff',
            borderBottom: 'none',
            padding: '16px 20px',
          }}
        >
          <Modal.Title style={{ fontWeight: 700, fontSize: 18 }}>
            Thông Tin Sản Phẩm
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: 20 }}>
          {loadingSizes ? (
            <div style={{ textAlign: 'center', padding: 20 }}>
              <div className="spinner-border" role="status" />
              <p style={{ marginTop: 8 }}>Đang tải...</p>
            </div>
          ) : productDetail ? (
            <>
              <div
                style={{
                  display: 'flex',
                  gap: 20,
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  backgroundColor: '#fff',
                  border: '1px solid #e9ecef',
                  borderRadius: 12,
                  padding: 16,
                  boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                  marginBottom: 16,
                }}
              >
                <div style={{ flex: '0 0 260px', maxWidth: 320 }}>
                  {productDetail.image ? (
                    <Image
                      src={productDetail.image}
                      alt={productDetail.name}
                      rounded
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        border: '1px solid #f1f3f5',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 260,
                        height: 200,
                        backgroundColor: '#f1f3f5',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#6c757d',
                        border: '1px dashed #dee2e6',
                      }}
                    >
                      Không có ảnh
                    </div>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 260 }}>
                  <h4 style={{ marginBottom: 6 }}>{productDetail.name}</h4>
                  <p style={{ margin: 0, color: '#495057' }}>{productDetail.description}</p>
                  {Array.isArray(productDetail.productSizes) && (
                    <p style={{ marginTop: 10, color: '#6c757d', fontSize: 14 }}>
                      Có {productDetail.productSizes.length} tuỳ chọn kích thước
                    </p>
                  )}
                </div>
              </div>

              <div
                style={{
                  border: '1px solid #e9ecef',
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#343a40',
                    color: '#fff',
                    padding: '10px 14px',
                    fontWeight: 600,
                  }}
                >
                  Kích thước & Giá
                </div>

                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'separate',
                    borderSpacing: 0,
                  }}
                >
                  <thead>
                    <tr>
                      <th style={thStyle}>Kích Thước</th>
                      <th style={thStyle}>Giá</th>
                      <th style={thStyle}>Số Lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productDetail.productSizes && productDetail.productSizes.length > 0 ? (
                      productDetail.productSizes.map((s, idx) => (
                        <tr
                          key={s.id}
                          style={{
                            backgroundColor: idx % 2 === 0 ? '#f8f9fa' : '#ffffff',
                          }}
                        >
                          <td style={tdStyle}>{s.size}</td>
                          <td style={tdStyle}>{formatVND(s.price)}</td>
                          <td style={tdStyle}>{s.quantity}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td style={tdStyle} colSpan={3}>
                          Không có kích thước nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p style={{ textAlign: 'center', color: '#6c757d' }}>
              Không tìm thấy thông tin sản phẩm.
            </p>
          )}
        </Modal.Body>

        <Modal.Footer style={{ borderTop: 'none', padding: '12px 20px' }}>
          <Button variant="secondary" onClick={() => setShowSizeModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

const thStyle = {
  padding: '12px 10px',
  textAlign: 'center',
  borderBottom: '1px solid #e9ecef',
  fontWeight: 600,
  color: '#212529',
  backgroundColor: '#f1f3f5',
};

const tdStyle = {
  padding: '12px 10px',
  textAlign: 'center',
  borderBottom: '1px solid #e9ecef',
  color: '#212529',
};

export default ProductManagementPage;