import { Button, Typography } from "@suid/material";
import { Col, Image, Row } from "solid-bootstrap";
import { createSignal, mergeProps, Show, splitProps } from "solid-js";
import BottomBarMobile from "../components/general/BottomBarMobile";
import ButtonBack from "../components/general/ButtonCustom.jsx/ButtonBack";
import { useBreakpoint } from "../hooks";
import bea from "../assets/bea.gif";
import { useNavigate } from "@solidjs/router";

const NotFound = (props) => {
  const [local] = splitProps(props, ["children"]);
  const { xs } = useBreakpoint();
  const navigate = useNavigate();
  const [flip, setFlip] = createSignal(false);

  setInterval(() => setFlip(!flip()), 1500);

  return (
    <>
      <Row style={{ "text-align": "center" }}>
        <Show when={!xs()} fallback={<></>}>
          <Col>
            <ButtonBack>Back</ButtonBack>
          </Col>
        </Show>
        <Row>
          <Col xs={12}>
            <Image
              src={bea}
              rounded
              width={xs() ? 350 : 400}
              style={{
                margin: "auto",
                transform: `rotateY(${flip() ? "180deg" : "0deg"})`,
              }}
            />
          </Col>
          <Col xs={12}>
            <Typography
              variant={xs() ? "h6" : "h3"}
              sx={{
                fontWeight: "bold",
              }}
            >
              {local?.children ?? "Page not found"}
            </Typography>
          </Col>
        </Row>
        <Show when={!xs()} fallback={<></>}>
          <Row>
            <Col style={{ width: "100%" }}>
              <Button variant="contained" onClick={() => navigate("/?page=1")}>
                Back to Home
              </Button>
            </Col>
          </Row>
        </Show>
      </Row>
      <BottomBarMobile />
    </>
  );
};

export default NotFound;
