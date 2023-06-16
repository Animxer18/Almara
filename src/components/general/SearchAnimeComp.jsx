import { useNavigate } from "@solidjs/router";
import { TextField } from "@suid/material";
import { createSignal } from "solid-js";

const SearchAnimeComp = () => {
  const [searchAnime, setSearchAnime] = createSignal("");
  const navigate = useNavigate();

  return (
    <div style={{ margin: "20px 0" }}>
      <TextField
        onKeyPress={(e) => {
          if (e?.code === "Enter" || e?.key === "Enter") {
            if (searchAnime()?.trim() !== "") {
              navigate(`/search/${searchAnime()?.trim()}?page=1`);
            } else {
              navigate(`/`);
            }
          }
        }}
        value={searchAnime()}
        id="outlined-basic"
        label="Search Anime"
        variant="outlined"
        type="search"
        onChange={(e) => {
          setSearchAnime(e?.target?.value);
        }}
        fullWidth
      />
    </div>
  );
};
export default SearchAnimeComp;
