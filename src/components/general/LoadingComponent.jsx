import { Typography, Container } from "@suid/material";
import { Col, Image, Row } from "solid-bootstrap";
import Stack from "@suid/material/Stack";
import kuru from "../../assets/kuru.gif";
import ButtonBack from "./ButtonCustom.jsx/ButtonBack";
import { useLocation, useNavigate } from "@solidjs/router";
import { For, mergeProps, Show, splitProps } from "solid-js";
import { useBreakpoint } from "../../hooks";
import BottomBarMobile from "./BottomBarMobile";

const LoadingComponent = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { xs } = useBreakpoint();

  const mergedProps = mergeProps({ extraButton: [] }, props);
  const [local] = splitProps(mergedProps, ["extraButton", "childrenError"]);

  return (
    <>
      <Row style={{ "text-align": "center" }}>
        <Show
          when={
            !xs() &&
            (location?.pathname !== "/" || location?.search !== "?page=1")
          }
          fallback={<></>}
        >
          <Col>
            <ButtonBack onClick={() => navigate(-1)}>Back</ButtonBack>
          </Col>
        </Show>

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
            <Image
              src={kuru}
              rounded
              width={xs() ? 350 : 400}
              style={{ margin: "auto" }}
            />
            <Typography
              variant={xs() ? "h6" : "h3"}
              sx={{ fontWeight: "bold" }}
            >
              Loading...
            </Typography>
          </Stack>
        </Col>
      </Row>
      <BottomBarMobile showPrev />
    </>
  );
};

export default LoadingComponent;
