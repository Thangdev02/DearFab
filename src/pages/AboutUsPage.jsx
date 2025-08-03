import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import AboutUsSection from '../components/about/aboutSection';

const AboutUsPage = () => {
  const members = [
    {
      nameMember: 'Trần Ngọc Quỳnh Anh',
      memberCode: 'HS170783',
      imageMember: 'https://i.ibb.co/G4T7P4Kc/TNQA.jpg',
      roleMember: 'Leader'
    },
    {
      nameMember: 'Lê Minh Thư',
      memberCode: 'HS170538',
      imageMember: 'https://i.ibb.co/5XG1ZqtH/LMT.jpg',
      roleMember: 'Thành viên'
    },
    {
      nameMember: 'Nguyễn Tất Bách',
      memberCode: 'HE171235',
      imageMember: 'https://i.ibb.co/jZjrvKXK/NTB.jpg',
      roleMember: 'Thành viên'
    },
    {
      nameMember: 'Nguyễn Thị Ngọc Thuý',
      memberCode: 'HS163220',
      imageMember: 'https://i.ibb.co/qMWVM7XH/NTNT.jpg',
      roleMember: 'Thành viên'
    },
    {
      nameMember: 'Đỗ Minh Huệ',
      memberCode: 'HS170098',
      imageMember: 'https://i.ibb.co/fzbkTBVB/DHM.jpg',
      roleMember: 'Thành viên'
    },
  ];

  return (
    <div style={styles.wrapper}>
      <Container>
      <Row className="mb-4 text-center">
          <Col>
            <h1 style={styles.title}>DearFab</h1>
          </Col>
        </Row>

        <AboutUsSection />
        <Row className="text-center mb-5">
          <Col>
            <h1 style={styles.title}>Về Chúng Tôi</h1>
            <p style={styles.subText}>
              Chúng tôi đam mê tái chế và sáng tạo nên những tác phẩm nghệ thuật độc đáo từ vải vụn.
            </p>
          </Col>
        </Row>

        {/* Banner Image */}
        <Row className="mb-5">
          <Col>
            <Image
              src="https://www.sunbrella.com/media/wysiwyg/all-fabrics-sunbrella-upholstery-hero.jpg"
              alt="DearFab banner"
              fluid
              style={styles.bannerImage}
            />
          </Col>
        </Row>

        {/* Mission Statement */}
        <Row className="mb-5 text-center">
          <Col md={{ span: 8, offset: 2 }}>
            <h3 style={styles.sectionTitle}>Sứ mệnh của DearFab</h3>
            <p style={styles.description}>
              DearFab hướng đến việc bảo vệ môi trường thông qua nghệ thuật tái chế, biến những mảnh vải không còn giá trị thành những bức tranh và sản phẩm đầy cảm hứng, mang tính ứng dụng cao.
            </p>
          </Col>
        </Row>

        {/* Our Team */}
        <Row className="mb-4">
          <Col>
            <h3 style={styles.sectionTitle}>Đội Ngũ</h3>
          </Col>
        </Row>
        <Row className="g-4">
          {members.map((member, idx) => (
            <Col md={4} sm={6} xs={12} key={idx}>
              <Card style={styles.memberCard}>
                <Image
                  src={member.imageMember}
                  alt={member.nameMember}
                  roundedCircle
                  style={styles.memberImage}
                />
                <Card.Body className="text-center">
                  <h5 style={styles.memberName}>{member.nameMember}</h5>
                  <p style={styles.memberRole}>
                    {member.roleMember} - {member.memberCode}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Footer */}
        <Row className="mt-5">
          <Col className="text-center">
            <hr />
            <p style={styles.footerText}>
              DearFab - Nghệ thuật từ những điều bình dị | Liên hệ chúng tôi để khám phá thêm!
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#f9fafc',
    paddingTop: '80px',
    paddingBottom: '60px',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#0a2f5c',
  },
  subText: {
    fontSize: '1.2rem',
    color: '#555',
    maxWidth: '600px',
    margin: 'auto',
  },
  bannerImage: {
    borderRadius: '12px',
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#0a2f5c',
    marginBottom: '15px',
  },
  description: {
    fontSize: '1rem',
    color: '#444',
    lineHeight: '1.6',
  },
  memberCard: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  memberImage: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    margin: '0 auto 15px',
    border: '4px solid #0a2f5c',
  },
  memberName: {
    fontSize: '1.1rem',
    color: '#0a2f5c',
    fontWeight: '600',
  },
  memberRole: {
    fontSize: '0.9rem',
    color: '#666',
  },
  footerText: {
    fontSize: '0.9rem',
    color: '#888',
    marginTop: '20px',
  },
};

export default AboutUsPage;
