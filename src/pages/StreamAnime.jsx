import { useLocation, useNavigate, useParams } from "@solidjs/router";
import Hls from "hls.js";
import { Col, Row } from "solid-bootstrap";
import { Chip, Typography } from "@suid/material";
import {
  createEffect,
  createResource,
  createSignal,
  For,
  on,
  Show,
} from "solid-js";
import ButtonBack from "../components/general/ButtonCustom.jsx/ButtonBack";
import WrapperFetch from "../components/general/WrapperFetch";
import SelectQuality from "../components/StreamAnime/SelectQuality";
import ButtonRefresh from "../components/general/ButtonCustom.jsx/ButtonRefresh";
import { useBreakpoint } from "../hooks";
import BottomBarMobile from "../components/general/BottomBarMobile";
import ArrowBack from "@suid/icons-material/ArrowBack";
import ArrowForward from "@suid/icons-material/ArrowForward";

const StreamAnime = () => {
  const params = useParams();
  const [isPlay, setIsPlay] = createSignal(false);
  const [quality, setQuality] = createSignal();

  const navigate = useNavigate();
  const location = useLocation();
  let video;

  const { xs } = useBreakpoint();

  const fetchStreamData = async () =>
    await (
      await fetch(
        `https://api.consumet.org/anime/gogoanime/watch/${params?.id}`
      )
    ).json();
  const [dataStream, { refetch, mutate }] = createResource(fetchStreamData);

  const isPlayVideo = () => {
    if (isPlay()) {
      video?.pause();
      setIsPlay(false);
    } else {
      video?.play();
      setIsPlay(true);
    }
  };

  const backForwardEpsHandler = (act = "backward") => {
    const id = location?.state?.id;
    const arrAllEpisodes = location?.state?.allEpisodes;

    const indexCurrentEps = arrAllEpisodes?.findIndex((eps) => eps?.id === id);

    const currentEpsiode =
      act === "backward"
        ? arrAllEpisodes?.[indexCurrentEps - 1]
        : arrAllEpisodes?.[indexCurrentEps + 1];
    navigate(`/stream/${currentEpsiode?.id}`, {
      state: {
        ...location?.state,
        id: currentEpsiode?.id,
        currentEpisode: currentEpsiode?.number,
      },
    });
  };

  const showHideNextPrevBtn = (act) => {
    const id = location?.state?.id;
    const arrAllEpisodes = location?.state?.allEpisodes;

    const indexCurrentEps = arrAllEpisodes?.findIndex((eps) => eps?.id === id);

    const firstEpsCondition = indexCurrentEps === 0 && act === "first";
    const lastEpsCondition =
      indexCurrentEps === arrAllEpisodes?.length - 1 && act === "last";
    if (firstEpsCondition || lastEpsCondition) {
      return false;
    }
    return true;
  };

  createEffect(
    on(
      () => [params?.id],
      () => {
        setQuality(dataStream()?.sources?.[0]?.quality);
      }
    )
  );

  createEffect(
    on(
      () => [params?.id],
      () => {
        refetch();
      }
    )
  );
  createEffect(
    on(
      () => [dataStream(), quality()],
      () => {
        const findSource = () =>
          dataStream()?.sources?.find((data) => data?.quality === quality());

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
    <>
      <Row
        style={{
          "justify-content": "space-around",
          "text-align": "center",
          "align-items": "center",
        }}
      >
        <Show when={!xs()} fallback={<></>}>
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
        </Show>
      </Row>
      <WrapperFetch datas={dataStream()} onClick={refetch}>
        <Row style={{ margin: "10px 0" }}>
          <Col>
            <Typography variant={xs() ? "h6" : "h5"}>
              {location?.state?.animeName} Episode{" "}
              {location?.state?.currentEpisode}
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
                width={xs() ? 320 : 640}
                height={xs() ? 240 : 360}
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
              qualityDatas={dataStream()?.sources?.filter(
                (data) =>
                  data?.quality !== "default" && data?.quality !== "backup"
              )}
              changeQualityHandler={(val) => {
                setQuality(val);
              }}
            />
          </Col>
        </Row>
        <Show when={location?.state !== null} fallback={<></>}>
          <Row>
            <Col>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Episodes :{" "}
              </Typography>
            </Col>
          </Row>
          <Row
            style={{
              "padding-bottom": xs() ? "100px" : "20px",
              "justify-content": "center",
              "align-items": "center",
              "text-align": "center",
            }}
          >
            <Show when={showHideNextPrevBtn("first")} fallback={<></>}>
              <Col
                xs={1}
                onClick={() => {
                  backForwardEpsHandler("backward");
                }}
              >
                <ArrowBack />
              </Col>
            </Show>
            <Col xs={9}>
              <For each={location.state?.allEpisodes}>
                {(data) => {
                  return (
                    <Chip
                      sx={{ margin: "5px" }}
                      label={data?.number}
                      variant={
                        location?.state?.currentEpisode === data?.number
                          ? "filled"
                          : "outlined"
                      }
                      color="primary"
                      clickable
                      onClick={() => {
                        if (data?.number !== location?.state?.currentEpisode) {
                          navigate(`/stream/${data?.id}`, {
                            state: {
                              ...location?.state,
                              id: data?.id,
                              currentEpisode: data?.number,
                            },
                          });
                        }
                      }}
                    />
                  );
                }}
              </For>
            </Col>
            <Show when={showHideNextPrevBtn("last")} fallback={<></>}>
              <Col
                xs={1}
                onClick={() => {
                  backForwardEpsHandler("forward");
                }}
              >
                <ArrowForward />
              </Col>
            </Show>
          </Row>
        </Show>
        <BottomBarMobile
          showRefresh
          onClickRefresh={() => {
            refetch();
            mutate();
          }}
          onClickPrev={() => {
            navigate(
              location?.state !== null
                ? `/detail/${location?.state?.idAnime}`
                : -1
            );
          }}
          showPrev
        />
      </WrapperFetch>
    </>
  );
};
export default StreamAnime;
