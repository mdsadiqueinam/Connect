import { lazy } from "react";
import { makeStyles } from "@material-ui/core";
import { useAuth } from "context/Auth";
import { useProfile } from "context/Profile";
import useUpdateProfile from "utils/Hooks/useUpdateProfile";
import CoverMenu from "./CoverMenu.component";
import { LinearProgress } from "@material-ui/core";

const Badge = lazy(() => import("@material-ui/core/Badge"));
const CoverMedia = lazy(() => import("./CoverMedia.component"));

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 1,
  },
  media: {
    borderRadius: "10px",
    maxHeight: "20rem",
    cursor: "pointer",
  },
}));

function CoverImage() {
  const { user, setUserProfile } = useAuth();
  const { userId } = useProfile();
  const classes = useStyles();

  const [updateProfile, { loading }] = useUpdateProfile({
    update: (caches, { data }) => {
      setUserProfile(data.updateUserProfile);
    },
  }, "CoverImage Menu")

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      updateProfile({variables: { userId, coverPicture: event.target.files[0] }});
    }
  };

  return (
    <Badge
      className={classes.root}
      overlap="circular"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      badgeContent={userId === user.id ? <CoverMenu onChange={handleChange} disabled={loading}/> : null}
    >
      { loading && <LinearProgress color="secondary"/> }
      <CoverMedia
        className={classes.media}
        title="Cover Image"
        component="img"
      />
    </Badge>
  );
}


export default CoverImage;
// https://cdn.pixabay.com/photo/2017/01/30/16/11/sunset-2021266_960_720.jpg