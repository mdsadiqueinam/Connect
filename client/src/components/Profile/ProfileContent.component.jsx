import { lazy, Suspense, memo, useState } from "react";
import { makeStyles, LinearProgress, CircularProgress } from "@material-ui/core";
import { TabPanel, a11yProps } from "components/Tab/TabPanel.component";
import { useProfile } from "context/Profile";

const Tab = lazy(() => import("@material-ui/core/Tab"));
const Tabs = lazy(() => import("@material-ui/core/Tabs"));
const Feeds = lazy(() => import("components/Feeds/Feeds.component"));
const About = lazy(() => import("components/About/About.component"));
const AppBar = lazy(() => import("@material-ui/core/AppBar"));
const FriendsWithData = lazy(() => import("components/Friends/FriendsWithData.component"));


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "60rem",
    backgroundColor: theme.palette.background.paper,
  },
}));

function ProfileContent() {
  const { userId, profile: { totalFriends } } = useProfile();
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Suspense fallback={<CircularProgress />}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Posts" {...a11yProps(0)} />
            <Tab label="About" {...a11yProps(1)} />
            <Tab label="Friends" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <Suspense fallback={<LinearProgress color="secondary" />}>
          <TabPanel value={value} index={0} className="css-js-container">
            <Feeds queryType={"posts"} userId={userId}/>
          </TabPanel>
          <TabPanel value={value} index={1} className="css-js-container">
            <About />
          </TabPanel>
          <TabPanel value={value} index={2} className="css-js-container">
            <FriendsWithData userId={userId} totalFriends={totalFriends}/>
          </TabPanel>
        </Suspense>
      </Suspense>
    </div>
  );
}


export default memo(ProfileContent);