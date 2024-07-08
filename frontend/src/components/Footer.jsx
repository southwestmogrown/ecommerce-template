import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <div>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Big Feat Development 2024
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
