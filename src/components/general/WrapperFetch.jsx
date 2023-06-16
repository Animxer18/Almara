import { Container } from "@suid/material";
import { Match, splitProps, Switch } from "solid-js";
import LoadingComponent from "./LoadingComponent";

const WrapperFetch = (props) => {
  const [local] = splitProps(props, ["children", "datas"]);

  return (
    <Container style={{ "margin-top": "20px" }}>
      <Switch fallback={<>No Data</>}>
        <Match when={local?.datas?.loading}>
          <LoadingComponent />
        </Match>
        <Match
          when={
            typeof local?.datas === "object"
              ? Object.keys(local?.datas)?.length
              : Array.isArray(local?.datas)
              ? local?.datas?.length
              : local?.datas
          }
        >
          {local?.children}
        </Match>
        <Match when={local?.datas?.error}>
          <p>{local?.datas?.error}</p>
        </Match>
      </Switch>
    </Container>
  );
};

export default WrapperFetch;
