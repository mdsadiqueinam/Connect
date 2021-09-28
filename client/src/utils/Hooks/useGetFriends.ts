import { useQuery, gql } from "@apollo/client";
import handleErrors from "config/handleErrors";

const FETCH_FRIEND_LIST = gql`
  query getFriends($userId: ID!, $offset: Int!, $limit: Int!, $filter: String!) {
    getFriends(userId: $userId, offset: $offset, limit: $limit, filter: $filter) {
      offset
      hasMore
      filter
      friendsDetails {
        id
        username
        firstName
        lastName
        profilePicture
      }
    }
  }
`;


function useGetFriends(options: object, errorLocation: string){
  return useQuery(FETCH_FRIEND_LIST, {
    ...options,
    notifyOnNetworkStatusChange: true,
    onError: (error) => handleErrors(error, errorLocation)
  })
}

export { FETCH_FRIEND_LIST };
export default useGetFriends;