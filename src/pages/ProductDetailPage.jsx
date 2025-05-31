import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Toast, ToastContainer, Form, Carousel, Badge, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import RelatedProducts from '../components/products/RelatedProduct';
import { getProductById, getProducts, getReviewsByProductId, saveReview, updateReview, deleteReview, getUserById } from '../services/api';
import { FaFacebookSquare, FaFacebookMessenger, FaStar } from 'react-icons/fa';
import ProductDetailBanner from '../components/products/ProductDetaiBanner';
import Cookies from 'js-cookie';

// Avatar mặc định
const defaultAvatar = 'https://static.vecteezy.com/system/resources/previews/014/194/215/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  // Review state
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ content: '', ratingPoint: 5 });
  const [editReviewId, setEditReviewId] = useState(null);
  const [editReviewData, setEditReviewData] = useState({ content: '', ratingPoint: 5 });
  const [reviewError, setReviewError] = useState('');
  const [users, setUsers] = useState({}); // Lưu thông tin người dùng theo userId
  const [hasReviewed, setHasReviewed] = useState(false); // Kiểm tra user đã review chưa

  // Lấy thông tin người dùng từ Cookies
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

  // Fetch dữ liệu sản phẩm, reviews và thông tin người dùng
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);

        const productsData = await getProducts();
        setAllProducts(productsData);

        const reviewsData = await getReviewsByProductId(id);
        // Sắp xếp reviews theo thời gian giảm dần (mới nhất lên trên)
        const sortedReviews = reviewsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setReviews(sortedReviews);

        // Kiểm tra xem user đã review sản phẩm này chưa
        if (user) {
          const userReview = sortedReviews.find(review => review.userId === user.id);
          setHasReviewed(!!userReview);
        }

        // Lấy thông tin người dùng cho từng review
        const userIds = [...new Set(reviewsData.map(review => review.userId))];
        const userPromises = userIds.map(userId => getUserById(userId));
        const usersData = await Promise.all(userPromises);
        const usersMap = usersData.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});
        setUsers(usersMap);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user]);

  // Update selectedSize dựa trên kích thước khả dụng
  useEffect(() => {
    if (product) {
      const availableSizes = Object.keys(product.sizes).filter(
        (size) => product.sizes[size].quantity > 0
      );
      if (availableSizes.length > 0 && !availableSizes.includes(selectedSize)) {
        setSelectedSize(availableSizes[0]);
      }
    }
  }, [product, selectedSize]);

  const handleAddToCart = (product) => {
    const productWithSize = {
      ...product,
      selectedSize,
      price: product.sizes[selectedSize].price,
      quantity,
    };
    addToCart(productWithSize);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  // Xử lý gửi review mới
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setReviewError('Vui lòng đăng nhập để gửi đánh giá.');
      return;
    }
    if (hasReviewed) {
      setReviewError('Bạn đã gửi đánh giá cho sản phẩm này rồi. Bạn chỉ có thể gửi một đánh giá duy nhất.');
      return;
    }
    if (!newReview.content.trim()) {
      setReviewError('Vui lòng nhập nội dung đánh giá.');
      return;
    }

    const review = {
      userId: user.id,
      productId: id,
      content: newReview.content,
      ratingPoint: newReview.ratingPoint,
      date: new Date().toISOString(),
    };

    try {
      const savedReview = await saveReview(review);
      // Thêm review mới vào đầu danh sách (mới nhất lên trên)
      setReviews([savedReview, ...reviews]);
      setNewReview({ content: '', ratingPoint: 5 });
      setReviewError('');
      setHasReviewed(true); // Đánh dấu user đã review

      // Cập nhật thông tin người dùng cho review mới
      if (!users[user.id]) {
        const userData = await getUserById(user.id);
        setUsers((prev) => ({ ...prev, [user.id]: userData }));
      }
    } catch (error) {
      setReviewError('Không thể gửi đánh giá. Vui lòng thử lại sau.');
    }
  };

  // Xử lý chỉnh sửa review
  const handleEditReview = (review) => {
    if (!user || user.id !== review.userId) {
      setReviewError('Bạn không có quyền chỉnh sửa đánh giá này.');
      return;
    }
    setEditReviewId(review.id); // Sử dụng review.id thay vì review.reviewId
    setEditReviewData({ content: review.content, ratingPoint: review.ratingPoint });
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    if (!editReviewData.content.trim()) {
      setReviewError('Vui lòng nhập nội dung đánh giá.');
      return;
    }

    try {
      const updatedReview = await updateReview(editReviewId, {
        ...reviews.find((r) => r.id === editReviewId),
        content: editReviewData.content,
        ratingPoint: editReviewData.ratingPoint,
        date: new Date().toISOString(),
      });
      // Chỉ cập nhật review được chỉnh sửa, giữ nguyên các review khác
      setReviews(reviews.map((r) => (r.id === editReviewId ? updatedReview : r)));
      setEditReviewId(null);
      setEditReviewData({ content: '', ratingPoint: 5 });
      setReviewError('');
    } catch (error) {
      setReviewError('Không thể cập nhật đánh giá. Vui lòng thử lại sau.');
    }
  };

  // Xử lý xóa review
  const handleDeleteReview = async (reviewId) => {
    const review = reviews.find((r) => r.id === reviewId);
    if (!user || user.id !== review.userId) {
      setReviewError('Bạn không có quyền xóa đánh giá này.');
      return;
    }

    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter((r) => r.id !== reviewId));
      setHasReviewed(false); // Cho phép user gửi review mới sau khi xóa
    } catch (error) {
      setReviewError('Không thể xóa đánh giá. Vui lòng thử lại sau.');
    }
  };

  // Hàm chọn sao
  const handleStarSelect = (rating, setRatingData, ratingData) => {
    setRatingData({ ...ratingData, ratingPoint: rating });
  };

  if (loading) {
    return <Container><h2>Đang tải...</h2></Container>;
  }

  if (!product) {
    return <Container><h2>Sản phẩm không tồn tại</h2></Container>;
  }

  const currentPrice = product.sizes[selectedSize]?.price || product.price;
  const availableQuantity = product.sizes[selectedSize]?.quantity || 0;
  const availableSizes = Object.keys(product.sizes).filter(
    (size) => product.sizes[size].quantity > 0
  );

  return (
    <div style={{ backgroundColor: '#f8f9fa', padding: '20px 0' }}>
      <ProductDetailBanner />
      <Container className="reveal">
        <Row className="my-5">
          <Col md={6}>
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
                  padding: 0,
                }}
              >
                <span style={{ marginRight: '5px' }}>♥</span> Browse Wishlist
              </Button>
            </div>
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
            <h4 style={{ color: '#dc3545', fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
              {currentPrice.toLocaleString('vi-VN')} VND
            </h4>
            <p style={{ color: '#6c757d', lineHeight: '1.6', marginBottom: '20px' }}>
              {product.description}
            </p>
            <Form.Group style={{ marginBottom: '20px' }}>
              <Form.Label style={{ fontWeight: 'bold', color: '#6c757d' }}>
                Kích thước:
              </Form.Label>
              <Form.Select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                style={{ width: '100px', marginLeft: '10px', display: 'inline-block' }}
                disabled={availableSizes.length === 0}
              >
                {availableSizes.length > 0 ? (
                  availableSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Không có kích thước khả dụng
                  </option>
                )}
              </Form.Select>
            </Form.Group>
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
                  disabled={availableQuantity === 0}
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

        {/* Tabs for Description and Reviews */}
        <div style={{ marginBottom: '40px' }}>
          <Tabs defaultActiveKey="description" id="product-tabs" className="mb-3">
            <Tab eventKey="description" title="Mô Tả">
              <p style={{ color: '#6c757d', lineHeight: '1.6' }}>{product.description}</p>
            </Tab>
            <Tab eventKey="reviews" title={`Đánh Giá (${reviews.length})`}>
              {/* Hiển thị danh sách review */}
              {reviews.length === 0 ? (
                <p>Chưa có đánh giá nào cho sản phẩm này.</p>
              ) : (
                <ListGroup variant="flush" className="review-grid">
                  <div className="review-container">
                    {reviews.map((review) => (
                      <ListGroup.Item
                        key={review.id} // Sử dụng review.id thay vì review.reviewId
                        className="mb-3 review-card"
                        style={{
                          border: '1px solid #e9ecef',
                          borderRadius: '8px',
                          padding: '15px',
                          backgroundColor: '#fff',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                          width: '100%',
                          margin: '0 0.5%',
                        }}
                      >
                        {editReviewId === review.id ? ( // Sử dụng review.id
                          <Form onSubmit={handleUpdateReview}>
                            <Form.Group className="mb-3" controlId={`editReviewContent-${review.id}`}>
                              <Form.Label>Nội dung đánh giá:</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                value={editReviewData.content}
                                onChange={(e) => setEditReviewData({ ...editReviewData, content: e.target.value })}
                                placeholder="Nhập nội dung đánh giá của bạn..."
                                required
                                style={{ borderRadius: '5px', borderColor: '#ced4da' }}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId={`editReviewRating-${review.id}`}>
                              <Form.Label>Chọn số sao:</Form.Label>
                              <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <FaStar
                                    key={star}
                                    style={{
                                      cursor: 'pointer',
                                      color: star <= editReviewData.ratingPoint ? '#ffd700' : '#e4e4e4',
                                      fontSize: '20px',
                                      marginRight: '5px',
                                    }}
                                    onClick={() => handleStarSelect(star, setEditReviewData, editReviewData)}
                                  />
                                ))}
                              </div>
                            </Form.Group>
                            <Button variant="success" type="submit" className="me-2">
                              Lưu
                            </Button>
                            <Button variant="secondary" onClick={() => setEditReviewId(null)}>
                              Hủy
                            </Button>
                          </Form>
                        ) : (
                          <>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                              <img
                                src={defaultAvatar}
                                alt="Avatar"
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '50%',
                                  marginRight: '10px',
                                  border: '1px solid #ddd',
                                }}
                              />
                              <div style={{ flex: '1' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <div>
                                    <strong style={{ fontSize: '16px', color: '#343a40' }}>
                                      {users[review.userId]?.name || `User ${review.userId}`}
                                    </strong>
                                    <div>
                                      {[...Array(5)].map((_, index) => (
                                        <FaStar
                                          key={index}
                                          style={{
                                            color: index < review.ratingPoint ? '#ffd700' : '#e4e4e4',
                                            fontSize: '16px',
                                            marginRight: '2px',
                                          }}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <div style={{ color: '#6c757d', fontSize: '14px' }}>
                                    {new Date(review.date).toLocaleString('vi-VN', {
                                      dateStyle: 'medium',
                                      timeStyle: 'short',
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p style={{ color: '#495057', lineHeight: '1.6', marginBottom: '10px' }}>
                              {review.content}
                            </p>
                            {user && user.id === review.userId && (
                              <div>
                                <Button
                                  variant="warning"
                                  size="sm"
                                  onClick={() => handleEditReview(review)}
                                  className="me-2"
                                  style={{ borderRadius: '5px' }}
                                >
                                  Sửa
                                </Button>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDeleteReview(review.id)} // Sử dụng review.id
                                  style={{ borderRadius: '5px' }}
                                >
                                  Xóa
                                </Button>
                              </div>
                            )}
                          </>
                        )}
                      </ListGroup.Item>
                    ))}
                  </div>
                </ListGroup>
              )}

              {/* Form gửi review */}
              <div className="mt-4">
                <h5 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                  Gửi Đánh Giá Của Bạn
                </h5>
                {reviewError && <p style={{ color: 'red', marginBottom: '10px' }}>{reviewError}</p>}
                <Form onSubmit={handleReviewSubmit}>
                  <Form.Group className="mb-3" controlId="reviewContent">
                    <Form.Label>Nội dung đánh giá:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={newReview.content}
                      onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                      placeholder="Nhập nội dung đánh giá của bạn..."
                      required
                      style={{ borderRadius: '5px', borderColor: '#ced4da' }}
                      disabled={hasReviewed} // Vô hiệu hóa nếu user đã review
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="reviewRating">
                    <Form.Label>Chọn số sao:</Form.Label>
                    <div>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          style={{
                            cursor: hasReviewed ? 'not-allowed' : 'pointer',
                            color: star <= newReview.ratingPoint ? '#ffd700' : '#e4e4e4',
                            fontSize: '20px',
                            marginRight: '5px',
                          }}
                          onClick={() => !hasReviewed && handleStarSelect(star, setNewReview, newReview)}
                        />
                      ))}
                    </div>
                  </Form.Group>
                  <Button
                    variant="success"
                    type="submit"
                    style={{ borderRadius: '5px', padding: '8px 20px' }}
                    disabled={hasReviewed} // Vô hiệu hóa nút nếu user đã review
                  >
                    Gửi Đánh Giá
                  </Button>
                </Form>
              </div>
            </Tab>
          </Tabs>
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
            delay={2000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Thông báo</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              Thêm vào giỏ hàng thành công! <strong>{product.name}</strong> (Size: {selectedSize})
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>

      {/* CSS cho layout reviews */}
      <style>
        {`
          .review-grid .review-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1%;
            margin: 0 -0.5%;
          }

          .review-grid .review-card {
            width: 100%;
            box-sizing: border-box;
          }

          @media (max-width: 768px) {
            .review-grid .review-container {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
}

export default ProductDetailPage;