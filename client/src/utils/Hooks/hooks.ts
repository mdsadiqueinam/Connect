import { useState } from "react";

export const useForm = (callback: Function, initialState: any = {}) => {
  const [values, setValues] = useState(initialState);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    callback();
  };

  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return {
    handleSubmit,
    handleChange,
    values,
  };
};

