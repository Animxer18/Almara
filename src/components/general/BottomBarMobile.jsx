import {
  AppBar,
  Box,
  Fab,
  IconButton,
  styled,
  Toolbar,
  Button,
} from "@suid/material";
import HomeIcon from "@suid/icons-material/Home";
import ArrowBackIcon from "@suid/icons-material/ArrowBack";
import ArrowForwardIcon from "@suid/icons-material/ArrowForward";
import { useNavigate } from "@solidjs/router";
import { mergeProps, Show, splitProps } from "solid-js";
import RefreshIcon from "@suid/icons-material/Refresh";

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
  const defaultProps = mergeProps({ showPrev: false, showNext: false }, props);
  const [local] = splitProps(defaultProps, [
    "data",
    "currPage",
    "setCurrPage",
    "showPrev",
    "showNext",
    "onClickPrev",
    "onClickNext",
    "onClickRefresh",
  ]);

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        top: "auto",
        bottom: 0,
        boxShadow: "3px -20px 31px -12px rgba(224,233,255,1);",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => {
            if (local?.onClickRefresh) {
              local?.onClickRefresh();
            }
          }}
        >
          <RefreshIcon />
        </IconButton>
        <StyledFab
          size="large"
          color="primary"
          aria-label="add"
          onClick={() => navigate("/")}
        >
          <HomeIcon />
        </StyledFab>
        <Box sx={{ flexGrow: 1 }} />

        <Show when={local?.showPrev} fallback={<></>}>
          <IconButton
            disabled={Number(local?.data?.currentPage) === 1}
            color="inherit"
            onClick={() => {
              if (local?.onClickPrev) {
                local?.onClickPrev();
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Show>
        <Show when={local?.showNext} fallback={<></>}>
          <IconButton
            color="inherit"
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
  );
};

export default BottomBarMobile;
