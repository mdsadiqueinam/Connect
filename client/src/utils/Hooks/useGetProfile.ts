import { useQuery, gql } from "@apollo/client";
import handleErrors from "config/handleErrors";

export const FETCH_USER_PROFILE = gql`
  query getUserProfile($userId: ID, $username: String) {
    getUserProfile(userId: $userId, username: $username) {
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

// Custom hook to get user profile
export function useGetProfile(options: any, errorLocation: string) {
  return useQuery(FETCH_USER_PROFILE, {
    ...options,
    onError: (error) => handleErrors(error, errorLocation),
  });
}

export function getUserProfile(client: any, userId: string) {
  const { getUserProfile } = client.readQuery({
    query: FETCH_USER_PROFILE,
    variables: { userId },
  });

  return getUserProfile;
}