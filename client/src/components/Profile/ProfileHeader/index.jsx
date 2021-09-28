import { lazy, Suspense, memo } from "react";
import { LinearProgress } from "@material-ui/core";
import { useAuth } from "context/Auth";
import { useProfile } from "context/Profile";

const ProfileCover = lazy(() => import("./ProfileCover.component"));
const ProfileHeadersBody = lazy(() => import("./ProfileHeadersBody.component"));
const ProfileHeadersAction = lazy(() => import("./ProfileHeadersAction.component"));

function ProfileHeader() {
  const { user } = useAuth();
  const { userId } = useProfile();

  return (
    <div className="css-js-container" style={{ margin: 16 }}>
      <Suspense fallback={<LinearProgress />}>
        <ProfileCover />
        <ProfileHeadersBody />
        {user && user.id !== userId && <ProfileHeadersAction />}
      </Suspense>
    </div>
  );
}

export default memo(ProfileHeader);