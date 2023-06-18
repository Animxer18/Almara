import { Routes, Route, useNavigate, useLocation } from "@solidjs/router";
import { createEffect, lazy, on } from "solid-js";
import SuspenseElement from "./components/general/SuspenseElement";

const Home = lazy(() => import("./pages/Home"));
const AnimeDetail = lazy(() => import("./pages/AnimeDetail"));
const StreamAnime = lazy(() => import("./pages/StreamAnime"));
const SearchAnime = lazy(() => import("./pages/SearchAnime"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Routing = () => {
  // const navigate = useNavigate();
  // const location = useLocation();

  // createEffect(
  //   on(
  //     () => [location],
  //     () => {
  //       if (location?.pathname === "/") {
  //         navigate("/?page=1");
  //       }
  //     }
  //   )
  // );
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SuspenseElement>
            <Home />
          </SuspenseElement>
        }
      />
      <Route
        path="/detail/:id"
        element={
          <SuspenseElement>
            <AnimeDetail />
          </SuspenseElement>
        }
      />
      <Route
        path="/stream/:id"
        element={
          <SuspenseElement>
            <StreamAnime />
          </SuspenseElement>
        }
      />
      <Route
        path="/search/:search"
        element={
          <SuspenseElement>
            <SearchAnime />
          </SuspenseElement>
        }
      />
      <Route
        path="/*"
        element={
          <SuspenseElement>
            <NotFound />
          </SuspenseElement>
        }
      />
    </Routes>
  );
};

export default Routing;
