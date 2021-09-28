import { useMutation, gql } from "@apollo/client";
import handleErrors from "config/handleErrors";

const MANAGE_FRIEND = gql`
  mutation manageFriend($userId: ID!, $action: String!) {
    manageFriend(userId: $userId, action: $action) {
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

function useManageFriend(options: object, errorLocation: string) {
  return useMutation(MANAGE_FRIEND, {
    ...options,
    onError: (error) => handleErrors(error, errorLocation),
  });
}


function useSendFriendRequest(userId: string, callback: (data: any) => void) {
  return useManageFriend(
    {
      variables: {
        userId,
        action: "send",
      },
      onCompleted: (data: any) => {
        callback(data);
      },
    },
    "send friend request"
  );
}

function useAcceptFriendRequest(userId: string, callback: (data: any) => void) {
  return useManageFriend(
    {
      variables: {
        userId,
        action: "accept",
      },
      onCompleted: (data: any) => {
        callback(data);
      },
    },
    "accept friend request"
  );
}

function useRejectFriendRequest(userId: string, callback: (data: any) => void) {
  return useManageFriend(
    {
      variables: {
        userId,
        action: "reject",
      },
      onCompleted: (data: any) => {
        callback(data);
      },
    },
    "reject friend request"
  );
}

function useCancelFriendRequest(userId: string, callback: (data: any) => void) {
  return useManageFriend(
    {
      variables: {
        userId,
        action: "cancel",
      },
      onCompleted: (data: any) => {
        callback(data);
      },
    },
    "cancel friend request"
  );
}

function useRemoveFriend(userId: string, callback: (data: any) => void) {
  return useManageFriend(
    {
      variables: {
        userId,
        action: "remove",
      },
      onCompleted: (data: any) => {
        callback(data);
      },
    },
    "remove friend"
  );
}

export {
  useSendFriendRequest,
  useAcceptFriendRequest,
  useRejectFriendRequest,
  useCancelFriendRequest,
  useRemoveFriend,
};
export default useManageFriend;
