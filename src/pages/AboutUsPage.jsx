import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { TelephoneFill, EnvelopeFill, GeoAltFill } from 'react-bootstrap-icons';
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


        {/* About Us Section 1 */}
        <Row className="mb-5 mt-5 align-items-center">
          <Col md={6}>
            <div style={styles.sectionTag}>Về chúng tôi</div>
            <h2 style={styles.sectionTitle}>Câu chuyện và lý do lựa chọn kinh doanh</h2>
            <p style={styles.description}>
              Câu chuyện của DearFab không chỉ là sáng tạo nghệ thuật, mà còn đại diện cho một sứ mệnh rộng lớn hơn trong xã hội ngày nay: bảo vệ môi trường, đồng thời hồi sinh vẻ đẹp của nghề thủ công truyền thống. Trong một thế giới đang đối mặt với những thách thức ngày càng gia tăng về môi trường, phát triển bền vững không còn là một lựa chọn mà là một nhu cầu thiết yếu. Hàng năm, hàng tấn vải vụn, vải thừa hoặc vải cũ bị thải ra môi trường. Thông qua việc sử dụng vải tái chế, chúng tôi hy vọng sẽ thổi một luồng sinh khí mới vào những thứ từng là phế thải của ngành dệt may, biến chúng thành những tác phẩm nghệ thuật ý nghĩa.
            </p>
            <Button style={styles.getStartedBtn}>
              <a style={styles.started} href="/">Home</a>
            </Button>
            <Button style={styles.freeTrialBtn}>
              <a style={styles.started2} href="/free-trial">Trải nghiệm AI</a>
            </Button>
          </Col>
          <Col md={6}>
            <Image src="/about2.jpg" alt="Team Member" style={styles.teamImage} />
          </Col>
        </Row>

        {/* Statistics */}

        <Row className="mb-5 mt-5 py-5 text-center">
          <Col md={4}>
            <h3 style={styles.stat}>100%</h3>
            <p style={styles.statText}>Khách hàng hoàn toàn hài lòng</p>
          </Col>
          <Col md={4}>
            <h3 style={styles.stat}>10+</h3>
            <p style={styles.statText}>Đổi mới và hiểu biết có giá trị</p>
          </Col>
          <Col md={4}>
            <h3 style={styles.stat}>$30m</h3>
            <p style={styles.statText}>Chiến lược tài chính hiệu quả cao</p>
          </Col>
        </Row>

        {/* About Us Section 2 */}
        <Row className="mb-5 align-items-center">
          <Col md={6}>
            <Image src="/about1.jpg" alt="Team Member" style={styles.teamImage} />
          </Col>
          <Col md={6}>
            <div style={styles.sectionTag}>Sứ Mệnh</div>
            <h2 style={styles.sectionTitle}>Sứ mệnh - Thúc đẩy thành công trong dự án.</h2>
            <p style={styles.description}>
              Dear Fabric mang đến sức sống mới cho những gì còn sót lại. Chúng tôi tái sử dụng vải tái chế và vải thừa để tạo nên những tác phẩm nghệ thuật cắt dán, giảm thiểu rác thải dệt may và truyền cảm hứng về một tư duy xanh hơn trong xã hội. Sứ mệnh của chúng tôi cũng là tạo cơ hội cho những người yêu nghệ thuật tham gia vào hành trình chữa lành này — cho vải vóc, hành tinh và tâm hồn con người.
            </p>

            <Row className="mb-5 align-items-center">
              <Col md={6}>
                <ul className="custom-list" style={styles.list}>
                  <li>Nghề ghép vải còn ít phổ biến</li>
                  <li>Tác phẩm độc đáo, chất lượng.</li>
                  <li>Cầu nối thủ công – hiện đại.</li>
                </ul>
              </Col>
              <Col md={6}>
                <ul className="custom-list" style={styles.list} >
                  <li>DearFab lan tỏa nghệ thuật này.</li>
                  <li>Nghệ thuật gần gũi, kết nối.</li>
                  <li>Mỗi tranh kể một câu chuyện.</li>
                </ul>
              </Col>
            </Row>
          </Col>

          {/* Milestones Section */}
          <div style={{ width: 'auto', padding: '0.5% 1%', backgroundColor: '#f3f4f6', borderRadius: '20px', marginTop: '40px' }}>Sứ Mệnh</div>
          <h2 className='mb-5 mt-3' style={styles.sectionTitle}>Giá trị cốt lõi của chúng tôi</h2>
          <p style={{ width: '50%', textAlign: 'start', fontSize: '20px', marginBottom: '40px' }}>
            Khám phá những giá trị cốt lõi đã định hình nên Dearfab. Đây là kim chỉ nam cho mọi hoạt động, phản ánh cam kết của chúng tôi trong việc mang đến sản phẩm nghệ thuật độc bản, giàu ý nghĩa và bền vững với xã hội.
          </p>
          <Row className="mb-5">
            <Col md={4}>
              <Card style={styles.milestoneCard}>
                <h3 style={styles.milestoneTitle}>🎨 Thẩm mỹ</h3>
                <p style={styles.milestoneText}>Mỗi bức tranh của Dearfab đều mang tính nghệ thuật cao, được tạo nên từ sự tỉ mỉ, sáng tạo và sự kết hợp tinh tế giữa màu sắc – chất liệu – cảm xúc.</p>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={styles.milestoneCard}>
                <h3 style={styles.milestoneTitle}>💖 Ý nghĩa</h3>
                <p style={styles.milestoneText}>Không chỉ là tranh, mỗi tác phẩm là một câu chuyện cá nhân. Những mảnh vải cũ được tái sinh để lưu giữ ký ức, gắn kết cảm xúc và trở thành biểu tượng cho kỷ niệm của khách hàng.</p>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={styles.milestoneCard}>
                <h3 style={styles.milestoneTitle}>🌱 Tác động xã hội</h3>
                <p style={styles.milestoneText}>Dearfab cam kết lan tỏa nghệ thuật xanh – biến vải tái chế thành tác phẩm, góp phần giảm thiểu rác thải dệt may và thúc đẩy lối sống bền vững trong cộng đồng.</p>
              </Card>
            </Col>
          </Row>

        </Row>
        <div style={styles.sectionTagCustom}>
          <p style={styles.sectionTagCus}>ĐỘI NGŨ CỦA CHÚNG TÔI</p>
        </div>
        <Row className='text-center'>
          {/* Team Section */}
          <h2 style={styles.sectionTitle}>Gặp gỡ đội ngũ chuyên gia</h2>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',paddingBottom: '20px'}}>
          <p style={styles.descriptionMember}>
            Các chuyên gia tận tâm của chúng tôi mang đến hàng thập kỷ kinh nghiệm kết hợp để mang lại kết quả xuất sắc cho những thách thức kinh doanh của bạn.
          </p>
          </div>
          <Row className="mb-5" style={{ justifyContent: 'center' }}>
            {members.map((member, idx) => (
              <Col md={2} sm={6} xs={12} key={idx}>
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
        </Row>


        {/* Breakthrough Section */}
        <Row className="mb-5 align-items-center">
          <Col md={6}>
            <div style={styles.sectionTag}>Đột Phá</div>
            <h2 style={styles.sectionTitle}>Hỗ trợ viên AI</h2>
            <p style={styles.description}>
              Chúng tôi sử dụng công nghệ AI chatbox thân thiện hỗ trợ bạn 24/7. Giải đáp mọi thắc mắc của bạn về chúng tôi. Tư vấn cho bạn về sản phẩm mà chúng tôi có.
            </p>
            <Button variant="success" style={styles.getStartedBtn}>
              <a style={styles.started} href="/login">Sử dụng ngay</a>
            </Button>
          </Col>
          <Col md={6}>
            <Image src="/robot.png" alt="AI Support" style={styles.RobotImage} />
          </Col>
        </Row>



        {/* Map Section */}
        <Row className="pb-5 pt-5">
          <Col>
            {/* Contact Info Section */}
            <div style={styles.contactInfo}>
              <div style={styles.contactCard}>
                <p style={styles.contactText}>
                  <TelephoneFill size={20} color="#fff" style={styles.icon} /> <span className='fw-bold'>(+84) 788 685</span>
                  <br />
                  Có sẵn 24/7 chờ tư vấn khẩn cấp và hỗ trợ thắc mắc
                </p>
              </div>
              <div style={styles.contactCard1}>
                <p style={styles.contactText}>
                  <EnvelopeFill size={20} color="#165dfc" style={styles.icon} />
                  <span style={{overflow: 'hidden'}} className='fw-bold'> dearfab.gp@gmail.com </span>
                  <br />
                  Gửi cho chúng tôi yêu cầu kinh doanh và chúng tôi sẽ phản hồi trong 24 giờ
                </p>
              </div>
              <div style={styles.contactCard2}>
                <p style={styles.contactText}>
                  <GeoAltFill size={20} style={styles.icon} />
                  <span className='fw-bold'>Thành Phố Hà Nội</span>
                  <br />
                   Ghé thăm văn phòng của chúng tôi để tư vấn và gặp mặt trực tiếp
                </p>
              </div>
            </div>

            {/* Map Section */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.0441224962688!2d105.79924441129133!3d20.99086838056823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acbf11cda4c3%3A0xdd0f2c83cc6a92d6!2zMTA4IMSQLiBOZ3V54buFbiBUcsOjaSwgVGhhbmggWHXDom4gQuG6r2MsIFRoYW5oIFh1w6JuLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1755317884870!5m2!1svi!2s"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              style={styles.mapImage}
            ></iframe>
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
  sectionTag: {
    backgroundColor: '#f3f4f6',
    padding: '5px 15px',
    borderRadius: '20px',
    display: 'inline-block',
    marginBottom: '10px',
    color: 'black',
  },
  sectionTagCustom: {
    padding: '5px 15px',
    borderRadius: '20px',
    display: 'flex',
    marginBottom: '10px',
    justifyContent: 'center',
    textAlign: 'center',
  },
  sectionTagCus: {
    backgroundColor: '#f3f4f6',
    padding: '5px 15px',
    borderRadius: '20px',
    marginBottom: '10px',
    textAlign: 'center',
    color: 'black',
  },
  sectionTitle: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#000',
    marginBottom: '4%',
  },
  description: {
    fontSize: '1.2rem',
    color: '#555',
    lineHeight: '1.8',
  },
  descriptionMember: {
    fontSize: '1.2rem',
    color: '#555',
    lineHeight: '1.8',
    width: '70%',
    TextAlign: 'center',
  },
  getStartedBtn: {
    marginRight: '10px',
    borderRadius: '8px',
    backgroundColor: '##048000',
  },
  freeTrialBtn: {
    borderRadius: '8px',
    borderColor: 'grey',
    backgroundColor: 'white',
    color: 'black',
  },
  started: {
    color: 'white',
    textDecoration: 'none',
  },
  started2: {
    color: 'black',
    textDecoration: 'none',
  },
  teamImage: {
    width: '100%',
    height: '600px',
    borderRadius: '10px',
  },
  RobotImage: {
    width: '80%',
    height: '400px',
    borderRadius: '10px',
    objectFit: 'contain',
  },
  stat: {
    fontSize: '2.5rem',
    color: 'black',
    fontWeight: 'bold',
  },
  statText: {
    fontSize: '1rem',
    color: '#555',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    color: '#555',
    paddingTop: '2%',
    fontSize: '1.2rem',
    lineHeight: '1.8',
  },

  milestoneCard: {
    backgroundColor: '#f9fafc',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'start',
    height: '200px',
  },
  milestoneTitle: {
    margin: 0,
    color: 'black',
    marginBottom: '30px',
  },
  milestoneText: {
    margin: 0,
    color: '#737c89',
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
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    textAlign: 'center',
    marginBottom: '20px',

  },
  memberImage: {
    width: '110%',
    height: '500px', // Adjusted to match image proportions
    borderRadius: '10px',
    objectFit: 'cover',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'block',
    margin: '0 auto',
  },
  contactInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    backgroundColor: '#e9ecef',
    padding: '10px 0',
  },
  contactCard: {
    backgroundColor: '#0fbba7', // Green for phone, adjust for others
    borderRadius: '10px',
    padding: '26px',
    width: '30%',
    textAlign: 'start',
    color: 'white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contactCard1: {
    backgroundColor: '#daeafe', // Green for phone, adjust for others
    borderRadius: '10px',
    padding: '15px',
    width: '30%',
    textAlign: 'start',
    color: 'black',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contactCard2: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '15px',
    width: '30%',
    textAlign: 'start',
    color: '#000',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: '8px',
    marginRight: '10px',
  },

  contactText: {
    margin: 0,
    fontSize: '16px',
    lineHeight: '1.4',
    width: '100%',
    textAlign: 'start',
  },
  mapImage: {
    borderRadius: '10px',
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    marginTop: '8%',
  },
};

export default AboutUsPage;