import { useParams } from "@solidjs/router";
import { Typography, Container } from "@suid/material";
import ListAnime from "../components/general/ListAnime";
import ButtonBack from "../components/general/ButtonCustom.jsx/ButtonBack";
import { useBreakpoint } from "../hooks";
import { Show } from "solid-js";

const SearchAnime = () => {
  const params = useParams();
  const { xs } = useBreakpoint();

  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Search : {decodeURIComponent(params?.search)}
      </Typography>
      <Show when={!xs()} fallback={<></>}>
        <ButtonBack>Back to Home</ButtonBack>
      </Show>
      <ListAnime
        url={`https://animexer1-api.vercel.app/anime/gogoanime/${params?.search}`}
        deps={[params?.search]}
      />
      <Show when={!xs()} fallback={<></>}>
        <ButtonBack>Back to Home</ButtonBack>
      </Show>
    </>
  );
};

export default SearchAnime;
