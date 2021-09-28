import { lazy } from "react";
import { makeStyles, useTheme, useMediaQuery } from "@material-ui/core";

const IconButton = lazy(() => import("@material-ui/core/IconButton"));
const PhotoCamera = lazy(() => import("@material-ui/icons/PhotoCamera"));

const useStyles = makeStyles((theme) => ({
  iconbutton: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const CoverButton = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <IconButton
      className={classes.iconbutton}
      size={isSmallScreen ? "small" : "medium"}
      aria-label="upload picture"
      component="span"
      {...props}
    >
      <PhotoCamera
        color="primary"
        fontSize={isSmallScreen ? "small" : "medium"}
      />
    </IconButton>
  );
};

export default CoverButton;
