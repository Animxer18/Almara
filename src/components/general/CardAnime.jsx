import { Card, CardContent, CardMedia, Typography } from "@suid/material";
import { mergeProps, splitProps } from "solid-js";
import { useBreakpoint } from "../../hooks";
import PopoverCustom from "./PopoverCustom";

const CardAnime = (props) => {
  const mergedProps = mergeProps({ imageSrc: "", title: "" }, props);
  const [_, others] = splitProps(mergedProps, []);
  const { xs } = useBreakpoint();

  return (
    <Card
      sx={{ width: xs() ? 150 : 250, height: xs() ? 250 : 350 }}
      {...others}
    >
      <CardMedia
        sx={{ height: xs() ? 180 : 250, cursor: "pointer" }}
        image={mergedProps?.imageSrc}
        component="img"
      />
      <CardContent>
        <PopoverCustom title={mergedProps?.title}>
          <Typography align="center" variant={xs() ? "body" : "h6"}>
            {`${mergedProps?.title?.substring(0, 24)}...`}
          </Typography>
        </PopoverCustom>
      </CardContent>
    </Card>
  );
};

export default CardAnime;
