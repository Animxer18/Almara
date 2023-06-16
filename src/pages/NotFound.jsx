import { Container, Typography } from "@suid/material";
import { Col, Row } from "solid-bootstrap";
import ButtonBack from "../components/general/ButtonCustom.jsx/ButtonBack";

const NotFound = () => {
  return (
    <Container>
      <Row>
        <Col>
          <ButtonBack>Back</ButtonBack>
        </Col>
        <Col>
          <Typography>Not Found</Typography>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
