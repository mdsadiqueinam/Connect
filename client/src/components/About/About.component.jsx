import { lazy, Suspense, createContext, useContext } from "react";
import { makeStyles, withStyles, LinearProgress } from "@material-ui/core";

const Name = lazy(() => import("../Name/Name.component"));
const From = lazy(() => import("../Place/From.component"));
const Paper = lazy(() => import("@material-ui/core/Paper"));
const LivesIn = lazy(() => import("../Place/LivesIn.component"));
const CardHeader = lazy(() => import("@material-ui/core/CardHeader"));
const Description = lazy(() => import("../Description/Description.component"));
const RelationShip = lazy(() => import("../RelationShip/RelationShip.component"));

const StyledCardHeader = withStyles((theme) => ({
  root: {
    width: "100%",
    boxSizing: "border-box",
    padding: theme.spacing(1),
  },
  title: {
    fontSize: theme.spacing(2.5),
  },
  content: {
    width: "100%",
  },
  action: {
    margin: theme.spacing(1, 2),
    alignSelf: "center"
  },
}))(CardHeader);

const useStyle = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 1),
    width: "100%",
    boxSizing: "border-box",
    padding: theme.spacing(3),
  },
  container: {
    width: "100%",
    boxSizing: "border-box",
  },
  box: {
    boxSizing: "border-box",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    columnGap: "30px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      rowGap: "30px",
    },
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    marginTop: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  contentInputContainer: {
    margin: theme.spacing(2, 0),
  }
}));

const AboutContext = createContext();

function useAboutClasses() {
  const context = useContext(AboutContext);
  if (!context) {
    throw new Error("useAbout can only be used inside AboutContext provider");
  }
  return context;
}

function About() {
  const classes = useStyle();
  return (
    <Suspense fallback={<LinearProgress color="secondary"/>}>
      <AboutContext.Provider value={ classes }>
        <Paper elevation={14} className={classes.root + " css-js-container"}>
          <Name />
          <Description />
          <LivesIn />
          <From />
          <RelationShip />
        </Paper>
      </AboutContext.Provider>
    </Suspense>
  );
}

export { StyledCardHeader, AboutContext, useAboutClasses };
export default About;
