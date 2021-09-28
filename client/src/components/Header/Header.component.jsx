import { lazy, Fragment } from "react";
import { useAuth } from "context/Auth";
import { useLocation } from "react-router-dom";
import { useGetProfile } from "utils/Hooks/useGetProfile";
import LinearProgress from "@material-ui/core/LinearProgress";

const NavBar = lazy(() => import("components/NavBar/Navbar.component"));

export default function Header() {
  const { user, setUserProfile } = useAuth();
  const userId = user ? user.id : null;
  const location = useLocation();
  const { loading } = useGetProfile({
    skip: !user,
    onCompleted: (data) => {
      setUserProfile(data.getUserProfile);
    },
    variables: { userId },
    fetchPolicy: "network-only",
  });

  if (
    !user ||
    location.pathname === "/404" ||
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return null;
  }
  return (
    <Fragment>
      <NavBar />
      {loading && <LinearProgress color="secondary" />}
    </Fragment>
  );
}
