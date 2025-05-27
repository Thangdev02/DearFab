import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductDetailBanner() {
  return (
    <div
      className="reveal text-center position-relative"
      style={{
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        width: '100%',
        backgroundImage: 'url("https://cdn.pixabay.com/photo/2019/02/26/19/03/flat-lay-4022714_1280.jpg")', // Placeholder image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
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
        <h1 className="display-3">Chi Tiết Sản Phẩm</h1>
        <p className="lead">Mua sắm các sản phẩm tái chế – Góp phần bảo vệ môi trường.</p>
        {/* <Button as={Link} to="/products" variant="success" size="lg">Mua ngay</Button> */}
      </div>
    </div>
  );
}

export default ProductDetailBanner;