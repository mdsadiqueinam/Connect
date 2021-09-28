import React, { lazy, Suspense, useContext } from "react";
import { LinearProgress, CircularProgress, makeStyles, } from "@material-ui/core";
import { AuthContext } from "context/Auth";
import { useGetProfile } from "utils/Hooks/useGetProfile";
import { ProfileProvider } from "context/Profile";

const Container = lazy(() => import("@material-ui/core/Container"));
const ProfileHeader = lazy(() => import("components/Profile/ProfileHeader"));
const ProfileContent = lazy(() => import("components/Profile/ProfileContent.component"));

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    marginTop: theme.spacing(10),
    padding: 0,
  },
}));


export default function Profile(props) {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const userId = props.location.state ? props.location.state.userId : null;
  const username = props.location.pathname.split("/").at(-1);
  
  const { loading, data } = useGetProfile({
    variables: { userId, username },
    skip: userId === authContext.user.id || username === authContext.user.username,
  });
  
  if (!userId && !username) {
    console.error("No userId or username received in Profile page");
    return;
  }

  return (
    <Container className={`${classes.profileContainer} css-js-container`}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Suspense fallback={<LinearProgress />}>
          <ProfileProvider
            value={
              data && data.getUserProfile
                ? { profile: data.getUserProfile, userId: data.getUserProfile.id }
                : { profile: authContext.profile, userId: authContext.user.id }
            }
          >
            <ProfileHeader />
            <ProfileContent />
          </ProfileProvider>
        </Suspense>
      )}
    </Container>
  );
}
