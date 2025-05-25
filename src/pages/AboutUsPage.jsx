import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';

function AboutUsPage() {
  return (
    <div style={styles.pageWrapper}>
      <Container className="py-5">
        {/* Title */}
        <Row className="justify-content-center mb-4">
          <Col md={10}>
            <h1 style={styles.title}>Chúng Tôi Là Ai?</h1>
            <p style={styles.subTitle}>Khám phá câu chuyện và sứ mệnh của Dear Fabric.</p>
          </Col>
        </Row>

        {/* Introduction */}
        <Row className="align-items-center mb-5">
          <Col md={6}>
            <Image
              src="https://png.pngtree.com/png-vector/20240603/ourmid/pngtree-female-lawyer-professional-worker-avatar-png-image_12604865.png"
              alt="Giới thiệu"
              fluid
              rounded   
              style={{  width: '100%', height: '540px', objectFit: 'contain' }}
            />
          </Col>
          <Col md={6}>
            <Card style={styles.card}>
              <Card.Body>
                <Card.Title style={styles.cardTitle}>Giới Thiệu</Card.Title>
                <Card.Text style={styles.cardText}>
                  Dear Fabric! là một dự án sáng tạo ra đời từ niềm đam mê về sự bền vững và biểu đạt nghệ thuật.
                  Chúng tôi biến những mảnh vải tái chế thành những bức tranh ghép vải đầy màu sắc và độc đáo, thổi hồn
                  vào những vật liệu có thể bị vứt bỏ.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Mission */}
        <Row className="mb-5">
          <Col md={12}>
            <Card style={styles.card}>
              <Card.Body>
                <Card.Title style={styles.cardTitle}>Sứ Mệnh</Card.Title>
                <Card.Text style={styles.cardText}>
                  Sứ mệnh của chúng tôi là truyền cảm hứng và thúc đẩy các thực hành nghệ thuật bền vững, đồng thời thể
                  hiện vẻ đẹp của những vật liệu tái chế. Tại DearFab, chúng tôi tin rằng mỗi mảnh vải vụn đều có tiềm
                  năng trở thành điều gì đó phi thường.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Core Values */}
        <Row className="mb-5">
          <Col md={12}>
            <Card style={styles.card}>
              <Card.Body>
                <Card.Title style={styles.cardTitle}>Giá Trị Cốt Lõi</Card.Title>
                <Card.Text style={styles.cardText}>
                  Thông qua công việc của mình, chúng tôi mong muốn khơi gợi niềm vui, khuyến khích sự tỉnh thức và góp
                  phần vào một hành tinh xanh hơn. Hãy cùng chúng tôi tôn vinh nghệ thuật của những cơ hội thứ hai, nơi
                  sáng tạo gặp gỡ sự bền vững!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    paddingTop: '60px',
  },
  title: {
    color: '#01542d',
    fontSize: '3rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '10px',
  },
  subTitle: {
    fontSize: '1.2rem',
    color: '#666',
    textAlign: 'center',
    marginBottom: '30px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '20px',
    border: 'none',
    padding: '25px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
  },
  cardTitle: {
    color: '#01542d',
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '15px',
  },
  cardText: {
    fontSize: '1rem',
    color: '#333',
    lineHeight: '1.7',
  },
};

export default AboutUsPage;
