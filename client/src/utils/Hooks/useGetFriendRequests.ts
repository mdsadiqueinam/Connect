import { useQuery, gql } from "@apollo/client";
import handleErrors from "config/handleErrors";

const GET_RECEIVED_FRIEND_REQUESTS = gql`
  query getReceivedRequests($offset: Int!, $limit: Int!) {
    getReceivedRequests(offset: $offset, limit: $limit) {
      offset
      hasMore
      requests {
        id
        username
        firstName
        lastName
        profilePicture
      }
    }
  }
`;

const GET_SENT_FRIEND_REQUESTS = gql`
  query getSentRequests($offset: Int!, $limit: Int!) {
    getSentRequests(offset: $offset, limit: $limit) {
      offset
      hasMore
      requests {
        id
        username
        firstName
        lastName
        profilePicture
      }
    }
  }
`;

function useGetReceivedRequests(options: object, errorLocation: string) {
  return useQuery(GET_RECEIVED_FRIEND_REQUESTS, {
    ...options,
    onError: (error) => handleErrors(error, errorLocation),
  });
}

function useGetSentRequests(options: object, errorLocation: string) {
  return useQuery(GET_SENT_FRIEND_REQUESTS, {
    ...options,
    onError: (error) => handleErrors(error, errorLocation),
  });
}

export { useGetReceivedRequests, useGetSentRequests };
