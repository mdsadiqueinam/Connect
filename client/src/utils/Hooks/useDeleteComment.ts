import { useMutation, gql } from "@apollo/client";
import handleErrors from "config/handleErrors";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

export default function useDeleteComment(options: any, errorLocation: string) {
  return useMutation(DELETE_COMMENT_MUTATION, {
    ...options,
    onError: (err) => handleErrors(err, errorLocation),
  });
}
