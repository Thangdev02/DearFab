import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Leaf, Brush, ShieldShaded } from 'react-bootstrap-icons';
import ScrollReveal from 'scrollreveal';

function MainFeatures() {
    useEffect(() => {
        ScrollReveal().reveal('.feature-item', {
            origin: 'bottom',
            distance: '50px',
            duration: 800,
            easing: 'ease-in-out',
            interval: 100,
        });
    }, []);
    const features = [
        {
            icon: <Leaf size={40} className="text-success mb-3" />,
            title: 'Thân thiện môi trường',
            description: 'Sản phẩm làm từ vật liệu tái chế.',
        },
        {
            icon: <Brush size={40} className="text-success mb-3" />,
            title: 'Thiết kế độc đáo',
            description: 'Mỗi sản phẩm là một tác phẩm riêng.',
        },
        {
            icon: <ShieldShaded size={40} className="text-success mb-3" />,
            title: 'Bền vững',
            description: 'Được thiết kế để sử dụng lâu dài.',
        },
    ];

    return (
        <div className="reveal my-5">
            <h2 className="text-center mb-5 text-success">Tính năng chính</h2>
            <Row>
                {features.map((feature, index) => (
                    <Col key={index} md={4} className="text-center mb-4 feature-item">
                        <div>{feature.icon}</div>
                        <h5>{feature.title}</h5>
                        <p>{feature.description}</p>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default MainFeatures;
