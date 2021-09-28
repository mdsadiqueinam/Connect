import React, { lazy, Suspense } from "react";
import { CircularProgress } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useAuth } from "context/Auth";

const Card = lazy(() => import("@material-ui/core/Card"));
const Button = lazy(() => import("@material-ui/core/Button"));
const ImageIcon = lazy(() => import("@material-ui/icons/Image"));
const CloseIcon = lazy(() => import("@material-ui/icons/Close"));
const CardHeader = lazy(() => import("@material-ui/core/CardHeader"));
const UserAvatar = lazy(() => import("../Avatar/UserAvatar.component"));
const IconButton = lazy(() => import("@material-ui/core/IconButton"));
const YoutubeIcon = lazy(() => import("@material-ui/icons/YouTube"));
const CardActions = lazy(() => import("@material-ui/core/CardActions"));
const PostDialog = lazy(() => import("./PostDialog.component"));
const ResponsiveDialog = lazy(() => import("../Dialog/ResponsiveDialog.component"));

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    maxWidth: 600,
  },
  button: {
    width: "100%",
    borderRadius: "20px",
  },
}));

export default function CreatePost() {
  const { user } = useAuth();
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Suspense fallback={<CircularProgress />}>
      <Card className={classes.card}>
        <CardHeader
          avatar={<UserAvatar userId={user.id}/>}
          title={
            <Button variant="outlined" color="primary" className={classes.button} onClick={handleOpenDialog}>
              Whats on your mind?
            </Button>
          }
        />
        <CardActions disableSpacing>
          <IconButton aria-label="upload image" onClick={handleOpenDialog}>
            <ImageIcon fontSize="large" color="primary" />
          </IconButton>
          <IconButton aria-label="upload video" onClick={handleOpenDialog}>
            <YoutubeIcon fontSize="large" color="primary" />
          </IconButton>
        </CardActions>
      </Card>
      <ResponsiveDialog open={openDialog} handleClose={handleCloseDialog} title={
        <CardHeader
          title='Create a post'
          action={
            <IconButton aria-label="close" onClick={handleCloseDialog}>
              <CloseIcon fontSize="large" color="primary" />
            </IconButton>
          }
        />
      }>
        <PostDialog handleClose={handleCloseDialog}/>
      </ResponsiveDialog>
    </Suspense>
  );
}
