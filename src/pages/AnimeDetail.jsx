import { useNavigate, useParams } from "@solidjs/router";
import { Chip, Grid, Typography } from "@suid/material";
import { Col, Image, Row } from "solid-bootstrap";
import { createResource, For } from "solid-js";
import AnimeDetailAnimeInfo from "../components/AnimeDetail/AnimeDetailAnimeInfo";
import ButtonBack from "../components/general/ButtonCustom.jsx/ButtonBack";
import WrapperFetch from "../components/general/WrapperFetch";

const AnimeDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fetchDetailData = async () => {
    return await (
      await fetch(`https://api.consumet.org/anime/gogoanime/info/${params?.id}`)
    ).json();
  };
  const [dataDetail, { refetch, mutate }] = createResource(fetchDetailData);

  return (
    <WrapperFetch datas={dataDetail()} onClick={refetch}>
      <Row style={{ margin: "10px 0" }}>
        <Col lg={12}>
          <ButtonBack onClick={() => navigate(-1)}>Back</ButtonBack>
        </Col>
      </Row>
      <Row style={{ "align-items": "center" }}>
        <Col lg={3}>
          <Image src={dataDetail()?.image} width={210} />
        </Col>
        <Col lg={9}>
          <Row>
            <Col>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {dataDetail()?.title}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 4 }}>
                {dataDetail()?.otherName}
              </Typography>
              <AnimeDetailAnimeInfo datas={dataDetail()} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ margin: "10px 0" }}>
        <Col style={{ width: "100%" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Episodes
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col style={{ width: "100%" }}>
          <Grid container columns={4} spacing={5}>
            <For each={dataDetail()?.episodes} fallback={<>No Episodes</>}>
              {(data) => {
                return (
                  <Grid item>
                    <Chip
                      clickable
                      onClick={() => navigate(`/stream/${data?.id}`)}
                      sx={{ cursor: "pointer" }}
                      label={`Episode ${data?.number}`}
                    />
                  </Grid>
                );
              }}
            </For>
          </Grid>
        </Col>
      </Row>
      <Row style={{ "text-align": "center", margin: "10px 0" }}>
        <Col lg={12}>
          <ButtonBack onClick={() => navigate(-1)}>Back</ButtonBack>
        </Col>
      </Row>
    </WrapperFetch>
  );
};

export default AnimeDetail;
