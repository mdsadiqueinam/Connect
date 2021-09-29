import { lazy, Suspense, useState } from "react";
import { makeStyles, LinearProgress, CircularProgress } from "@material-ui/core";
import { TabPanel, a11yProps } from "components/Tab/TabPanel.component";

const Tab = lazy(() => import("@material-ui/core/Tab"));
const Tabs = lazy(() => import("@material-ui/core/Tabs"));
const AppBar = lazy(() => import("@material-ui/core/AppBar"));
const SentRequests = lazy(() => import("./SentRequests.component"));
const ReceivedRequests = lazy(() => import("./ReceivedRequests.component"));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

function Requests() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Suspense fallback={<CircularProgress />}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Received Requests" {...a11yProps(0)} />
            <Tab label="Sent Requests" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <Suspense fallback={<LinearProgress color="secondary" />}>
          <TabPanel value={value} index={0}>
            <ReceivedRequests />
          </TabPanel>
          <TabPanel value={value} index={1} className={`css-js-container`}>
            <SentRequests />
          </TabPanel>
        </Suspense>
      </Suspense>
    </div>
  );
}


export default Requests;