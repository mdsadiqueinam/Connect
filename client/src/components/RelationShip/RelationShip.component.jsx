import { lazy, Suspense } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Content = lazy(() => import("components/About/Content.component"));
const ContentInput = lazy(() => import("components/About/ContentInput.component"));
const FavoriteIcon = lazy(() => import("@material-ui/icons/Favorite"))

const selectValues = ['Single', 'RelationShip', 'Engaged', 'Married'];

function RelationShip() {
  return (
    <Suspense fallback={<BeatLoader color="blue" />}>
      <Content
        contentName="relationship"
        startIcon={<FavoriteIcon color="primary" />}
        renderInput={<ContentInput inputType="select" selectValues={selectValues}/>}
      />
    </Suspense>
  );
}

export default RelationShip;
