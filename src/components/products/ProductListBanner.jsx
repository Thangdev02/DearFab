import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductListBanner() {
    return (
        <div
            className="reveal text-center position-relative"
            style={{
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                width: '100%',
            }}
        >
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1,
                }}
            >
                <source src="https://cdn.pixabay.com/video/2015/10/19/1108-142930228_medium.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 0,
                }}
            />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <h1 className="display-3">Danh sách Sản Phẩm</h1>
                <p className="lead">Mua sắm các sản phẩm tái chế – Góp phần bảo vệ môi trường.</p>
                {/* <Button as={Link} to="/products" variant="success" size="lg">Mua ngay</Button> */}
            </div>
        </div>
    );
}

export default ProductListBanner;