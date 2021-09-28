import { lazy } from "react";
import { makeStyles } from "@material-ui/core";
import { useAuth } from "context/Auth";
import { useProfile } from "context/Profile";
import useUpdateProfile from "utils/Hooks/useUpdateProfile";
import CoverMenu from "./CoverMenu.component";

const Badge = lazy(() => import("@material-ui/core/Badge"));
const UserAvatar = lazy(() => import("components/Avatar/UserAvatar.component"));

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    border: `2px solid ${theme.palette.background.paper}`,
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  },
}));


export default function CoverAvatar(props) {
  const { userId } = useProfile();
  const { user, setUserProfile } = useAuth();
  const classes = useStyles();

  const [updateProfile, { loading }] = useUpdateProfile({
    update: (caches, { data }) => {
      setUserProfile(data.updateUserProfile);
    },
  }, "At CoverAvatar")

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      updateProfile({variables: { userId, profilePicture: event.target.files[0] }});
    }
  };

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      badgeContent={user.id === userId ? <CoverMenu onChange={handleChange} disabled={loading} /> : null}
    >
      <UserAvatar className={classes.avatar} userId={userId} loading={loading} {...props} />
    </Badge>
  );
}

