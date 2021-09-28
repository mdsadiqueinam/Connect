import { lazy, Suspense } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import { useAuth } from "context/Auth";

const AuthUserAvatar = lazy(() => import("./AuthUserAvatar.component"));
const OthersUserAvatar = lazy(() => import("./OthersUserAvatar.component"));

export default function UserAvatar({
  userId,
  ...rest
}) {
  const { user } = useAuth();

  return userId === user.id ? (
    <Suspense fallback={<CircularProgress size={20} />}>
      <AuthUserAvatar {...rest} />
    </Suspense>
  ) : (
    <Suspense fallback={<CircularProgress size={20} />}>
      <OthersUserAvatar userId={userId} {...rest} />
    </Suspense>
  );
}

UserAvatar.propTypes = {
  userId: PropTypes.string.isRequired,
};
