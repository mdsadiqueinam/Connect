import { lazy } from "react";
import { makeStyles } from "@material-ui/core";
import { useAuth } from "context/Auth";
import { useProfile } from "context/Profile";
import useManageFriend from "utils/Hooks/useManageFriend";
import BeatLoader from "react-spinners/BeatLoader";

const Button = lazy(() => import("@material-ui/core/Button"));
const SendIcon = lazy(() => import("@material-ui/icons/Send"));
const PersonAddIcon = lazy(() => import("@material-ui/icons/PersonAdd"));
const CancelIcon = lazy(() => import("@material-ui/icons/Cancel"));

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  addFriend: {
    marginRight: theme.spacing(5),
  },
}));

export default function ProfileHeadersAction() {
  const classes = useStyles();
  const { userId } = useProfile();
  const { profile, setUserProfile } = useAuth();
  const isFriend = profile.friends.includes(userId);
  const isFriendRequestSent = profile.sentFriendRequests.includes(userId);
  const isFriendRequestReceived = profile.receivedFriendRequests.includes(userId);

  const [manageFriend, { loading }] = useManageFriend(
    {
      onCompleted: (data) => {
        setUserProfile(data.manageFriend);
      },
    },
    "ProfileHeadersAction"
  );

  const handleFriend = (e) => {
    e.preventDefault();
    manageFriend({
      variables: {
        userId,
        action: e.currentTarget.name,
      },
    });
  };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color={
          isFriend ? "secondary" : isFriendRequestSent ? "default" : "primary"
        }
        name={
          isFriend
            ? "remove"
            : isFriendRequestSent
            ? "cancel"
            : isFriendRequestReceived
            ? "accept"
            : "send"
        }
        endIcon={<PersonAddIcon />}
        className={classes.addFriend}
        disabled={loading}
        onClick={handleFriend}
      >
        {loading ? (
          <BeatLoader color="blue" size={10} />
        ) : isFriend ? (
          "Unfriend"
        ) : isFriendRequestSent ? (
          "Cancel"
        ) : isFriendRequestReceived ? (
          "Accept"
        ) : (
          "Add Friend"
        )}
      </Button>
      <Button
        variant="contained"
        color={isFriend ? "primary" : "default"}
        endIcon={isFriendRequestReceived ? <CancelIcon /> : <SendIcon />}
        disabled={isFriendRequestReceived ? false : !isFriend}
        name={isFriendRequestReceived ? "reject" : "message"}
        onClick={isFriendRequestReceived ? handleFriend : undefined}
      >
        {isFriendRequestReceived ? "Reject" : "Send Message"}
      </Button>
    </div>
  );
}
