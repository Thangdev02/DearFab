import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Row, Col, Card, Button, Form, Spinner, Pagination, Container, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { getProducts } from '../services/api';
import TopRatedProducts from '../components/products/TopRatedProduct';
import ScrollReveal from 'scrollreveal';
import ProductListBanner from '../components/products/Product\bListBanner';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, cartItems } = useContext(CartContext);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const productsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const timeoutPromise = new Promise((resolve, reject) =>
          setTimeout(() => reject(new Error('Yêu cầu quá thời gian.')), 10000)
        );
        const products = await getProducts();
        console.log("Fetched products:", products);
        setProducts(products || []);
        setFilteredProducts(products || []);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải sản phẩm. Vui lòng thử lại sau: ' + err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const applyFilters = useCallback(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }

    if (tagFilter) {
      result = result.filter(product => product.tags && product.tags.includes(tagFilter));
    }

    if (priceFilter) {
      if (priceFilter === 'low') {
        result = result.filter(product => (product.price || 0) < 1000000);
      } else if (priceFilter === 'medium') {
        result = result.filter(product => (product.price || 0) >= 1000000 && (product.price || 0) <= 3000000);
      } else if (priceFilter === 'high') {
        result = result.filter(product => (product.price || 0) > 3000000);
      }
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [categoryFilter, tagFilter, priceFilter, searchTerm, products]);

  useEffect(() => {
    const debouncedApplyFilters = debounce(applyFilters, 300);
    debouncedApplyFilters();
  }, [applyFilters]);

  useEffect(() => {
    ScrollReveal().reveal('.product-card', {
      origin: 'bottom',
      distance: '20px',
      duration: 700,
      easing: 'ease-in-out',
      interval: 150,
      reset: false,
    });

    ScrollReveal().reveal('.top-rated-section', {
      origin: 'bottom',
      distance: '30px',
      duration: 900,
      easing: 'ease-in-out',
      reset: false,
    });
  }, []);

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    addToCart(product);
    setToastMessage(`${product.name || 'Sản phẩm'} đã được thêm vào giỏ hàng!`);
    setShowToast(true);
    console.log('Toast should show. showToast:', showToast, 'Message:', toastMessage);
  };

  const handleBuyNow = (product) => {
    console.log('Buying now:', product);
    if (!product || !product.id) {
      console.error('Sản phẩm không hợp lệ:', product);
      return;
    }
    // Chuẩn bị sản phẩm với thông tin cần thiết
    const productWithDetails = {
      ...product,
      quantity: 1,
      selectedSize: 'M',
      price: product.sizes?.['M']?.price || product.price, // Lấy giá từ kích thước M hoặc giá mặc định
    };
    // Truyền trực tiếp sản phẩm vào state thay vì phụ thuộc vào cartItems
    const orderState = {
      orderedItems: [productWithDetails], // Truyền mảng chứa sản phẩm vừa chọn
      totalPrice: productWithDetails.price || 0,
    };
    navigate('/order', { state: orderState });
  };

  useEffect(() => {
    console.log('showToast state changed:', showToast);
  }, [showToast]);

  if (loading) {
    return (
      <Container className="my-5 py-5">
        <Row>
          {Array.from({ length: productsPerPage }).map((_, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <div style={{ height: '250px', backgroundColor: '#e9ecef', borderRadius: '5px 5px 0 0' }} />
                <Card.Body className="d-flex flex-column">
                  <div style={{ height: '20px', backgroundColor: '#e9ecef', marginBottom: '10px' }} />
                  <div style={{ height: '20px', backgroundColor: '#e9ecef', marginBottom: '20px' }} />
                  <div style={{ height: '40px', backgroundColor: '#e9ecef' }} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center my-3">
          <Spinner animation="border" variant="success" />
        </div>
      </Container>
    );
  }

  if (error) {
    return <div className="text-center my-5">{error}</div>;
  }

  const categories = [...new Set(products.map(product => product.category))];
  const tags = [...new Set(products.flatMap(product => product.tags || []))];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Thông Báo</strong>
            <small>{new Date().toLocaleTimeString()}</small>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <ProductListBanner />
      <Container className="my-5">
        <Row>
          <Col md={3} className="sidebar">
            <h3 className="mb-4">Bộ lọc</h3>

            <Form.Group className="mb-3">
              <Form.Label>Tìm kiếm</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Danh mục</Form.Label>
              <Form.Control
                as="select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Khoảng giá</Form.Label>
              <Form.Control
                as="select"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="">Tất cả giá</option>
                <option value="low">Dưới 1,000,000 VND</option>
                <option value="medium">1,000,000 - 3,000,000 VND</option>
                <option value="high">Trên 3,000,000 VND</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={9}>
            <h1 className="text-center mb-4 text-success">Tất cả sản phẩm</h1>

            <Row>
              {currentProducts.map((product) => (
                <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                  <Card className="h-100 shadow-sm border-0 product-card">
                    <Card.Img
                      variant="top"
                      src={product.image || 'https://via.placeholder.com/250x250?text=No+Image'}
                      alt={product.name || 'Unnamed Product'}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-dark">{product.name || 'Unnamed Product'}</Card.Title>
                      <Card.Text className="text-muted mb-auto">
                        {(product.price || 0).toLocaleString('vi-VN')} VND
                      </Card.Text>
                      <div className="mt-auto">
                        <Button
                          as={Link}
                          to={`/product/${product.id}`}
                          variant="outline-success"
                          className="me-2"
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <div className="d-flex justify-content-center mt-4">
              <Pagination className="green-pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>

            <TopRatedProducts />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductsPage;