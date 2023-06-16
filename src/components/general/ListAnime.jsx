import { useLocation, useNavigate } from "@solidjs/router";
import { Button, Grid } from "@suid/material";
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
import { idToTitle } from "../../helpers";
import WrapperFetch from "./WrapperFetch";
import { useBreakpoint } from "../../hooks";

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
  const mergedProps = mergeProps({ deps: [] }, props);
  const location = useLocation();
  const [local] = splitProps(mergedProps, ["url", "deps"]);

  const [currPage, setCurrPage] = createSignal(1);

  const navigate = useNavigate();
  const fetchDataHandler = async () => {
    return await (await fetch(`${local?.url}?page=${currPage()}`)).json();
  };

  const [data, { refetch, mutate }] = createResource(() => fetchDataHandler());

  createEffect(
    on(
      () => [currPage(), ...local.deps],
      () => {
        mutate();
        refetch();
      }
    )
  );

  createEffect(
    on(
      () => [location.search],
      () => {
        setCurrPage(Number(location.search.split("=")?.[1]));
      }
    )
  );

  onMount(() => {
    setCurrPage(Number(location?.search?.split("=")?.[1]) || 1);
  });

  return (
    <WrapperFetch datas={data()} onClick={refetch}>
      <Grid container spacing={5}>
        <PrevNextBtn
          data={data()}
          currPage={currPage()}
          setCurrPage={setCurrPage}
        />
        <Grid item>
          <Grid
            container
            sx={{ justifyContent: "center" }}
            spacing={3}
            columns={4}
            wrap="wrap"
          >
            <For each={data()?.results} fallback={<>No Data</>}>
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
        <PrevNextBtn
          data={data()}
          currPage={currPage()}
          setCurrPage={setCurrPage}
          navigate={navigate}
        />
      </Grid>
    </WrapperFetch>
  );
};

export default ListAnime;
