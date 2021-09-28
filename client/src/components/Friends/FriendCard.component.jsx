import useManageFriend from "utils/Hooks/useManageFriend";
import { lazy, Suspense, memo, useState } from "react";
import { StyledCardHeader } from "components/About/About.component";
import { makeStyles } from "@material-ui/styles";
import { useProfile } from "context/Profile";
import { useAuth } from "context/Auth";
import ClearIcon from "@material-ui/icons/Clear";
import ChatIcon from "@material-ui/icons/Chat";
import BeatLoader from "react-spinners/BeatLoader";

const Menu = lazy(() => import("components/Menu/ToggleMenu"));
const Button = lazy(() => import("@material-ui/core/Button"));
const Avatar = lazy(() => import("@material-ui/core/Avatar"));
const Typography = lazy(() => import("@material-ui/core/Typography"));
const ConfirmDialog = lazy(() => import("components/Dialog/ConfirmDialog.component"));

const useStyles = makeStyles((theme) => ({
  root: {
    flex: "46.2%",
    maxWidth: "46.2%",
    [theme.breakpoints.down("sm")]: {
      flex: "100%",
      maxWidth: "100%",
    },
    boxSizing: "border-box",
    margin: theme.spacing(3, 2),
  },
  avatar: {
    width: "80px",
    height: "80px",
  },
}));

function FriendCard({
  friend: { id, firstName, lastName, profilePicture, username },
}) {
  const classes = useStyles();
  const { user, profile, setUserProfile } = useAuth();
  const { userId } = useProfile();
  const [dialogOpen, setDialogOpen] = useState(false);
  const isFriend = profile?.friends?.includes(id);
  const isFriendRequestSent = profile?.sentFriendRequests?.includes(id);
  var name = `${firstName} ${lastName}`;
  name = name.trim() !== "" ? name.trim() : username;

  const [manageFriend, { loading }] = useManageFriend({
      onCompleted: (data) => setUserProfile(data.manageFriend),
    }, "Friend Card"
  );


  const handleFriend = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.name)
    manageFriend({
      variables: {
        userId: id,
        action: e.currentTarget.name,
      },
    });
  }

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const action =
    user && userId === user.id ? (
      loading ? (
        <BeatLoader size={10} color={"blue"} />
      ) : isFriend ? (
        <Menu
          button1StartIcon={<ChatIcon />}
          button1Text="Message"
          button2StartIcon={<ClearIcon />}
          button2Text="Unfriend"
          handleButton2={handleDialogOpen}
        />
      ) : isFriendRequestSent ? (
        <Button
          variant="contained"
          color="default"
          name="cancel"
          onClick={handleFriend}
        >
          Cancel Request
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleFriend} name="send">
          Add Friend
        </Button>
      )
    ) : undefined;

  // console.log(username);
  return (
    <Suspense>
      <StyledCardHeader
        className={classes.root}
        avatar={
          <Avatar
            src={profilePicture}
            aria-label={username}
            variant="rounded"
            className={classes.avatar}
          />
        }
        action={action}
        title={<Typography variant="body1">{name}</Typography>}
      />
      {user.id === userId && (
        <ConfirmDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
          handleConfirm={handleFriend}
          confirmButtonProps={{
            name: "remove"
          }}
          title={`Unfriend ${name}`}
          message={`Are you sure you want to remove ${name} as your friend?`}
        />
      )}
    </Suspense>
  );
}

export default memo(FriendCard);
