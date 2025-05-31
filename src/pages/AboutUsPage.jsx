import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import AboutUsSection from '../components/about/aboutSection';

function AboutUsPage() {
  return (
    <div style={styles.pageWrapper}>
      <Container className="py-5">
        {/* Phần đầu trang */}
        <Row className="mb-4 text-center">
          <Col>
            <h1 style={styles.title}>DearFab</h1>
          </Col>
        </Row>

        <AboutUsSection />
        {/* Tin nhắn chào mừng */}
        <Row className="mb-5">
          <Col md={6}>
            <Image
              src="https://www.sunbrella.com/media/wysiwyg/all-fabrics-sunbrella-upholstery-hero.jpg"
              alt="Công việc DearFab"
              fluid
              style={styles.welcomeImage}
            />
          </Col>
          <Col md={6}>
            <Card style={styles.welcomeCard}>
              <Card.Body>
                <Card.Text style={styles.welcomeText}>
                  Tại DearFab, chúng tôi biến những mảnh vải tái chế thành những tác phẩm nghệ thuật ghép vải tuyệt đẹp, đảm bảo mỗi mảnh đều kể một câu chuyện về sự tái sinh và sáng tạo.
                </Card.Text>
                <Button variant="outline-success" style={styles.learnMoreButton}>Tìm Hiểu Thêm</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Ghi chú khách hàng */}
        <Row className="mb-5">
          <Col>
            <Card style={styles.clientNoteCard}>
              <Card.Body>
                <Card.Text style={styles.clientNoteText}>
                  Chúng tôi biến những mảnh vải tái chế thành những bức tranh ghép vải đầy màu sắc và độc đáo.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Cách tiếp cận của chúng tôi */}
        <Row className="mb-5">
          <Col>
            <h2 style={styles.sectionTitle}>Cách Tiếp Cận Của Chúng Tôi</h2>
            <Card style={styles.approachCard}>
              <Card.Body>
                <Card.Text style={styles.approachText}>
                  Chúng tôi tạo ra nghệ thuật bền vững thông qua sự sáng tạo, tính bền vững và kỹ thuật thủ công, biến những vật liệu bị bỏ đi thành những tác phẩm có ý nghĩa.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Thành viên nhóm */}
        <Row className="mb-5">
          <Col>
            <h2 style={styles.sectionTitle}>Đội Ngũ Của Chúng Tôi</h2>
            <Row className="g-4">
              {/* Lãnh đạo */}
              <Col md={4}>
                <Card style={styles.serviceCard}>
                  <Card.Body>
                    <Image
                      src="https://i.ibb.co/G4T7P4Kc/TNQA.jpg"
                      alt="Trần Ngọc Quỳnh Anh"
                      fluid
                      style={styles.serviceImage}
                    />
                    <Card.Text style={styles.serviceText}>Trần Ngọc Quỳnh Anh</Card.Text>
                    <Card.Text style={styles.serviceRole}>Trưởng Nhóm - HS170783</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              {/* Thành viên 1 */}
              <Col md={4}>
                <Card style={styles.serviceCard}>
                  <Card.Body>
                    <Image
                      src="https://i.ibb.co/5XG1ZqtH/LMT.jpg"
                      alt="Lê Minh Thư"
                      fluid
                      style={styles.serviceImage}
                    />
                    <Card.Text style={styles.serviceText}>Lê Minh Thư</Card.Text>
                    <Card.Text style={styles.serviceRole}>Thành Viên - HE170538</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              {/* Thành viên 2 */}
              <Col md={4}>
                <Card style={styles.serviceCard}>
                  <Card.Body>
                    <Image
                      src="https://i.ibb.co/jZjrvKXK/NTB.jpg"
                      alt="Nguyễn Tất Bách"
                      fluid
                      style={styles.serviceImage}
                    />
                    <Card.Text style={styles.serviceText}>Nguyễn Tất Bách</Card.Text>
                    <Card.Text style={styles.serviceRole}>Thành Viên - HE171235</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              {/* Thành viên 3 */}
              <Col md={4}>
                <Card style={styles.serviceCard}>
                  <Card.Body>
                    <Image
                      src="https://i.ibb.co/qMWVM7XH/NTNT.jpg"
                      alt="Nguyễn Thị Ngọc Thuý"
                      fluid
                      style={styles.serviceImage}
                    />
                    <Card.Text style={styles.serviceText}>Nguyễn Thị Ngọc Thuý</Card.Text>
                    <Card.Text style={styles.serviceRole}>Thành Viên - HS163220</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              {/* Thành viên 4 */}
              <Col md={4}>
                <Card style={styles.serviceCard}>
                  <Card.Body>
                    <Image
                      src="https://i.ibb.co/fzbkTBVB/DHM.jpg"
                      alt="Đỗ Huệ Minh"
                      fluid
                      style={styles.serviceImage}
                    />
                    <Card.Text style={styles.serviceText}>Đỗ Huệ Minh</Card.Text>
                    <Card.Text style={styles.serviceRole}>Thành Viên - HS170098</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Hình ảnh chân trang */}
        <Row className="mb-5">
          <Col>
            <Image
              src="https://cdn.pixabay.com/photo/2019/02/26/19/03/flat-lay-4022714_1280.jpg"
              alt="Hình ảnh chân trang"
              fluid
              style={styles.footerImg}
            />
          </Col>
        </Row>

        {/* Chân trang */}
        <Row className="mt-5 text-center">
          <Col>
            <div style={styles.footerText}>
              Liên hệ để khám phá các tác phẩm nghệ thuật bền vững của chúng tôi. Chúng tôi ở đây để truyền cảm hứng sáng tạo!
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    paddingTop: '80px',
  },
  title: {
    color: '#006400',
    fontSize: '3.5rem',
    fontWeight: '900',
    marginBottom: '20px',
  },
  subtitle: {
    color: '#666',
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  contactButton: {
    backgroundColor: '#006400',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
  },
  welcomeImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  welcomeCard: {
    background: '#fff',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    padding: '20px',
  },
  welcomeText: {
    fontSize: '1rem',
    color: '#333',
    lineHeight: '1.6',
  },
  learnMoreButton: {
    borderColor: '#006400',
    color: '#006400',
  },
  clientNoteCard: {
    background: '#c4d7b2',
    border: 'none',
    borderRadius: '10px',
    textAlign: 'center',
    padding: '30px',
  },
  clientNoteText: {
    fontSize: '1.1rem',
    color: '#333',
  },
  sectionTitle: {
    color: '#006400',
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '20px',
  },
  approachCard: {
    background: '#fff',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    padding: '20px',
  },
  approachText: {
    fontSize: '1rem',
    color: '#666',
  },
  serviceCard: {
    background: '#fff',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  serviceImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
  },
  serviceText: {
    fontSize: '1.1rem',
    color: '#333',
    padding: '10px',
  },
  serviceRole: {
    fontSize: '0.95rem',
    color: '#6c757d',
    fontStyle: 'italic',
    paddingBottom: '10px',
  },
  footerImg: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  visitButton: {
    borderColor: '#006400',
    color: '#006400',
    marginBottom: '20px',
  },
  footerText: {
    color: '#666',
    fontSize: '0.9rem',
  },
};

export default AboutUsPage;