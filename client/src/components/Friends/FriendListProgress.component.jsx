import { forwardRef } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyledCardHeader } from "components/About/About.component";
import LinearGradientProgress from "components/LinearGradientProgress";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import "../LinearGradientProgress/style.css"


const useStyles = makeStyles(theme => ({
  root: {
    flex: "46.2%",
    boxSizing: "border-box",
    margin: theme.spacing(3, 2),
  },
  avatar: {
    width: "80px",
    height: "80px"
  },
  title: {
    height: "10px"
  },
  subheader: {
    marginTop: "5px", maxWidth: "50%"
  },
  container: {
    display: "flex", flexWrap: "wrap"
  }
}));

function ProgressCard() {
  const classes = useStyles();

  return (
    <StyledCardHeader
      avatar={
        <Avatar
          aria-label="recipe"
          variant="rounded"
          className={`${classes.avatar} linear-gradient-progress`}
        >
          <LinearGradientProgress />
        </Avatar>
      }
      action={
        <IconButton aria-label="settings" disabled className="linear-gradient-progress" size="medium">
        </IconButton>
      }
      title={
        <LinearGradientProgress className={classes.title}/>
      }
      subheader={
        <LinearGradientProgress className={`${classes.title} ${classes.subheader}`}/>
      }
      className={classes.root}
    />
  );
}

const FriendListProgress = forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <div className={classes.container} {...{props, ref}}>
      <ProgressCard />
      <ProgressCard />
      <ProgressCard />
      <ProgressCard />
      <ProgressCard />
      <ProgressCard />
    </div>
  )
})


export default FriendListProgress