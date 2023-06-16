import { useNavigate } from "@solidjs/router";
import { Button } from "@suid/material";
import { splitProps } from "solid-js";
import ArrowBackIcon from "@suid/icons-material/ArrowBack";

const ButtonBack = (props) => {
  const [local, defaultProps] = splitProps(props, ["children"]);
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      onClick={() => navigate("/")}
      sx={{ margin: "10px 0" }}
      startIcon={<ArrowBackIcon />}
      {...defaultProps}
    >
      {local?.children}
    </Button>
  );
};
export default ButtonBack;
