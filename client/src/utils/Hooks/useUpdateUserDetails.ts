import { useMutation, gql } from "@apollo/client";
import handleErrors from "config/handleErrors";

const UPDATE_USER_DETAILS = gql`
  mutation updateUserDetails($email: String, $username: String, $password: String!) {
    updateUserDetails(email: $email, username: $username, password: $password) {
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

function useUpdateUserDetails(options: object, errorLocation: string) {
  return useMutation(UPDATE_USER_DETAILS, {
    ...options,
    onError: (error) => handleErrors(error, errorLocation),
  });
}

export default useUpdateUserDetails;