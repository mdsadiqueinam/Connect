import gql from "graphql-tag";

export const LOGIN_USER = gql`
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

export const LOGOUT_USER = gql`
  mutation logout {
    logout
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
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

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String, $image: Upload) {
    createPost(body: $body, image: $image) {
      id
      user
      body
      image
      createdAt
      username
      likes {
        id
        username
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        user
        username
      }
      likeCount
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        user
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
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

export const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation updateUserProfile(
    $userId: ID!
    $firstName: String
    $lastName: String
    $description: String
    $city: String
    $country: String
    $from: String
    $relationship: String
    $profilePicture: Upload
    $coverPicture: Upload
  ) {
    updateUserProfile(
      updateUserProfileInput: {
        userId: $userId
        firstName: $firstName
        lastName: $lastName
        description: $description
        city: $city
        country: $country
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
