import { lazy } from "react";
import { Switch, Redirect } from "react-router-dom";
import UnAuthorizedRoute from "components/CheckRoutes/UnAuthorizedRoute.component";
import AuthorizedRoute from "components/CheckRoutes/AuthorizedRoute.component";

const Home = lazy(() => import("pages/Home"));
const Login = lazy(() => import("pages/Login"));
const Profile = lazy(() => import("pages/Profile"));
const Register = lazy(() => import("pages/Register"));
const LandingPage = lazy(() => import("pages/LandingPage"));
const FriendRequests = lazy(() => import("pages/FriendRequests"));
const MyAccount = lazy(() => import("pages/MyAccount"));


const Routes = () => {
  return (
    <Switch>
      <UnAuthorizedRoute path="/" exact component={LandingPage} />
      <UnAuthorizedRoute path="/register" exact component={Register} />
      <UnAuthorizedRoute path="/login" exact component={Login} />
      <AuthorizedRoute path="/home" exact component={Home} />
      <AuthorizedRoute path="/myaccount" exact component={MyAccount} />
      <AuthorizedRoute path="/friend-requests" exact component={FriendRequests} />
      <AuthorizedRoute path="/:username" exact component={Profile} />
      <Redirect to="/404" />
    </Switch>
  );
};

export default Routes;
