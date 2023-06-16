import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Typography,
} from "@suid/material";
import { For, mergeProps } from "solid-js";
import { createSignal, splitProps } from "solid-js";
import { pascalCase } from "../../helpers";
import WrapperFetch from "../general/WrapperFetch";

export default function BasicModal(props) {
  const [open, setOpen] = createSignal(false);
  const defaultProps = mergeProps(
    { btnText: "Select Quality", qualityDatas: [] },
    props
  );
  const [local] = splitProps(defaultProps, [
    "btnText",
    "title",
    "qualityDatas",
    "changeQualityHandler",
  ]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        {local?.btnText}
      </Button>
      <Modal
        open={open()}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            width: 500,
            boxShadow: "24px",
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {local?.title}
          </Typography>
          <WrapperFetch datas={local?.qualityDatas}>
            <List id="modal-modal-description">
              <For each={local?.qualityDatas} fallback={<></>}>
                {(data) => {
                  return (
                    <ListItem
                      disablePadding
                      onClick={(e) => {
                        local?.changeQualityHandler(e?.target?.innerText);
                        handleClose();
                      }}
                    >
                      <ListItemButton>
                        <ListItemText primary={pascalCase(data?.quality)} />
                      </ListItemButton>
                    </ListItem>
                  );
                }}
              </For>
            </List>
          </WrapperFetch>
        </Box>
      </Modal>
    </div>
  );
}
