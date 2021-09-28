import React, { lazy, Fragment, Suspense } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuth } from "context/Auth";
import useDeleteComment from "utils/Hooks/useDeleteComment";
import moment from "moment";

const MoreMenu = lazy(() => import("../More/MoreMenu.component"));
const Typography = lazy(() => import("@material-ui/core/Typography"));
const UserAvatar = lazy(() => import("../Avatar/UserAvatar.component"));
const ListItemText = lazy(() => import("@material-ui/core/ListItemText"));
const ConfirmDialog = lazy(() => import("../Dialog/ConfirmDialog.component"));
const ListItemAvatar = lazy(() => import("@material-ui/core/ListItemAvatar"));

export default function CommentCard({
  postId,
  comment: { id, user: userId, username, body, createdAt },
}) {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const [deleteComment, { loading }] = useDeleteComment({variables: { postId, commentId: id }},"At commentCard");

  const Date =
    moment(createdAt).diff(moment(), "days") < -1
      ? moment(createdAt).format("MMM Do YYYY")
      : moment(createdAt).fromNow();

  return (
    <Fragment>
      <ListItemAvatar>
        <UserAvatar userId={userId} username={username} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography component="span" variant="h6" color="textPrimary">
            {username}
            <Typography
              component="span"
              variant="body2"
              color="textSecondary"
              style={{ marginLeft: "10px" }}
            >
              {Date}
            </Typography>
          </Typography>
        }
        secondary={
          <Typography
            component="span"
            variant="body2"
            display="inline"
            color="textPrimary"
          >
            {body}
          </Typography>
        }
      />
      {user.id === userId && (
        <>
          <MoreMenu handleButton2={handleDialogOpen} />
          <Suspense fallback={<CircularProgress />}>
            <ConfirmDialog
              open={dialogOpen}
              handleClose={handleDialogClose}
              handleConfirm={deleteComment}
              loading={loading}
              title={"Are you sure?"}
              message={"This comment will be deleted permanently."}
            />
          </Suspense>
        </>
      )}
    </Fragment>
  );
}
