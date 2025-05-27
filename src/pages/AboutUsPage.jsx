import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import AboutUsSection from '../components/about/aboutSection';

function AboutUsPage() {
  return (
    <div style={styles.pageWrapper}>
      <Container className="py-5">
        {/* Navigation and Title */}
        <Row className="mb-4 ">
          <Col>
           
            <h1 style={styles.title}>DearFab Là ai?</h1>
          </Col>
        </Row>
        <AboutUsSection/>

        {/* Header Image */}
        <Row className="mb-5 ">
          <Col>
            <Image
              src="https://www.sunbrella.com/media/wysiwyg/all-fabrics-sunbrella-upholstery-hero.jpg" // Placeholder camera image
              alt="Header Image"
              fluid
              style={styles.headerImage}
            />
          </Col>
        </Row>
        {/* Creative Directors */}
        <Row className="mb-5 d-flex justify-content-between">
        <Col md={3}>
            <Card style={styles.sidebarCard}>
              <Card.Body>
                <Card.Title style={styles.sidebarTitle}>DearFab</Card.Title>
                <Card.Text style={styles.sidebarText}>
                Chúng tôi biến những mảnh vải tái chế thành những bức tranh ghép vải đầy màu sắc và độc đáo
                </Card.Text>
                <Button style={styles.hireButton}>Liên Hệ Ngay</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <div style={styles.teamMemberWrapper}>
              <Image
                src="https://i.ibb.co/G4T7P4Kc/TNQA.jpg" 
                alt="Leader"
                fluid
                style={styles.teamImage}
              />
              <Card style={styles.teamCard}>
                <Card.Body>
                  <Card.Text style={styles.teamName}>Trần Ngọc Quỳnh Anh</Card.Text>
                  <Card.Text style={styles.teamRole}>Leader - HS170783</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          
          <Col md={5}>
            <Card style={styles.infoCard}>
              <Card.Body>
                <Card.Title style={styles.infoTitle}> Leader DearFab</Card.Title>
                <Card.Text style={styles.infoText}>
                  At Dear Fabric, our creative directors lead with a passion for sustainability and artistry. They guide our team in transforming recycled fabric scraps into stunning patchwork art, ensuring every piece tells a story of renewal and creativity.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Designers and Cinematographers/Photographers */}
        <Row className="mb-5">
        
          <Col md={12}>
            <div style={styles.hashtags}>
              <span>#thànhviên</span>
            </div>
            <Row className="g-4">
              <Col md={3}>
                <div style={styles.teamMemberWrapper}>
                  <Image
                    src="https://i.ibb.co/5XG1ZqtH/LMT.jpg" // Placeholder for Designer 1
                    alt="Designer 1"
                    fluid
                    style={styles.teamImage}
                  />
                  <Card style={styles.teamCard}>
                    <Card.Body>
                      <Card.Text style={styles.teamName}>Lê Minh Thư
                      </Card.Text>
                      <Card.Text style={styles.teamRole}>Thành Viên - HE170538</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
              <Col md={3}>
                <div style={styles.teamMemberWrapper}>
                  <Image
                    src="https://i.ibb.co/jZjrvKXK/NTB.jpg" 
                    alt="Designer 2"
                    fluid
                    style={styles.teamImage}
                  />
                  <Card style={styles.teamCard}>
                    <Card.Body>
                      <Card.Text style={styles.teamName}>Nguyễn Tất Bách
                      </Card.Text>
                      <Card.Text style={styles.teamRole}>Thành Viên - HE171235</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
              <Col md={3}>
                <div style={styles.teamMemberWrapper}>
                  <Image
                    src="https://i.ibb.co/qMWVM7XH/NTNT.jpg" // Placeholder for Artist 1
                    alt="Artist 1"
                    fluid
                    style={styles.teamImage}
                  />
                  <Card style={styles.teamCard}>
                    <Card.Body>
                      <Card.Text style={styles.teamName}>Nguyễn Thị Ngọc Thuý
                      </Card.Text>
                      <Card.Text style={styles.teamRole}>Thành Viên - HS163220</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
              <Col md={3}>
                <div style={styles.teamMemberWrapper}>
                  <Image
                    src="https://i.ibb.co/fzbkTBVB/DHM.jpg" // Placeholder for Creator 1
                    alt="Creator 1"
                    fluid
                    style={styles.teamImage}
                  />
                  <Card style={styles.teamCard}>
                    <Card.Body>
                      <Card.Text style={styles.teamName}>Đỗ Huệ Minh</Card.Text>
                      <Card.Text style={styles.teamRole}>Thành Viên - HS170098</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mb-5 ">
          <Col>
            <Image
              src="https://cdn.pixabay.com/photo/2019/02/26/19/03/flat-lay-4022714_1280.jpg" // Placeholder camera image
              alt="Header Image"
              fluid
              style={styles.footerImg}
            />
          </Col>
        </Row>
        {/* Footer Logos */}
        <Row className="mt-5">
          <Col className="text-center">
            <div style={styles.footerLogos}>
              <span>DEAR FABRIC</span>
              <span>ECO ART</span>
              <span>SUSTAINABLE</span>
              <span>CREATIVITY</span>
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
  breadcrumb: {
    color: '#6c757d',
    fontSize: '0.9rem',
    fontWeight: '500',
    letterSpacing: '1px',
    marginBottom: '15px',
  },
  title: {
    color: '#008101',
    fontSize: '4.5rem',
    fontWeight: '900',
    textTransform: 'uppercase',
    lineHeight: '1',
    marginBottom: '30px',
  },
  headerImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  footerImg: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  teamMemberWrapper: {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 25px rgba(0,0,0,0.15)',
    },
  },
  teamImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    marginBottom: '0',
  },
  teamCard: {
    background: '#fff',
    border: 'none',
    borderRadius: '0 0 10px 10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
    padding: '15px',
    transition: 'box-shadow 0.3s ease',
  },
  teamName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#333',
    marginBottom: '5px',
  },
  teamRole: {
    fontSize: '0.95rem',
    color: '#6c757d',
    fontStyle: 'italic',
  },
  infoCard: {
    background: '#fff',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    padding: '25px',
    height: '100%',
  },
  infoTitle: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#333',
    marginBottom: '15px',
  },
  infoText: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '15px',
  },
  awardsList: {
    listStyle: 'none',
    padding: '0',
    color: '#007bff',
    fontSize: '0.95rem',
    fontWeight: '500',
  },
  hashtags: {
    display: 'flex',
    gap: '15px',
    color: '#333',
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '25px',
  },
  sidebarCard: {
    // background: 'linear-gradient(135deg, #008101 0%,rgb(6, 78, 6) 100%)',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    color: '#008101',
    padding: '30px',
    height: '100%',
  },
  sidebarTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    marginBottom: '15px',
  },
  sidebarText: {
    fontSize: '1rem',
    marginBottom: '25px',
    lineHeight: '1.6',
  },
  hireButton: {
    backgroundColor: '#008101',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontWeight: '600',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3',
      color: '#fff',
    },
  },
  footerLogos: {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px',
    color: '#6c757d',
    fontSize: '1.1rem',
    fontWeight: '600',
    padding: '20px 0',
  },
};

export default AboutUsPage;