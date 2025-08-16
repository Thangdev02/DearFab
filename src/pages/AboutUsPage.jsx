import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import AboutUsSection from '../components/about/aboutSection';

const AboutUsPage = () => {
  const members = [
    {
      nameMember: 'Trần Ngọc Quỳnh Anh',
      imageMember: 'https://iili.io/FboAG5u.png',
      roleMember: 'Nhóm trưởng'
    },
    {
      nameMember: 'Lê Minh Thư',
      imageMember: 'https://iili.io/FboRt6B.png',
      roleMember: 'Thành viên'
    },
    {
      nameMember: 'Nguyễn Tất Bách',
      imageMember: 'https://iili.io/FboAnfI.png',
      roleMember: 'Thành viên'
    },
    {
      nameMember: 'Nguyễn Thị Ngọc Thuý',
      imageMember: 'https://iili.io/FboohW7.png',
      roleMember: 'Thành viên'
    },
    {
      nameMember: 'Đỗ Minh Huệ',
      imageMember: 'https://iili.io/FboTpvs.png',
      roleMember: 'Thành viên'
    },
  ];

  return (
    <div style={styles.wrapper}>
      <Container>
        {/* Header */}
      
        <AboutUsSection />
        <Row className="mb-4 text-center">
          <Col>
            <Image src="/dearFabLogo.png" alt="DearFab Logo" style={styles.logo} />
          </Col>
        </Row>
        <div style={styles.sectionTag}>Thống Kê</div>
        <h2 style={styles.sectionTitle}>Những con số của chúng tôi.</h2>
        <Row className="mb-5 text-center">
          <Col md={4}><h3 style={styles.stat}>30+</h3><p style={styles.statText}>Hơn 30 sản phẩm</p></Col>
          <Col md={4}><h3 style={styles.stat}>1+</h3><p style={styles.statText}>Năm Kinh Nghiệm</p></Col>
          <Col md={4}><h3 style={styles.stat}>100m+</h3><p style={styles.statText}>Chất lượng doanh thu</p></Col>
        </Row>

        <Row className="mb-5">
          {members.map((member, idx) => (
            <Col md={4} sm={6} xs={12} key={idx}>
              <Card style={styles.memberCard}>
                <Image
                  src={member.imageMember}
                  alt={member.nameMember}
                  style={styles.memberImage}
                />

              </Card>
            </Col>
          ))}
        </Row>
        {/* About Us Section 1 */}
        <Row className="mb-5">
          <div style={styles.sectionTag}>Đột Phá</div>
          <Col md={6}>
            <h2 style={styles.sectionTitle}>Hỗ trợ viên AI</h2>
            <p style={styles.description}>
              Chúng tôi sử dụng công nghệ AI chatbox thân thiện hỗ trợ bạn 24/7.
              <br />
              Giải đáp mọi thắc mắc của bạn về chúng tôi.
              <br />
              Tư vấn cho bạn về sản phẩm mà chúng tôi có
            </p>
            <Button variant="primary" style={styles.getStartedBtn}>
              <a style={styles.started} href='/login'>Sử dụng ngay</a></Button>
          </Col>
          <Col md={6}>
            <Image src="/robot.png" alt="Team Member" style={styles.teamImage} />
          </Col>
        </Row>

        {/* Stats */}

        {/* About Us Section 2 */}
        <Row className="mb-5">
          <Col md={12}>
            <div style={styles.sectionTag}>Đội Ngũ</div>
            <h2 style={styles.sectionTitle}>Tham Gia Ngay với đội ngũ chúng tôi.</h2>
            <p style={styles.description}>
              Với đội ngũ GenZ luôn tràn đầy năng lượng và sáng tạo, năng lượng trẻ giúp chúng tôi tạo nên 1 DearFab
            </p>

          </Col>
        </Row>




        {/* Map Section */}
        <Row className="mb-5">
          <Col>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.0441224962688!2d105.79924441129133!3d20.99086838056823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acbf11cda4c3%3A0xdd0f2c83cc6a92d6!2zMTA4IMSQLiBOZ3V54buFbiBUcsOjaSwgVGhhbmggWHXDom4gQuG6r2MsIFRoYW5oIFh1w6JuLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1755317884870!5m2!1svi!2s" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style={styles.mapImage}></iframe>
            <div style={styles.mapInfo}>
              <p style={styles.mapText}>+0877.888.036</p>
              <p style={styles.mapText}>mailto:influence.id</p>
              <p style={styles.mapText}>108 Đường Nguyễn Trãi, Khu tập thể Thanh Xuân Bắc, Thanh Xuân Bắc, Thanh Xuân, Hà Nội
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#e9ecef',
    paddingTop: '80px',
    paddingBottom: '60px',
  },
  logo: {
    width: '20%',
    paddingTop: '2rem',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    alignItems: 'center',
  },
  navLink: {
    color: '#000',
    textDecoration: 'none',
    margin: '0 10px',
  },
  signUp: {
    marginLeft: '20px',
    borderRadius: '20px',
  },
  getStarted: {
    marginLeft: '10px',
    borderRadius: '20px',
  },
  sectionTag: {
    backgroundColor: '#e9ecef',
    padding: '5px 15px',
    borderRadius: '20px',
    display: 'inline-block',
    marginBottom: '10px',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#000',
  },
  description: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.6',
  },
  getStartedBtn: {
    marginRight: '10px',
    borderRadius: '20px',
    backgroundColor: '#28a745',
  },
  started: {
    color: 'white',
    textDecoration: 'none',
  },
  freeTrialBtn: {
    borderRadius: '20px',
  },
  teamImage: {
    width: '50%',
    height: 'auto',
    borderRadius: '10px',
    marginTop: '-50px',
  },
  stat: {
    fontSize: '2.5rem',
    color: '#28a745',
  },
  statText: {
    fontSize: '1rem',
    color: '#555',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    color: '#555',
  },
  milestoneCard: {
    backgroundColor: '#e9ecef',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
  },
  milestoneText: {
    margin: 0,
    color: '#000',
  },
  mapImage: {
    borderRadius: '10px',
    width: '100%',
    height: '400px',
    objectFit: 'cover',
  },
  mapInfo: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10px',
  },
  mapText: {
    margin: 0,
    color: '#555',
  },
  memberCard: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    textAlign: 'center',
    marginBottom: '20px',
  },
  memberImage: {
    width: '100%',
    height: '600px',
    borderRadius: '10px', // Creates an oval shape
    objectFit: 'cover',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'block',
    margin: '0 auto',
  },

};

export default AboutUsPage;