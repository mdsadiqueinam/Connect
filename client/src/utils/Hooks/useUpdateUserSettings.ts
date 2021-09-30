import { useMutation, gql } from "@apollo/client";
import handleErrors from "config/handleErrors";

const UPDATE_USER_Settings = gql`
  mutation updateUserSettings($email: String, $username: String, $password: String!) {
    updateUserSettings(email: $email, username: $username, password: $password) {
      id
      username
      email
      token
      firstName
      lastName
      profilePicture
      coverPicture
      description
      livesIn
      from
      relationship
      friends
      totalFriends
      createdAt
    }
  }
`;

function useUpdateUserSettings(options: object, errorLocation: string) {
  return useMutation(UPDATE_USER_Settings, {
    ...options,
    onError: (error) => handleErrors(error, errorLocation),
  });
}

export default useUpdateUserSettings;