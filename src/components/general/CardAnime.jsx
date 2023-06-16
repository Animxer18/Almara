import { Card, CardContent, CardMedia, Typography } from "@suid/material";
import { mergeProps, splitProps } from "solid-js";
import PopoverCustom from "./PopoverCustom";

const CardAnime = (props) => {
  const mergedProps = mergeProps({ imageSrc: "", title: "" }, props);
  const [_, others] = splitProps(mergedProps, []);
  return (
    <Card sx={{ width: 250, height: 350 }} {...others}>
      <CardMedia
        sx={{ height: 250, cursor: "pointer" }}
        image={mergedProps?.imageSrc}
        component="img"
      />
      <CardContent>
        <PopoverCustom title={mergedProps?.title}>
          <Typography align="center" variant="h6">
            {`${mergedProps?.title?.substring(0, 24)}...`}
          </Typography>
        </PopoverCustom>
      </CardContent>
    </Card>
  );
};

export default CardAnime;
