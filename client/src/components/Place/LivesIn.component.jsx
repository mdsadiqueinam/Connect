import { lazy, Suspense } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Content = lazy(() => import("components/About/Content.component"));
const HouseIcon = lazy(() => import("@material-ui/icons/House"));
const PlaceInput = lazy(() => import("./PlaceInput.component"));

function LivesIn() {
  return (
    <Suspense fallback={<BeatLoader color="blue" />}>
      <Content
        contentName="livesIn"
        contentStartsWith="Lives In "
        startIcon={<HouseIcon color="primary" />}
        renderInput={<PlaceInput />}
      />
    </Suspense>
  );
}

export default LivesIn;
