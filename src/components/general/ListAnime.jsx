import { useNavigate } from "@solidjs/router";
import { Container, Button, Stack, Grid } from "@suid/material";
import {
  createEffect,
  createResource,
  createSignal,
  For,
  mergeProps,
  on,
  Show,
  splitProps,
} from "solid-js";
import CardAnime from "./CardAnime";
import LoadingComponent from "./LoadingComponent";
import { idToTitle } from "../../helpers";
import { Match, Switch } from "solid-js/web";
import WrapperFetch from "./WrapperFetch";

const PrevNextBtn = (props) => {
  const [local] = splitProps(props, ["data", "currPage", "setCurrPage"]);

  return (
    <Show when={local?.data?.hasNextPage} fallback={<></>}>
      <Grid item width={"100%"} sx={{ margin: "50px 0" }}>
        <Grid
          sx={{ justifyContent: "center" }}
          container
          wrap="wrap"
          columnSpacing={2}
        >
          <Show when={local?.currPage !== 1} fallback={<></>}>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => {
                  local?.setCurrPage(local?.currPage - 1);
                }}
              >
                Prev Page
              </Button>
            </Grid>
          </Show>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => {
                local?.setCurrPage(local?.currPage + 1);
              }}
            >
              Next Page
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Show>
  );
};

const ListAnime = (props) => {
  const mergedProps = mergeProps({ deps: [] }, props);
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
            spacing={4}
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
        />
      </Grid>
    </WrapperFetch>
  );
};

export default ListAnime;
