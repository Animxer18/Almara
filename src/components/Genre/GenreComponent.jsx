import { Box, Typography } from "@suid/material";
import { mergeProps, Show, splitProps } from "solid-js";
import ChipGenre from "./ChipGenre";

export default function GenreComponent(props) {
  const defaultProps = mergeProps({ arrGenres: [] }, props);
  const [local] = splitProps(defaultProps, [
    "arrGenres",
    "setArrGenres",
    "arrSelectedGenres",
    "setArrSelectedGenres",
  ]);

  return (
    <Box
      sx={{
        backgroundColor: "#f8f8f8",
        p: 2,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <Typography variant="body" sx={{ fontWeight: "bold" }}>
        Genres :
      </Typography>
      <ChipGenre
        dataGenres={local?.arrGenres}
        onSelectGenre={(dataGenre) => {
          local?.setArrSelectedGenres(
            [...new Set([...local.arrSelectedGenres, dataGenre])]?.sort()
          );
        }}
        arrSelectedGenres={local?.arrSelectedGenres}
        setArrSelectedGenres={local?.setArrSelectedGenres}
      />

      <Show when={local?.arrSelectedGenres?.length} fallback={<></>}>
        <Typography variant="body" sx={{ fontWeight: "bold" }}>
          Selected Genres :
        </Typography>
        <ChipGenre
          dataGenres={local?.arrSelectedGenres}
          onDelete={(data) => {
            local?.setArrSelectedGenres(
              local?.arrSelectedGenres?.filter(
                (dataSelected) => dataSelected !== data
              )
            );
            local?.setArrGenres(
              [...new Set([...local.arrGenres, data])]?.sort()
            );
          }}
          setArrSelectedGenres={local?.setArrSelectedGenres}
          arrSelectedGenres={local?.arrSelectedGenres}
          isSelectedGenres={true}
        />
      </Show>
    </Box>
  );
}
