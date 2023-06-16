import { Typography, Container } from "@suid/material";

import { Col, Image, Row } from "solid-bootstrap";
import Stack from "@suid/material/Stack";
import kuru from "../../assets/kuru.gif";
import ButtonBack from "./ButtonCustom.jsx/ButtonBack";
import { useNavigate } from "@solidjs/router";
import { For, mergeProps, Show, splitProps } from "solid-js";
import ButtonRefresh from "./ButtonCustom.jsx/ButtonRefresh";

const LoadingComponent = (props) => {
  const navigate = useNavigate();
  const mergedProps = mergeProps({ extraButton: [] }, props);
  const [local] = splitProps(mergedProps, ["extraButton"]);

  return (
    <Container>
      <Row style={{ "text-align": "center" }}>
        <Col>
          <ButtonBack onClick={() => navigate(-1)}>Back</ButtonBack>
        </Col>

        <Show when={local?.extraButton?.length} fallback={<></>}>
          <Col>
            <For each={local?.extraButton} fallback={<></>}>
              {(dataExtraBtn) => {
                return { dataExtraBtn };
              }}
            </For>
          </Col>
        </Show>
      </Row>
      <Row style={{ "justify-content": "center" }}>
        <Col style={{ width: "100%", "text-align": "center" }}>
          <Stack
            spacing={2}
            direction="column"
            sx={{ justifyContent: "center", display: "flex" }}
          >
            <Image src={kuru} rounded width={400} style={{ margin: "auto" }} />
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Mohon Tunggu...
            </Typography>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default LoadingComponent;
