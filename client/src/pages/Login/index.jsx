import { lazy, Suspense } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Paper = lazy(() => import("@material-ui/core/Paper"));
const Login = lazy(() => import("../../components/Authentication/Login.component"));
const Typography = lazy(() => import("@material-ui/core/Typography"));

export default function LoginPage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <div className="css-js-container css-js-primary-background" style={{ height: "100vh" }}>
        <Typography variant="h2" color="primary" style={{ marginBottom: "50px" }}>
          !Connect
        </Typography>
        <Paper elevation={3}>
          <Login />
        </Paper>
      </div>
    </Suspense>
  );
}
