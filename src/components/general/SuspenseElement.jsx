import { splitProps, Suspense } from "solid-js";
import LoadingComponent from "./LoadingComponent";

const SuspenseElement = (props) => {
  const [local] = splitProps(props, ["children"]);
  return <Suspense fallback={<LoadingComponent />}>{local?.children}</Suspense>;
};

export default SuspenseElement;
