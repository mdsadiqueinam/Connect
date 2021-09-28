import React, { lazy } from "react";

const FormControl = lazy(() => import("@material-ui/core/FormControl"));
const FormHelperText = lazy(() => import("@material-ui/core/FormHelperText"));
const Input = lazy(() => import('./Input.component'));

export default function FormInput({ className, error: errors, helperText, ...rest }) {
  return (
    <FormControl className={className} error={errors !== null && errors !== undefined && errors !== ''}>
      <Input 
        {...rest} />
      <FormHelperText>
        {helperText}
      </FormHelperText>
      {errors && errors !== '' && <FormHelperText>{errors}</FormHelperText>}
    </FormControl>
  );
}
