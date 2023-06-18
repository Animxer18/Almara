import { useNavigate } from "@solidjs/router";
import { TextField } from "@suid/material";
import { Col, Image, Row } from "solid-bootstrap";
import { createSignal } from "solid-js";
import logo from "../../assets/logo-no-background.png";
import { useBreakpoint } from "../../hooks";

const SearchAnimeComp = () => {
  const [searchAnime, setSearchAnime] = createSignal("");
  const navigate = useNavigate();
  const { xs } = useBreakpoint();

  return (
    <Row
      style={{
        margin: "20px 0",
        "align-items": "center",
        "justify-content": "center",
      }}
    >
      <Col
        xs={xs() ? 2 : 1}
        onClick={() => navigate("/?page=1")}
        style={{ cursor: "pointer" }}
      >
        <Image src={logo} width={xs() ? 30 : 40} />
      </Col>
      <Col>
        <TextField
          onKeyPress={(e) => {
            if (e?.code === "Enter" || e?.key === "Enter") {
              if (searchAnime()?.trim() !== "") {
                navigate(`/search/${searchAnime()?.trim()}/?page=1`);
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
      </Col>
    </Row>
  );
};
export default SearchAnimeComp;
