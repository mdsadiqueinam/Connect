import { lazy, Suspense } from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import "components/LinearGradientProgress/style.css";

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
    width: "213px",
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
}));

export default function RequestCard({
  user: { id, firstName, lastName, username, profilePicture },
}) {
  const classes = useStyles();
  var name = `${firstName} ${lastName}`;
  name = name.trim() !== "" ? name.trim() : username;
  return (
    <Card raised className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media}>
          <Avatar
            alt={name}
            src={profilePicture}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 0,
            }}
            />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h6" >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.action} disableSpacing>
        <Button variant="contained" fullWidth color="primary" >
          Accept
        </Button>
        <Button variant="contained" fullWidth >
          Reject
        </Button>
      </CardActions>
    </Card>
  );
}

RequestCard.propTypes = {
  user: PropTypes.object.isRequired,
};