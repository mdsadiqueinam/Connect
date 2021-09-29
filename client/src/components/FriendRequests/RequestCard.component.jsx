import { lazy, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useAuth } from "context/Auth";
import useManageFriend from "utils/Hooks/useManageFriend";
import BeatLoader from "react-spinners/BeatLoader";
import PropTypes from "prop-types";

const Card = lazy(() => import("@material-ui/core/Card"));
const Button = lazy(() => import("@material-ui/core/Button"));
const Avatar = lazy(() => import("@material-ui/core/Avatar"));
const CardMedia = lazy(() => import("@material-ui/core/CardMedia"));
const Typography = lazy(() => import("@material-ui/core/Typography"));
const CardActions = lazy(() => import("@material-ui/core/CardActions"));
const CardContent = lazy(() => import("@material-ui/core/CardContent"));
const CardActionArea = lazy(() => import("@material-ui/core/CardActionArea"));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: theme.spacing(26.63),
    height: theme.spacing(46),
    boxSizing: "border-box",
    margin: theme.spacing(3, 2),
    borderRadius: "10px",
  },
  content: {
    width: "100%",
    height: theme.spacing(2),
    borderRadius: "10px",
  },
  action: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    rowGap: theme.spacing(1),
  },
  media: {
    height: theme.spacing(25),
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 0,
  },
}));

function RequestCard({
  user: { id, firstName, lastName, username, profilePicture },
  button1Action,
  button2Action,
}) {
  const classes = useStyles();
  const { setUserProfile } = useAuth();
  var name = `${firstName} ${lastName}`;
  name = name.trim() !== "" ? name.trim() : username;

  const [button1Props, setButton1Props] = useState(
    button1Action
      ? {
          name: button1Action,
          onClick: handleRequest,
          color: "primary",
        }
      : null
  );

  const [button2Props, setButton2Props] = useState(
    button2Action
      ? {
          name: button2Action,
          onClick: handleRequest,
        }
      : null
  );

  const [manageFriend, { loading }] = useManageFriend(
    {
      onCompleted: (data) => {
        setUserProfile(data.manageFriend);
        console.log("completed");
      },
    },
    "Request Card"
  );

  function handleRequest(e) {
    e.preventDefault();
    manageFriend({
      variables: {
        userId: id,
        action: e.currentTarget.name,
      },
    });
    setButton1Props(null);
    setButton2Props({
      name: `Request ${e.currentTarget.name}ed`,
      onClick: null,
      disabled: true,
    });
    console.log("done");
  }

  return (
    <Card raised className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media}>
          <Avatar alt={name} src={profilePicture} className={classes.avatar} />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h6">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.action} disableSpacing>
        {button1Props && (
          <Button
            variant="contained"
            fullWidth
            {...button1Props}
          >
            {loading ? (
              <BeatLoader size={10} color={"blue"} />
            ) : (
              button1Props.name
            )}
          </Button>
        )}
        {button2Props && (
          <Button
            variant="contained"
            fullWidth
            {...button2Props}
          >
            {loading ? (
              <BeatLoader size={10} color={"blue"} />
            ) : (
              button2Props.name
            )}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

RequestCard.propTypes = {
  user: PropTypes.object.isRequired,
  button1Action: PropTypes.string,
  button2Action: PropTypes.string,
};

export default RequestCard;
