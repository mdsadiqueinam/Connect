import { lazy, Suspense } from "react";
import { CircularProgress } from "@material-ui/core";
import { useProfile } from "context/Profile";

const Typography = lazy(() => import("@material-ui/core/Typography"));

function getDetails(profile) {
  const { firstName, lastName, username, description } = profile;
  var name;
  if(firstName || lastName) {
    name = `${firstName} ${lastName}`;
  } else {
    name = username;
  }
  return { name, description };
}

export default function ProfileHeadersBody() {
  const ProfileContext = useProfile();

  
  // const { name, description } =  AuthContext.user.id === ProfileContext.userId
  //     ? getDetails(AuthContext.profile)
  //     : getDetails(ProfileContext.profile);
  const { name, description } = getDetails(ProfileContext.profile);

  return (
    <Suspense fallback={<CircularProgress />}>
      <Typography variant="h5" gutterBottom style={{ marginBottom: 0 }}>
        {name}
      </Typography>
      {description && description.length > 0 && (
        <Typography
          variant="subtitle1"
          gutterBottom
          style={{ marginBottom: "1rem" }}
        >
          {description}
        </Typography>
      )}
    </Suspense>
  );
}
