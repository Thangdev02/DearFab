import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function AboutUsSection() {
  const handleNavClick = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={styles.sectionWrapper}>
      <Container className="py-5">
        <Row>
          {/* Sidebar */}
          <Col md={2} style={styles.sidebar}>
            <ul style={styles.navList}>
              <li style={styles.navItem} onClick={() => handleNavClick('gioi-thieu')}>Giới thiệu.</li>
              <li style={styles.navItem} onClick={() => handleNavClick('su-menh')}>Sứ mệnh.</li>
              <li style={styles.navItem} onClick={() => handleNavClick('tham-gia')}>Tham gia cùng chúng tôi.</li>
            </ul>
          </Col>

          {/* Main Content */}
          <Col md={10}>
            <h1 style={styles.title}>VỀ CHÚNG TÔI.</h1>

            {/* Giới thiệu Section */}
            <div id="gioi-thieu">
              <Card style={styles.contentCard}>
                <Card.Body>
                  <Card.Text style={styles.contentText}>
                    Dear Fabric! là một nỗ lực sáng tạo ra đời từ niềm đam mê về sự bền vững và biểu đạt nghệ thuật. Chúng tôi biến những mảnh vải tái chế thành những bức tranh ghép vải đầy màu sắc và độc đáo, thổi hồn mới vào những vật liệu có thể bị bỏ đi. Mỗi tác phẩm kể một câu chuyện, đan xen các kết cấu, màu sắc và hoa văn để tạo ra nghệ thuật ý nghĩa, vừa tôn vinh sự sáng tạo vừa nâng cao ý thức bảo vệ môi trường.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            {/* Sứ mệnh Section */}
            <div id="su-menh" style={styles.sectionSpacing}>
              <Card style={styles.contentCard}>
                <Card.Body>
                  <Card.Text style={styles.contentText}>
                  Sứ mệnh
                  Dear Fabric mang đến sức sống mới cho những gì còn sót lại. Chúng tôi tái sử dụng vải tái chế và vải thừa để tạo nên những tác phẩm nghệ thuật cắt dán, giảm thiểu rác thải dệt may và truyền cảm hứng về một tư duy xanh hơn trong xã hội. Sứ mệnh của chúng tôi cũng là tạo cơ hội cho những người yêu nghệ thuật tham gia vào hành trình chữa lành này — cho vải vóc, hành tinh và tâm hồn con người.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            {/* Tham gia cùng chúng tôi Section */}
            <div id="tham-gia" style={styles.sectionSpacing}>
              <Card style={styles.contentCard}>
                <Card.Body>
                  <Card.Text style={styles.contentText}>
                    Hãy tham gia cùng chúng tôi trong việc tôn vinh nghệ thuật của những cơ hội thứ hai, nơi sự sáng tạo gặp gỡ sự bền vững! Cùng nhau, chúng ta có thể tạo ra những tác phẩm nghệ thuật có ý nghĩa và góp phần bảo vệ môi trường.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const styles = {
  sectionWrapper: {
    minHeight: '100vh',
    paddingTop: '80px',
  },
  sidebar: {
    paddingRight: '30px',
    borderRight: '1px solid #e9ecef',
    position: 'sticky',
    top: '80px',
    alignSelf: 'flex-start',
  },
  navList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  navItem: {
    fontSize: '1rem',
    color: '#333',
    fontWeight: '500',
    marginBottom: '15px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#007bff',
    },
  },
  title: {
    color: '#000',
    fontSize: '4rem',
    fontWeight: '900',
    textTransform: 'uppercase',
    marginBottom: '40px',
    lineHeight: '1',
  },
  contentCard: {
    background: 'none',
    border: 'none',
    padding: '0',
    boxShadow: 'none',
  },
  contentText: {
    fontSize: '1.1rem',
    color: '#555',
    lineHeight: '1.8',
    maxWidth: '800px',
  },
  sectionSpacing: {
  },
};

export default AboutUsSection;