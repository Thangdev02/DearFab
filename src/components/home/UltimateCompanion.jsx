import React from 'react';
import { Row, Col } from 'react-bootstrap';

function UltimateCompanion() {
  return (
    <div className="reveal my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <h2 className="text-success ">Người bạn đồng hành tuyệt vời</h2>
          <p>
            Các sản phẩm tái chế của chúng tôi không chỉ là vật dụng, mà còn là người bạn đồng hành trong hành trình sống xanh của bạn. Hãy để chúng tôi cùng bạn tạo nên một tương lai bền vững.
          </p>
        </Col>
        <Col md={6}>
          <img
            src="https://i.pinimg.com/736x/fb/25/2b/fb252bde925863ab8a40a6c562c3e68e.jpg"
            alt="Ultimate Companion"
            className="img-fluid rounded"
            style={{ width: '100%', height: '500px',boxShadow: '4px 8px 8px rgba(0, 0, 0, 0.1)' }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default UltimateCompanion;