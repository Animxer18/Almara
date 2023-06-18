import { useLocation, useNavigate } from "@solidjs/router";
import { Button, Grid, Container, Box } from "@suid/material";
import {
  createEffect,
  createResource,
  createSignal,
  For,
  mergeProps,
  on,
  onMount,
  Show,
  splitProps,
} from "solid-js";
import CardAnime from "./CardAnime";
import { idToTitle, uniqueObjArray } from "../../helpers";
import WrapperFetch from "./WrapperFetch";
import { useBreakpoint } from "../../hooks";
import BottomBarMobile from "./BottomBarMobile";
import GenreComponent from "../Genre/GenreComponent";
import { Collapse } from "solid-collapse";
import KeyboardArrowDownIcon from "@suid/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@suid/icons-material/KeyboardArrowUp";
import NotFound from "../../pages/NotFound";

const PrevNextBtn = (props) => {
  const [local] = splitProps(props, ["data", "currPage", "setCurrPage"]);
  const navigate = useNavigate();
  const location = useLocation();
  const { xs } = useBreakpoint();

  return (
    <Show
      when={local?.data?.hasNextPage || Number(local?.data?.currentPage) !== 1}
      fallback={<></>}
    >
      <Grid item width={"100%"} sx={{ margin: `${xs() ? "10px" : "50px"} 0` }}>
        <Grid
          sx={{ justifyContent: "center" }}
          container
          wrap="wrap"
          columnSpacing={2}
        >
          <Show when={Number(local?.data?.currentPage) !== 1} fallback={<></>}>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => {
                  local?.setCurrPage(local?.currPage - 1);
                  navigate(`${location?.pathname}?page=${local?.currPage}`);
                }}
              >
                Prev Page
              </Button>
            </Grid>
          </Show>
          <Show when={local?.data?.hasNextPage}>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  local?.setCurrPage(local?.currPage + 1);
                  navigate(`${location?.pathname}?page=${local?.currPage}`);
                }}
              >
                Next Page
              </Button>
            </Grid>
          </Show>
        </Grid>
      </Grid>
    </Show>
  );
};

