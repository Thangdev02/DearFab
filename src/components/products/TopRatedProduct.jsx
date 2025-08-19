import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/api';
import ScrollReveal from 'scrollreveal';

function TopRatedProducts() {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const topRated = data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4);
        setTopProducts(topRated);
      } catch (err) {
        console.error('Error fetching top rated products:', err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    ScrollReveal().reveal('.product-card', {
      origin: 'bottom',
      distance: '20px',
      duration: 700,
      easing: 'ease-in-out',
      interval: 150,
      reset: false,
    });
  }, [topProducts]);

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 ">
        <div></div>
        <h2 className="text-success ">Sản phẩm đánh giá cao</h2>
        <Button as={Link} to="/products" variant="outline-success">
          Xem thêm
        </Button>
      </div>

      <Row>
        {topProducts.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-dark">{product.name}</Card.Title>
                <Card.Text className="text-muted mb-auto">
                  {product.price.toLocaleString('vi-VN')} VND
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
    </Container>
  );
}

export default TopRatedProducts;
