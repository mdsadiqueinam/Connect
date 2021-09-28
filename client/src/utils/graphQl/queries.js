import gql from "graphql-tag";

export const FETCH_POST_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      createdAt
      likes {
        username
      }
      likeCount
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

export const FETCH_USER_POSTS = gql`
  {
    getPosts {
      id
      user
      username
      body
      image
      likeCount
      likes {
        id
        user
        username
        createdAt
      }
      comments {
        id
        user
        body
        username
        createdAt
      }
      commentCount
      createdAt
    }
  }
`;

export const FETCH_TIMELINE = gql`
  query getTimeline($userId: ID!, $queryType: String!, $offset: Int!, $limit: Int!) {
    getTimeline(userId: $userId, queryType: $queryType, offset: $offset, limit: $limit) {
      offset
      posts {
        id
        user
        username
        body
        image
        likeCount
        likes {
          id
          user
          username
          createdAt
        }
        comments {
          id
          user
          body
          username
          createdAt
        }
        commentCount
        createdAt
      }
    }
  }
`;

export const FETCH_USER_SOME_DETAILS = gql`
  query getUserProfile($userId: ID, $username: String) {
    getUserProfile(userId: $userId, username: $username) {
      id
      username
      profilePicture
    }
  }
`;

export const FETCH_USER_PROFILE = gql`
  query getUserProfile($userId: ID!) {
    getUserProfile(userId: $userId) {
      id
      username
      email
      token
      firstName
      lastName
      profilePicture
      coverPicture
      description
      city
      country
      from
      relationship
      friends
      totalFriends
      createdAt
    }
  }
`;
