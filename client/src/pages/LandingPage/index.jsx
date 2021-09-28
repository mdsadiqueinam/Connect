import React, { lazy, Suspense } from "react";
import { useMediaQuery } from "@material-ui/core";
import logo from "../../logo2.jpg";
import LinearProgress from "@material-ui/core/LinearProgress";
import { TabPanel, a11yProps } from "components/Tab/TabPanel.component";

const Tab = lazy(() => import("@material-ui/core/Tab"));
const Tabs = lazy(() => import("@material-ui/core/Tabs"));
const Grid = lazy(() => import("@material-ui/core/Grid"));
const Paper = lazy(() => import("@material-ui/core/Paper"));
const AppBar = lazy(() => import("@material-ui/core/AppBar"));
const LoginForm = lazy(() => import("../../components/Authentication/Login.component"));
const RegisterForm = lazy(() => import("../../components/Authentication/Register.component"));


export default function LandingPage(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isMobile = useMediaQuery("(max-width:600px)");
  const xs = isMobile ? 12 : 6;

  return (
    <Suspense fallback={<LinearProgress />}>
      <Grid
        container
        justifyContent="center"
        className="css-js-primary-background"
        spacing={0}
      >
        <Grid item xs={xs}>
          <Paper>
            <img src={logo} alt="logo" style={{ width: "100%" }} />
          </Paper>
        </Grid>
        <Grid item xs={xs}>
          <div className="css-js-container" style={{ height: "100vh" }}>
            <Paper elevation={3}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="Register and Login form"
                >
                  <Tab label="Register" {...a11yProps(0)} />
                  <Tab label="Login" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <Suspense fallback={<LinearProgress />}>
                  <RegisterForm />
                </Suspense>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Suspense fallback={<LinearProgress />}>
                  <LoginForm />
                </Suspense>
              </TabPanel>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </Suspense>
  );
}
