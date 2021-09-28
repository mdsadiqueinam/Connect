import { lazy, Suspense, useState, useContext } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

import { useForm } from "utils/Hooks/hooks";
import { useMutation } from "@apollo/client";
import { AuthContext } from "context/Auth";
import { REGISTER_USER } from "utils/graphQl/mutation";
import handleErrors from "config/handleErrors";


const Button = lazy(() => import("@material-ui/core/Button"));
const Container = lazy(() => import("@material-ui/core/Container"));
const Typography = lazy(() => import("@material-ui/core/Typography"));
const Divider = lazy(() => import("@material-ui/core/Divider"));
const FormInput = lazy(() => import("../Input/FormInput.component"));
const PasswordInput = lazy(() => import("../Input/PasswordInput.component"));

export default function RegisterForm(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState(null);

  const { handleChange, handleSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, { data: { register: userData } }) => {
      context.login(userData.token);
      props.history.push("/home");
    },
    onError: (err) => {
      if (err.graphQLErrors.length > 0) {
        setErrors(err.graphQLErrors[0].extensions.errors);
      } else {
        handleErrors(err, "registration");
      }
    },
    variables: values,
  });

  function registerUserCallback() {
    addUser();
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      { loading ? <LinearProgress/> : null }
      <Container className="css-js-container css-js-register-container loading">
        <Typography variant="h3" className="css-js-title">
          Register
        </Typography>
        <Divider className="css-js-divider" />
        <form
          className="css-js-root"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <FormInput
            id="username"
            label="Username"
            name="username"
            className="css-js-textField"
            error={errors && (errors.username || errors.general)}
            onChange={handleChange}
            value={values.username}
            startIcon="person"
            iconColor="primary"
            helperText="username can only contain letters, numbers, and special characters like
            _, -, ., @, but without spaces"
          />
          <FormInput
            id="email"
            label="Email"
            name="email"
            className="css-js-textField"
            error={errors && (errors.email || errors.general)}
            onChange={handleChange}
            value={values.email}
            startIcon="email"
            iconColor="primary"
            helperText="Email must be valid"
          />
          <PasswordInput
            id="password"
            label="Password"
            name="password"
            className="css-js-textField"
            error={errors && (errors.password || errors.general)}
            onChange={handleChange}
            value={values.password}
            startIcon="lock"
            iconColor="primary"
            helperText="Password must be at least 8 characters long and contain at least one number, one letter, and one special character"
            visibilityFun
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            className="css-js-textField"
            error={errors && (errors.confirmPassword || errors.general)}
            onChange={handleChange}
            value={values.confirmPassword}
            startIcon="lock"
            iconColor="primary"
            helperText="Please confirm your password"
            visibilityFun
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="css-js-margin loading"
          >
            { loading ? <CircularProgress size={24} color='inherit'/> : "Register" }
          </Button>
        </form>
        <div className="css-js-margin">
          <Typography variant="body1" className="css-js-margin">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </div>
      </Container>
    </Suspense>
  );
}