const ListAnime = (props) => {
  const location = useLocation();
  const { xs } = useBreakpoint();
  const navigate = useNavigate();

  const [currPage, setCurrPage] = createSignal(
    Number(location?.search?.split("=")?.[1]) || 1
  );
  const [arrGenres, setArrGenres] = createSignal([]);
  const [arrSelectedGenres, setArrSelectedGenres] = createSignal([]);
  const [dataFiltered, setDataFiltered] = createSignal([]);
  // filtered by genre

  const [isShowGenres, setIsShowGenres] = createSignal(false);

  const mergedProps = mergeProps({ deps: [] }, props);
  const [local] = splitProps(mergedProps, ["url", "deps"]);

  const fetchDataHandler = async () => {
    return await (await fetch(`${local?.url}?page=${currPage()}`)).json();
  };

  const [data, { refetch, mutate }] = createResource(() => fetchDataHandler());

  const arrDatas = () => {
    if (arrSelectedGenres()?.length) {
      return dataFiltered();
    }
    return data();
  };

  const getAllGenres = () => {
    if (data()?.results?.length) {
      const genres = data()?.results?.map((res) => res?.genres);

      const allGenres = genres?.reduce((init, curr) => {
        curr?.forEach((c) => {
          init = [...new Set([...init, c])];
        });
        return init;
      }, []);

      setArrGenres(allGenres?.sort());
    }
  };

  const filteredDataByGenre = () => {
    const arrDataFiltered = [];

    data()?.results?.forEach((data) => {
      arrSelectedGenres()?.forEach((selectedGenre) => {
        if (data?.genres?.includes(selectedGenre)) {
          arrDataFiltered?.push(data);
        }
      });
    });

    const arrFilteredGenres = arrGenres().filter((genre) => {
      if (!arrSelectedGenres()?.includes(genre)) {
        return genre;
      }
    });

    setArrGenres(arrFilteredGenres?.sort());

    setDataFiltered({
      ...data(),
      results: uniqueObjArray({ arr: arrDataFiltered, obj: "id" }),
    });
  };

  createEffect(
    on(
      () => [currPage(), ...local.deps],
      () => {
        mutate();
        refetch();
        setArrSelectedGenres([]);
      }
    )
  );

  createEffect(
    on(
      () => [data()],
      () => {
        getAllGenres();
      }
    )
  );

  createEffect(
    on(
      () => [arrSelectedGenres()],
      () => {
        filteredDataByGenre();
      }
    )
  );

  createEffect(
    on(
      () => [location?.search],
      () => {
        if (location?.search === "?page=1") {
          setCurrPage(1);
        }
      }
    )
  );

  return (
    <WrapperFetch datas={arrDatas()} onClick={refetch}>
      <Show when={!location?.pathname?.includes("search")} fallback={<></>}>
        <Box
          {...(xs() && {
            sx: { marginBottom: "20px" },
          })}
        >
          <Button
            variant="outlined"
            endIcon={
              isShowGenres() ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )
            }
            sx={{
              width: "100%",
              justifyContent: "space-between",
            }}
            onClick={() => {
              setIsShowGenres(!isShowGenres());
            }}
          >
            Show Genres
          </Button>
          <Collapse value={isShowGenres()} class="my-transition">
            <GenreComponent
              arrGenres={arrGenres()}
              setArrGenres={setArrGenres}
              arrSelectedGenres={arrSelectedGenres()}
              setArrSelectedGenres={setArrSelectedGenres}
            />
          </Collapse>
          <Show when={arrSelectedGenres()?.length} fallback={<></>}>
            <Button
              variant="outlined"
              onClick={() => {
                setArrSelectedGenres([]);
                getAllGenres();
              }}
            >
              Clear Filter
            </Button>
          </Show>
        </Box>
      </Show>
      <Grid container spacing={5} sx={{ marginBottom: 15 }}>
        <Show when={!xs()} fallback={<></>}>
          <PrevNextBtn
            data={arrDatas()}
            currPage={currPage()}
            setCurrPage={setCurrPage}
          />
        </Show>
        <Grid item>
          <Grid
            container
            sx={{ justifyContent: "center" }}
            spacing={3}
            columns={4}
            wrap="wrap"
          >
            <For
              each={arrDatas()?.results}
              fallback={
                <Container>
                  <NotFound>No Data</NotFound>
                </Container>
              }
            >
              {(data) => {
                return (
                  <Grid item>
                    <CardAnime
                      onClick={() => {
                        navigate(`/detail/${data?.id}`);
                      }}
                      title={data?.title || idToTitle(data?.id)}
                      imageSrc={data?.image}
                    />
                  </Grid>
                );
              }}
            </For>
          </Grid>
        </Grid>
        <Show when={!xs()} fallback={<></>}>
          <PrevNextBtn
            data={arrDatas()}
            currPage={currPage()}
            setCurrPage={setCurrPage}
          />
        </Show>
        <BottomBarMobile
          data={arrDatas()}
          currPage={currPage()}
          showRefresh
          setCurrPage={setCurrPage}
          onClickRefresh={() => {
            mutate();
            refetch();
          }}
          onClickHome={() => {
            setCurrPage(1);
            navigate(`${location?.pathname}?page=${currPage()}`);
          }}
          onClickPrev={() => {
            setCurrPage(currPage() - 1);
            navigate(`${location?.pathname}?page=${currPage()}`);
          }}
          onClickNext={() => {
            setCurrPage(currPage() + 1);
            navigate(`${location?.pathname}?page=${currPage()}`);
          }}
          showNext
          showPrev
        />
      </Grid>
    </WrapperFetch>
  );
};

export default ListAnime;
