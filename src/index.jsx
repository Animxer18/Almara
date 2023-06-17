/* @refresh reload */
import { render } from "solid-js/web";
import { ErrorBoundary } from "solid-js";
import { Router } from "@solidjs/router";
import Routing from "./Routing";
import SearchAnimeComp from "./components/general/SearchAnimeComp";
import { Button, Container, Stack, Typography } from "@suid/material";
import BocchiError from "./assets/bocchiError.gif";
import { Col, Image, Row } from "solid-bootstrap";
import { useBreakpoint } from "./hooks";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?"
  );
}

const { xs } = useBreakpoint();

render(
  () => (
    <ErrorBoundary
      fallback={(err, reset) => (
        <Container>
          <Row style={{ "justify-content": "center" }}>
            <Col style={{ width: "100%", "text-align": "center" }}>
              <Stack
                spacing={2}
                direction="column"
                sx={{ justifyContent: "center", display: "flex" }}
              >
                <Image
                  src={BocchiError}
                  rounded
                  width={xs() ? 350 : 400}
                  style={{ margin: "auto" }}
                />
                <Typography
                  variant={xs() ? "h6" : "h3"}
                  sx={{ fontWeight: "bold" }}
                >
                  {console.log(err)}
                  Error : {err}
                </Typography>
                <Button variant="contained" onClick={reset}>
                  Refresh
                </Button>
              </Stack>
            </Col>
          </Row>
        </Container>
      )}
    >
      <Router>
        <Container>
          <SearchAnimeComp />
        </Container>
        <Routing />
      </Router>
    </ErrorBoundary>
  ),
  root
);
