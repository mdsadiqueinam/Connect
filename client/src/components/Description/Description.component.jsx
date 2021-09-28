import { lazy, Suspense } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const InfoIcon = lazy(() => import("@material-ui/icons/Info"));
const Content = lazy(() => import("components/About/Content.component"));


export default function Description() {
  return (
    <Suspense fallback={<BeatLoader />}>
      <Content contentName="description" startIcon={<InfoIcon color="primary"/>} renderInput />
    </Suspense>
  );
}
