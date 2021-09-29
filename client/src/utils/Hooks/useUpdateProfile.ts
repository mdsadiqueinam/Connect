import { useMutation, gql } from "@apollo/client";
import handleErrors from "config/handleErrors";

const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation updateUserProfile(
    $firstName: String
    $lastName: String
    $description: String
    $livesIn: String
    $from: String
    $relationship: String
    $profilePicture: Upload
    $coverPicture: Upload
  ) {
    updateUserProfile(
      updateUserProfileInput: {
        firstName: $firstName
        lastName: $lastName
        description: $description
        livesIn: $livesIn
        from: $from
        relationship: $relationship
        profilePicture: $profilePicture
        coverPicture: $coverPicture
      }
    ) {
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

function useUpdateProfile(options: any, errorLocation: string) {
  return useMutation(UPDATE_USER_PROFILE_MUTATION, {
    ...options,
    onError: (error) => handleErrors(error, errorLocation),
  });
}

export default useUpdateProfile;
