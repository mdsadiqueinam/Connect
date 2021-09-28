import { useMutation, gql } from "@apollo/client";
import handleErrors from "config/handleErrors";

const LOGIN_USER = gql`
  mutation login($usernameOremail: String!, $password: String!) {
    login(usernameOremail: $usernameOremail, password: $password) {
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
      receivedFriendRequests
      sentFriendRequests
      createdAt
    }
  }
`;

function useLogin(options: any, errorLocation: string) {
  return useMutation(LOGIN_USER, {
    ...options,
    onError: (error) => handleErrors(error, errorLocation),
  });
}

export default useLogin;