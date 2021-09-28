import { forwardRef, Fragment } from "react";
import LinearGradientProgress from "components/LinearGradientProgress";
import {
  CardMedia,
  Card,
  makeStyles,
  CardContent,
  Button,
  CardActions,
} from "@material-ui/core";
import "components/LinearGradientProgress/style.css";

const width = 213;

const useStyles = makeStyles((theme) => ({
  root: {
    width: width,
    boxSizing: "border-box",
    margin: theme.spacing(3, 2),
  },
  media: {
    height: theme.spacing(25),
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
  button: {
    height: theme.spacing(4.5),
  },
}));

const RequestCard = forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <Card raised className={classes.root} ref={ref} >
      <CardMedia>
        <LinearGradientProgress className={classes.media} />
      </CardMedia>
      <CardContent>
        <LinearGradientProgress className={classes.content} />
      </CardContent>
      <CardActions className={classes.action} disableSpacing>
        <Button
          variant="contained"
          className={`${classes.button} linear-gradient-progress`}
          fullWidth
          disabled
        />
        <Button
          variant="contained"
          className={`${classes.button} linear-gradient-progress`}
          fullWidth
          disabled
        />
      </CardActions>
    </Card>
  );
});

const FriendRequestProgress = forwardRef((props, ref) => {
  return (
    <Fragment >
      <RequestCard ref={ref}/>
      <RequestCard />
      <RequestCard />
      <RequestCard />
    </Fragment>
  )
});

export default FriendRequestProgress;