import { lazy, Fragment, Suspense, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuth } from "context/Auth";

const MoreMenu = lazy(() => import("../More/MoreMenu.component"));
const UserAvatar = lazy(() => import("../Avatar/UserAvatar.component"));
const CardHeader = lazy(() => import("@material-ui/core/CardHeader"));
const ConfirmDialog = lazy(() => import("../Dialog/ConfirmDialog.component"));

export default function PostHeader({
  username,
  userId,
  createdAt,
  handleDelete,
  loading,
}) {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Fragment>
      <CardHeader
        avatar={<UserAvatar userId={userId} username={username} />}
        action={
          user.id === userId ? (
            <MoreMenu handleButton2={handleDialogOpen} />
          ) : null
        }
        title={username}
        subheader={createdAt}
      />
      {user.id === userId && (
        <Suspense fallback={<CircularProgress />}>
          <ConfirmDialog
            open={dialogOpen}
            handleClose={handleDialogClose}
            handleConfirm={handleDelete}
            title={"Are you sure?"}
            message={"This post will be deleted permanently."}
            loading={loading}
          />
        </Suspense>
      )}
    </Fragment>
  );
}

//TODO: Add update buttons to moreIcon
