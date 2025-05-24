import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 reveal">
      <Container>
        <Row>
          <Col>
            <p>&copy; 2025 Recycled Shop. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;