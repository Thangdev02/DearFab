import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const RelatedProducts = ({ product, products }) => {
  const getRelatedProducts = () => {
    if (!product || !products.length) return [];
    const related = products.filter(p => p.id !== product.id && p.category === product.category);
    return related.slice(0, 4); // Limit to 4 related products
  };

  const relatedProducts = getRelatedProducts();

  if (relatedProducts.length === 0) return null;

  return (
    <Container className="my-8">
      <Row className="justify-center">
        {relatedProducts.map((item) => (
          <Col key={item.id} sm={6} md={3} className="mb-6">
            <Card className="border rounded-lg overflow-hidden hover:shadow-lg transition">
              <Card.Img 
                style={{ height: '200px', objectFit: 'cover' }} 
                variant="top" 
                src={item.image} 
                alt={item.name} 
              />
              <Card.Body className="p-4">
                <Card.Title style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}  className="text-lg font-medium text-gray-900">{item.name}</Card.Title>
                <Card.Text className="text-red-600 font-semibold">
                  {item.price.toLocaleString('vi-VN')} VND
                </Card.Text>
                
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RelatedProducts;