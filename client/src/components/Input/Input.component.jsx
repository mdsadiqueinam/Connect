import React, { Fragment, lazy } from "react";

const InputLabel = lazy(() => import("@material-ui/core/InputLabel"));
const Input = lazy(() => import("@material-ui/core/Input"));
const InputAdornment = lazy(() => import("@material-ui/core/InputAdornment"));
const Icon = lazy(() => import("@material-ui/core/Icon"));

export default function TextField({
  id,
  label,
  type,
  endIcon,
  startIcon,
  iconColor,
  ...props
}) {
  return (
    <Fragment>
      <InputLabel htmlFor={id} className={ startIcon ? "css-js-inputlabel" : ""}>{label}</InputLabel>
      <Input
        id={id}
        type={type}
        endAdornment={
          endIcon && (
            <InputAdornment position="end">
              <Icon color={iconColor ? iconColor : "black"}>{endIcon}</Icon>
            </InputAdornment>
          )
        }
        startAdornment={
          startIcon && (
            <InputAdornment position="start">
              <Icon color={iconColor ? iconColor : "black"}>{startIcon}</Icon>
            </InputAdornment>
          )
        }
        {...props}
      />
    </Fragment>
  );
}
