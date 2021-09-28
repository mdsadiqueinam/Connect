import { lazy, Suspense } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Content = lazy(() => import("components/About/Content.component"));
const PlaceInput = lazy(() => import("./PlaceInput.component"));
const PersonPinCircleIcon = lazy(() => import('@material-ui/icons/PersonPinCircle'));

function From() {
  return (
    <Suspense fallback={<BeatLoader color="blue" />}>
      <Content
        contentName="from"
        contentStartsWith="From "
        startIcon={<PersonPinCircleIcon color="primary" />}
        renderInput={<PlaceInput />}
      />
    </Suspense>
  );
}

export default From;
