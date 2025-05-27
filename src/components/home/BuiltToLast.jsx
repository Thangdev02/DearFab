import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ScrollReveal from 'scrollreveal';

function BuiltToLast() {
  useEffect(() => {
    const sr = ScrollReveal();

    sr.reveal('.reveal img', {
      origin: 'left',
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      reset: false,
    });

    sr.reveal('.reveal h2, .reveal p', {
      origin: 'right',
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      delay: 300,
      reset: false,
    });
  }, []);

  return (
    <div className="reveal my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <img
            src="https://i.pinimg.com/736x/87/5a/61/875a61cd396c27e546ee8b69cdf84038.jpg"
            alt="Built to Last"
            className="img-fluid rounded"
            style={{ width: '70%', height: '500px',boxShadow: '4px 8px 8px rgba(0, 0, 0, 0.1)'  }}
          />
        </Col>
        <Col md={6}>
          <h2 className="text-success">Được thiết kế để bền vững</h2>
          <p>
            Sản phẩm của chúng tôi được làm từ vật liệu vải tái chế chất lượng cao, đảm bảo độ bền và thân thiện với môi trường. Mỗi sản phẩm đều được kiểm định kỹ lưỡng để mang lại giá trị lâu dài.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default BuiltToLast;
