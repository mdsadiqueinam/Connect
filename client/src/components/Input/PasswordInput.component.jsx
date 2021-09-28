import React, { lazy } from "react";

const FormInput = lazy(() => import("./FormInput.component"));
const InputAdornment = lazy(() => import("@material-ui/core/InputAdornment"));
const IconButton = lazy(() => import("@material-ui/core/IconButton"));
const Visibility = lazy(() => import("@material-ui/icons/Visibility"));
const VisibilityOff = lazy(() => import("@material-ui/icons/VisibilityOff"));

export default function PasswordInput({ visibilityFun, ...rest }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const passwordVisibilityFun = visibilityFun
    ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }
    : null;

  return (
    <FormInput
      type={showPassword ? "text" : "password"}
      {...passwordVisibilityFun}
      {...rest}
    />
  );
}
