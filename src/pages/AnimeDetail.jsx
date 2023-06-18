import { useNavigate, useParams } from "@solidjs/router";
import { Chip, Grid, Typography } from "@suid/material";
import { Col, Image, Row } from "solid-bootstrap";
import { createResource, createSignal, For, Show } from "solid-js";
import AnimeDetailAnimeInfo from "../components/AnimeDetail/AnimeDetailAnimeInfo";
import PreviewImage from "../components/AnimeDetail/PreviewImage";
import BottomBarMobile from "../components/general/BottomBarMobile";
import ButtonBack from "../components/general/ButtonCustom.jsx/ButtonBack";
import WrapperFetch from "../components/general/WrapperFetch";
import { useBreakpoint } from "../hooks";

const AnimeDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { xs } = useBreakpoint();
  const [isOpenPreview, setIsOpenPreview] = createSignal(false);

  const fetchDetailData = async () => {
    return await (
      await fetch(`https://api.consumet.org/anime/gogoanime/info/${params?.id}`)
    ).json();
  };
  const [dataDetail, { refetch, mutate }] = createResource(fetchDetailData);

  return (
    <WrapperFetch datas={dataDetail()} onClick={refetch}>
      <Show when={!xs()} fallback={<></>}>
        <Row style={{ margin: "10px 0" }}>
          <Col lg={12}>
            <ButtonBack onClick={() => navigate(-1)}>Back</ButtonBack>
          </Col>
        </Row>
      </Show>
      <Row style={{ "align-items": "center" }}>
        <Col
          lg={3}
          {...(xs() && {
            style: {
              "text-align": "center",
            },
          })}
        >
          <PreviewImage
            setIsOpenPreview={setIsOpenPreview}
            isOpenPreview={isOpenPreview()}
            onClick={() => setIsOpenPreview(true)}
          >
            <Image
              src={dataDetail()?.image}
              width={210}
              style={{ cursor: "pointer" }}
            />
          </PreviewImage>
        </Col>
        <Col lg={9}>
          <Row>
            <Col>
              <Typography
                variant={xs() ? "h5" : "h4"}
                sx={{
                  fontWeight: "bold",
                  ...(xs() && {
                    marginTop: "20px",
                    textAlign: "center",
                  }),
                }}
              >
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
      <Row
        {...(xs() && {
          style: {
            "margin-bottom": "100px",
          },
        })}
      >
        <Col style={{ width: "100%" }}>
          <Grid
            sx={{ textAlign: "center" }}
            container
            columnSpacing={xs() ? 2 : 5}
            rowSpacing={2}
          >
            <For each={dataDetail()?.episodes} fallback={<>No Episodes</>}>
              {(data) => {
                return (
                  <Grid item>
                    <Chip
                      clickable
                      onClick={() =>
                        navigate(`/stream/${data?.id}`, {
                          state: {
                            id: data?.id,
                            idAnime: dataDetail()?.id,
                            currentEpisode: data?.number,
                            animeName: dataDetail()?.title,
                            allEpisodes: dataDetail()?.episodes,
                          },
                        })
                      }
                      sx={{
                        cursor: "pointer",
                        ...(xs() && { padding: "18px" }),
                        border: "1px solid rgba(25, 118, 210, 0.5)",
                        color: "#1976d2",
                        backgroundColor: "transparent",
                      }}
                      size="20px"
                      label={
                        <Typography
                          variant={xs() ? "button" : "body"}
                        >{`Episode ${data?.number}`}</Typography>
                      }
                    />
                  </Grid>
                );
              }}
            </For>
          </Grid>
        </Col>
      </Row>
      <Show when={!xs()} fallback={<></>}>
        <Row style={{ margin: "10px 0" }}>
          <Col lg={12}>
            <ButtonBack onClick={() => navigate(-1)}>Back</ButtonBack>
          </Col>
        </Row>
      </Show>
      <BottomBarMobile
        showRefresh
        onClickRefresh={() => {
          mutate();
          refetch();
        }}
        onClickPrev={() => navigate(-1)}
        showPrev
      />
    </WrapperFetch>
  );
};

export default AnimeDetail;
