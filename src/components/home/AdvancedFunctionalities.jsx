import React, { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import ScrollReveal from 'scrollreveal';

function AdvancedFunctionalities() {
  const functionalities = [
    { title: 'Thiết kế thủ công', description: 'Mỗi sản phẩm được làm thủ công với sự tỉ mỉ.', img:'https://i.pinimg.com/736x/7e/e4/2d/7ee42da5bef6ca6102417e38df4d6e56.jpg' },
    { title: 'Nguyên liệu bền vững', description: 'Sử dụng vật liệu tái chế thân thiện môi trường.',img:'https://i.pinimg.com/736x/37/fc/e4/37fce4052bb1dcea523b6acffe15010c.jpg' },
    { title: 'Đa năng', description: 'Phù hợp với nhiều mục đích sử dụng khác nhau.',img:'https://i.pinimg.com/736x/c6/2e/30/c62e300198a9b161e08457a29ddbd424.jpg' },
  ];

  useEffect(() => {
    ScrollReveal().reveal('.reveal .card', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      interval: 200,  // Mỗi card sẽ xuất hiện cách nhau 200ms
      reset: false,   // Không cho animation lặp lại khi cuộn lên xuống lại
    });
  }, []);

  return (
    <div className="reveal my-5">
      <h2 className="text-center mb-4">Tính năng vượt trội</h2>
      <Row>
        {functionalities.map((func, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card className="text-center border-0 shadow-sm">
              <Card.Img
                variant="top"
                src={func.img}
                style={{ height: '600px', objectFit: 'fill' , borderRadius: '10px',  }}
              />
              <Card.Body>
                <Card.Title>{func.title}</Card.Title>
                <Card.Text>{func.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default AdvancedFunctionalities;
