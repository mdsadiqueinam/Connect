import { lazy, memo } from "react";
import { withStyles } from "@material-ui/core";

const Box = lazy(() => import("@material-ui/core/Box"));
const Badge = lazy(() => import("@material-ui/core/Badge"));
const CoverImage = lazy(() => import("components/Cover/CoverImage.component"));
const CoverAvatar = lazy(() => import("components/Cover/CoverAvatar.component"));

const CoverBadge = withStyles((theme) => ({
  badge: {
    left: "50%",
  },
}))(Badge);

function ProfileCover() {

  return (
    <Box className={"css-js-profile-cover"}>
      <CoverBadge
        overlap="circular"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        badgeContent={
          <CoverAvatar />
        }
      >
        <CoverImage />
      </CoverBadge>
    </Box>
  );
}

export default  memo(ProfileCover);