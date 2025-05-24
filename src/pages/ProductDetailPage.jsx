import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Toast, ToastContainer, Form, Carousel, Badge } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import RelatedProducts from '../components/products/RelatedProduct';
import { getProductById, getProducts } from '../services/api';
import ProductDetailBanner from '../components/products/ProductDetaiBanner';
import { FaFacebookSquare, FaFacebookMessenger } from 'react-icons/fa';

function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [selectedSize, setSelectedSize] = useState('M'); // Default size
    const [quantity, setQuantity] = useState(1); // Track quantity for the cart

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await getProductById(id);
                setProduct(productData);

                const productsData = await getProducts();
                setAllProducts(productsData);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleAddToCart = (product) => {
        const productWithSize = {
            ...product,
            selectedSize,
            price: product.sizes[selectedSize].price, // Use the price for the selected size
            quantity, // Add the selected quantity
        };
        addToCart(productWithSize);
        setShowToast(true);

        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    if (loading) {
        return <Container><h2>Đang tải...</h2></Container>;
    }

    if (!product) {
        return <Container><h2>Sản phẩm không tồn tại</h2></Container>;
    }

    // Get the price and quantity for the selected size
    const currentPrice = product.sizes[selectedSize]?.price || product.price;
    const availableQuantity = product.sizes[selectedSize]?.quantity || 0;

    return (
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px 0' }}>
            <ProductDetailBanner />
            <Container className="reveal">
                <Row className="my-5">
                    <Col md={6}>
                        {/* Main Product Image */}
                        <img
                            style={{
                                width: '100%',
                                height: '700px',
                                objectFit: 'fill',
                                borderRadius: '10px',
                                backgroundColor: '#fff',
                                padding: '20px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            }}
                            src={product.image}
                            alt={product.name}
                            className="img-fluid"
                        />
                        {/* Thumbnail Carousel - Optional, since thumbnails aren't in the data */}
                        {product?.thumbnails && (
                            <Carousel
                                style={{ marginTop: '10px' }}
                                prevIcon={<span style={{ color: '#000', fontSize: '24px' }}>←</span>}
                                nextIcon={<span style={{ color: '#000', fontSize: '24px' }}>→</span>}
                            >
                                {product.thumbnails.map((thumbnail, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                objectFit: 'contain',
                                                margin: '0 5px',
                                                border: '1px solid #ddd',
                                                borderRadius: '5px',
                                            }}
                                            src={thumbnail}
                                            alt={`Thumbnail ${index + 1}`}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                    </Col>
                    <Col md={6}>
                        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                            {product.name}
                        </h1>
                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                            <Button
                                variant="link"
                                style={{
                                    color: '#6c757d',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding:0
                                }}
                            >
                                <span style={{ marginRight: '5px' }}>♥</span> Browse Wishlist
                            </Button>
                        </div>
                        {/* Add Badges for isNew and isFeatured */}
                        <div style={{ marginBottom: '10px' }}>
                            {product.isNew && (
                                <Badge bg="success" style={{ marginRight: '10px', padding: '5px 10px' }}>
                                    Sản phẩm mới
                                </Badge>
                            )}
                            {product.isFeatured && (
                                <Badge bg="info" style={{ padding: '5px 10px' }}>
                                    Nổi bật
                                </Badge>
                            )}
                        </div>
                        {/* Rest of the existing code */}
                        <h4 style={{ color: '#dc3545', fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
                            {currentPrice.toLocaleString('vi-VN')} VND
                        </h4>
                        <p style={{ color: '#6c757d', lineHeight: '1.6', marginBottom: '20px' }}>
                            {product.description}
                        </p>
                        {/* Size Selection */}
                        <Form.Group style={{ marginBottom: '20px' }}>
                            <Form.Label style={{ fontWeight: 'bold', color: '#6c757d' }}>
                                Kích thước:
                            </Form.Label>
                            <Form.Select
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                style={{ width: '100px', marginLeft: '10px', display: 'inline-block' }}
                            >
                                {Object.keys(product.sizes).map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        {/* Quantity Selection */}
                        <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
                            <Form.Group style={{ width: '100px', marginRight: '20px' }}>
                                <Form.Label style={{ fontWeight: 'bold', color: '#6c757d' }}>
                                    Số lượng:
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.min(Number(e.target.value), availableQuantity))}
                                    min={1}
                                    max={availableQuantity}
                                    style={{ padding: '5px' }}
                                />
                            </Form.Group>
                            <Button
                                variant="dark"
                                style={{
                                    backgroundColor: '#000',
                                    borderColor: '#000',
                                    padding: '10px 20px',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                }}
                                onClick={() => handleAddToCart(product)}
                                disabled={availableQuantity === 0}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                        </div>
                        <p style={{ color: '#6c757d', marginBottom: '5px' }}>
                            <strong>Kho:</strong> {availableQuantity} sản phẩm (kích thước {selectedSize})
                        </p>
                        
                        <p style={{ color: '#6c757d', marginBottom: '5px' }}>
                            <strong>Loại:</strong> {product.category}
                        </p>
                        <p style={{ color: '#6c757d', marginBottom: '5px' }}>
                            <strong>Nhãn:</strong> {product.tags?.join(', ') || 'tranh vải'}
                        </p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Button
                                variant="link"
                                style={{ padding: 0, color: '#6c757d' }}
                                onClick={() => window.open('https://facebook.com', '_blank')}
                            >
                                <FaFacebookSquare style={{ width: '20px', height: '20px' }} />
                            </Button>
                            <Button
                                variant="link"
                                style={{ padding: 0, color: '#6c757d' }}
                                onClick={() => window.open('https://m.me', '_blank')}
                            >
                                <FaFacebookMessenger style={{ width: '20px', height: '20px' }} />
                            </Button>
                        </div>
                    </Col>
                </Row>

                {/* Description and Reviews Tabs */}
                <div style={{ marginBottom: '40px' }}>
                    <div style={{ borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
                        <Button
                            variant="link"
                            style={{
                                color: '#218838',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                borderBottom: '2px solid #218838',
                                borderRadius: 0,
                                marginRight: '20px',
                            }}
                        >
                            Mô Tả
                        </Button>
                        <Button
                            variant="link"
                            style={{ color: '#6c757d', textDecoration: 'none', fontWeight: 'bold' }}
                        >
                            Đánh Giá (0)
                        </Button>
                    </div>
                    <p style={{ color: '#6c757d', lineHeight: '1.6' }}>{product.description}</p>
                </div>

                {/* Related Products */}
                <div>
                    <h3
                        style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: '20px',
                            position: 'relative',
                        }}
                    >
                        Sản phẩm liên quan
                        <span
                            style={{
                                position: 'absolute',
                                bottom: '-5px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '50px',
                                height: '2px',
                                backgroundColor: '#218838',
                            }}
                        ></span>
                    </h3>
                    <RelatedProducts product={product} products={allProducts} />
                </div>

                <ToastContainer position="top-end" className="p-3">
                    <Toast
                        bg="success"
                        onClose={() => setShowToast(false)}
                        show={showToast}
                        delay={3000}
                        autohide
                    >
                        <Toast.Header>
                            <strong className="me-auto">Thông báo</strong>
                        </Toast.Header>
                        <Toast.Body className="text-white">
                            Đã thêm <strong>{product.name}</strong> (Size: {selectedSize}) vào giỏ hàng!
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            </Container>
        </div>
    );
}

export default ProductDetailPage;