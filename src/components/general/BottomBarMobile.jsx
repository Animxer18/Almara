import { AppBar, Box, Fab, IconButton, styled, Toolbar } from "@suid/material";
import HomeIcon from "@suid/icons-material/Home";
import ArrowBackIcon from "@suid/icons-material/ArrowBack";
import ArrowForwardIcon from "@suid/icons-material/ArrowForward";
import { useLocation, useNavigate } from "@solidjs/router";
import { mergeProps, Show, splitProps } from "solid-js";
import RefreshIcon from "@suid/icons-material/Refresh";
import { useBreakpoint } from "../../hooks";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const BottomBarMobile = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { xs } = useBreakpoint();
  const defaultProps = mergeProps(
    { showPrev: false, showNext: false, showRefresh: false },
    props
  );
  const [local] = splitProps(defaultProps, [
    "data",
    "currPage",
    "setCurrPage",
    "showPrev",
    "showNext",
    "showRefresh",
    "onClickPrev",
    "onClickNext",
    "onClickRefresh",
  ]);

  return (
    <Show when={xs()} fallback={<></>}>
      <AppBar
        position="fixed"
        // color="default"
        sx={{
          top: "auto",
          bottom: 0,
          bgcolor: "white",
          boxShadow: "3px -20px 31px -12px rgba(224,233,255,1);",
        }}
      >
        <Toolbar>
          <Show when={local?.showRefresh} fallback={<></>}>
            <IconButton
              sx={{
                color: "#4f4f4f",
              }}
              onClick={() => {
                if (local?.onClickRefresh) {
                  local?.onClickRefresh();
                }
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Show>
          <StyledFab
            size="large"
            color="primary"
            aria-label="add"
            onClick={() => {
              if (local?.onClickHome) {
                local?.onClickHome();
              } else {
                navigate("/?page=1");
              }
            }}
          >
            <HomeIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />

          <Show when={local?.showPrev} fallback={<></>}>
            <IconButton
              disabled={Number(local?.data?.currentPage) === 1}
              sx={{
                color: "#4f4f4f",
                marginRight: 3,
              }}
              onClick={() => {
                if (local?.onClickPrev) {
                  local?.onClickPrev();
                } else {
                  navigate(-1);
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Show>
          <Show when={local?.showNext} fallback={<></>}>
            <IconButton
              sx={{
                color: "#4f4f4f",
              }}
              onClick={() => {
                if (local?.onClickNext) {
                  local?.onClickNext();
                }
              }}
              disabled={!local?.data?.hasNextPage}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Show>
        </Toolbar>
      </AppBar>
    </Show>
  );
};

export default BottomBarMobile;
