import React, { lazy, Suspense } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Papper = lazy(() => import("@material-ui/core/Paper"));
const Typography = lazy(() => import("@material-ui/core/Typography"));
const RegisterForm = lazy(() => import("../../components/Authentication/Register.component"));

export default function RegisterPage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <div className="css-js-container css-js-primary-background" style={{ height: "100vh" }}>
        <Typography variant="h2" color="primary" style={{ marginBottom: "50px" }}>
          !Connect
        </Typography>
        <Papper elevation={3}>
          <RegisterForm />
        </Papper>
      </div>
    </Suspense>
  );
}
