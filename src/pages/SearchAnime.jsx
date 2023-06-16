import { useParams } from "@solidjs/router";
import { Typography, Container } from "@suid/material";
import ListAnime from "../components/general/ListAnime";
import ButtonBack from "../components/general/ButtonCustom.jsx/ButtonBack";

const SearchAnime = () => {
  const params = useParams();
  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Search : {decodeURIComponent(params?.search)}
      </Typography>
      <ButtonBack>Back to Home</ButtonBack>
      <ListAnime
        url={`https://api.consumet.org/anime/gogoanime/${params?.search}`}
        deps={[params?.search]}
      />
      <ButtonBack>Back to Home</ButtonBack>
    </>
  );
};

export default SearchAnime;
