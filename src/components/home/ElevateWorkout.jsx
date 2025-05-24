import React from 'react';
import { Row, Col } from 'react-bootstrap';

function ElevateWorkout() {
  const benefits = [
    { title: 'Hiện Đại', description: 'Mang một phong cách hợp thời đại.', img:'https://i.pinimg.com/736x/3c/70/3a/3c703a58e8385edb82acb6e9b400e73e.jpg' },
    { title: 'Chất lượng cao', description: 'Chất lượng cao, tài chế tốt nhat.',img:'https://i.pinimg.com/736x/6a/03/2a/6a032aae5cf40fb255f95cfea5ade7fb.jpg' },
    { title: 'Trang trí', description: 'Mang lại không gian sống tốt hơn', img:'https://i.pinimg.com/736x/87/5a/61/875a61cd396c27e546ee8b69cdf84038.jpg' },
  ];

  return (
    <div className="reveal my-5">
      <h2 className="text-center mb-4">Nâng tầm phong cách sống xanh</h2>
      <Row>
        {benefits.map((benefit, index) => (
          <Col key={index} md={4} className="text-center mb-4">
            <img
              src={benefit.img}
              alt={benefit.title}
              className="mb-3"
              style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            />
            <h5>{benefit.title}</h5>
            <p>{benefit.description}</p>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ElevateWorkout;