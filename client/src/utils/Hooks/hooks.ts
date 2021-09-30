import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import handleErrors from "config/handleErrors";

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

const CHECK_USERNAME = gql`
  query checkUsername($username: String!) {
    checkUsername(username: $username)
  }
`;

const CHECK_EMAIL = gql`
  query checkEmail($email: String!) {
    checkEmail(email: $email)
  }
`;

export function useCheckUsername(options: object, errorLocation: string) {
  return useQuery(CHECK_USERNAME, {
    ...options,
    onError: (error) => handleErrors(error, errorLocation),
  })
}

export function useCheckEmail(options: object, errorLocation: string) {
  return useQuery(CHECK_EMAIL, {
    ...options,
    onError: (error) => handleErrors(error, errorLocation),
  })
}
