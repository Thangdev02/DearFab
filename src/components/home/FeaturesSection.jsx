import React, { useEffect } from 'react';
import { Airplane, ArrowRepeat, Leaf, CreditCard } from 'react-bootstrap-icons';
import { Container, Row, Col } from 'react-bootstrap';
import ScrollReveal from 'scrollreveal';

const FeaturesSection = () => {
    const features = [
        {
            icon: <Airplane size={40} className="mb-3 text-dark" />,
            title: 'Giao hàng nhanh, toàn quốc',
            description: 'Chúng tôi cam kết giao hàng trên toàn quốc, nhanh, an toàn!',
        },
        {
            icon: <ArrowRepeat size={40} className="mb-3 text-dark" />,
            title: 'Trả hàng, Bảo hành',
            description: 'Đổi trả linh hoạt trong vòng 7 ngày!',
        },
        {
            icon: <Leaf size={40} className="mb-3 text-dark" />,
            title: 'Bảo vệ môi trường',
            description: 'Các sản phẩm của chúng tôi được làm hoàn toàn từ vật liệu tái chế, giảm áp lực lên môi trường xanh.',
        },
        {
            icon: <CreditCard size={40} className="mb-3 text-dark" />,
            title: 'Vật liệu độc quyền',
            description: 'Sản phẩm của DearFab tự hào làm từ vật liệu tái chế độc quyền',
        },
    ];

    useEffect(() => {
      ScrollReveal().reveal('.feature-item', {
        origin: 'bottom',
        distance: '20px',
        duration: 800,
        easing: 'ease-in-out',
        interval: 150,
        reset: false,
      });
    }, []);

    return (
        <div className="bg-white py-5 my-5">
  <Container>
    <Row className="text-center justify-content-center g-4">
      {features.map((feature, index) => (
        <Col key={index} md={6} lg={3} className="feature-item">
          <div
            className="d-flex flex-column align-items-center h-100"
            style={{ minHeight: '250px' }} 
          >
            <div className="flex-grow-0">
              {feature.icon}
              <p className="fs-5 fw-semibold mb-2">{feature.title}</p>
              <p className="text-muted mb-3" style={{ maxWidth: '220px' }}>
                {feature.description}
              </p>
            </div>
            <a
              href="#"
              className="text-decoration-none text-dark fw-medium mt-auto"
            >
              Xem chi tiết
            </a>
          </div>
        </Col>
      ))}
    </Row>
  </Container>
</div>
    );
};

export default FeaturesSection;
