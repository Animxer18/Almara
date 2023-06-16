import { useNavigate, useParams } from "@solidjs/router";
import Hls from "hls.js";
import { Col, Row } from "solid-bootstrap";
import { Container, Typography } from "@suid/material";
import { createEffect, createResource, createSignal, on } from "solid-js";
import ButtonBack from "../components/general/ButtonCustom.jsx/ButtonBack";
import { pascalCase } from "../helpers";
import WrapperFetch from "../components/general/WrapperFetch";
import SelectQuality from "../components/StreamAnime.jsx/SelectQuality";
import ButtonRefresh from "../components/general/ButtonCustom.jsx/ButtonRefresh";

const StreamAnime = () => {
  const params = useParams();
  const [isPlay, setIsPlay] = createSignal(false);
  const [quality, setQuality] = createSignal();
  const navigate = useNavigate();

  const fetchStreamData = async () =>
    await (
      await fetch(
        `https://api.consumet.org/anime/gogoanime/watch/${params?.id}`
      )
    ).json();
  const [dataStream, { refetch, mutate }] = createResource(fetchStreamData);
  let video;

  const isPlayVideo = () => {
    if (isPlay()) {
      video?.paused();
      setIsPlay(false);
    } else {
      video?.play();
      setIsPlay(true);
    }
  };

  createEffect(
    on(
      () => [dataStream(), quality()],
      () => {
        console.log("ara : ", quality());
        const qualityValue = () =>
          quality() ?? dataStream()?.sources?.[0]?.quality;

        const findSource = () =>
          dataStream()?.sources?.find(
            (data) => data?.quality === qualityValue()
          );

        if (Hls.isSupported()) {
          var hls = new Hls();

          hls.loadSource(findSource()?.url);
          hls.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = findSource()?.url;
          video.addEventListener("loadedmetadata", function () {});
        }
      }
    )
  );

  return (
    <Container sx={{ marginTop: "20px" }}>
      <Row
        style={{ "justify-content": "space-around", "text-align": "center" }}
      >
        <Col>
          <ButtonBack onClick={() => navigate(-1)}>Back</ButtonBack>
        </Col>
        <Col>
          <ButtonRefresh
            onClick={() => {
              refetch();
              mutate();
            }}
          />
        </Col>
      </Row>
      <WrapperFetch datas={dataStream()} onClick={refetch}>
        <Row style={{ margin: "10px 0" }}>
          <Col>
            <Typography variant="h5">
              {pascalCase(params?.id?.replaceAll("-", " "))}
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col style={{ width: "100%" }}>
            <div
              style={{
                position: "relative",
                "text-align": "center",
              }}
            >
              <video
                id="video"
                width={640}
                height={360}
                ref={video}
                controls
                style={{ cursor: "pointer" }}
                onClick={() => {
                  isPlayVideo();
                }}
                download
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col
            style={{ width: "100%", "text-align": "center", margin: "20px 0" }}
          >
            <SelectQuality
              {...(quality() && {
                btnText: `Quality : ${quality()}`,
              })}
              title={"Choose Quality"}
              qualityDatas={dataStream()?.sources}
              changeQualityHandler={(val) => {
                // mutate();
                setQuality(val);
                // refetch();
              }}
            />
          </Col>
        </Row>
      </WrapperFetch>
    </Container>
  );
};
export default StreamAnime;
