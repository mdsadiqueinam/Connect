import { lazy, Suspense, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { AuthContext } from "context/Auth";
import { LOGIN_USER } from "utils/graphQl/mutation";
import { useForm } from "utils/Hooks/hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import handleErrors from "config/handleErrors";

const Button = lazy(() => import("@material-ui/core/Button"));
const Divider = lazy(() => import("@material-ui/core/Divider"));
const Container = lazy(() => import("@material-ui/core/Container"));
const FormInput = lazy(() => import("../Input/FormInput.component"));
const Typography = lazy(() => import("@material-ui/core/Typography"));
const PasswordInput = lazy(() => import("../Input/PasswordInput.component"));

export default function LoginForm() {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState(null);

  const { handleChange, handleSubmit, values } = useForm(loginUserCallback, {
    usernameOremail: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update: (_, { data: { login: userData } }) => {
      context.login(userData);
      history.push("/home");
    },
    onError: (error) => {
      if (error.graphQLErrors.length > 0) {
        setErrors(error.graphQLErrors[0].extensions.errors);
      } else {
        handleErrors(error, "login");
      }
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      { loading ? <LinearProgress /> : null }
      <Container className="css-js-container css-js-register-container">
        <Typography variant="h3" className="css-js-title">
          Login
        </Typography>
        <Divider className="css-js-divider" />
        <form
          className="css-js-root"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <FormInput
            id="usernameOremail"
            label="Username or Email"
            name="usernameOremail"
            className="css-js-textField"
            value={values.usernameOremail}
            onChange={handleChange}
            startIcon="person"
            iconColor="primary"
            helperText="Please enter your Username or Email address"
            error={errors && (errors.usernameOremail || errors.general)}
          />
          <PasswordInput
            id="password"
            label="Password"
            name="password"
            className="css-js-textField"
            value={values.password}
            onChange={handleChange}
            startIcon="lock"
            iconColor="primary"
            helperText="Please enter your Password"
            error={errors && (errors.password || errors.general)}
            visibilityFun
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={"css-js-margin"}
          >
            { loading ? <CircularProgress size={24} color="inherit"/> : "Login" }
          </Button>
        </form>
        <div
          className="css-js-margin"
        >
          <Typography className="css-js-margin" variant="body1">
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </div>
      </Container>
    </Suspense>
  );
}
