import { Button } from "@suid/material";
import RefreshIcon from "@suid/icons-material/Refresh";

const ButtonRefresh = (props) => {
  return (
    <Button variant="outlined" startIcon={<RefreshIcon />} {...props}>
      Refresh
    </Button>
  );
};

export default ButtonRefresh;
