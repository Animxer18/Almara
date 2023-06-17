import { Box, Modal } from "@suid/material";
import { children, createEffect, mergeProps, on } from "solid-js";
import { splitProps } from "solid-js";
import { useBreakpoint } from "../../hooks";

export default function PreviewImage(props) {
  //   const [open, setOpen] = createSignal(false);
  const defaultProps = mergeProps({ isOpen: false }, props);

  const { xs } = useBreakpoint();

  const [local] = splitProps(defaultProps, [
    "isOpenPreview",
    "children",
    "setIsOpenPreview",
    "onClick",
  ]);

  // const handleOpen = () => setOpen(true);
  const handleClose = () => local?.setIsOpenPreview(false);

  const getChildren = children(() => props.children);

  createEffect(
    on(
      () => [local?.isOpenPreview],
      () => {
        if (local?.isOpenPreview) {
          getChildren().setAttribute("width", 350);
        }
      }
    )
  );
  return (
    <div onClick={local?.onClick}>
      {/* <Button onClick={handleOpen} variant="outlined">
          {local?.btnText}
        </Button> */}
      {local?.children}
      <Modal
        open={local?.isOpenPreview}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%,-50%)`,
            // width: xs() ? 350 : 500,
            boxShadow: "24px",
            textAlign: "center",
          }}
        >
          {getChildren()}
        </Box>
      </Modal>
    </div>
  );
}
