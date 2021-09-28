const gql = require('graphql-tag');
const fs = require('fs');


module.exports = gql`
    scalar Upload
    scalar Date

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type Post {
        id: ID!
        user: ID!
        username: String!
        body: String
        image: String
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
        createdAt: Date
    }

    type Comment {
        id: ID!
        user: ID!
        username: String!
        body: String!
        createdAt: String!
    }

    type Like {
        id: ID!
        user: ID!
        username: String!
        createdAt: String!
    }

    type User {
        id: ID!
        username: String
        email: String
        token: String
        firstName: String
        lastName: String
        profilePicture: String
        coverPicture: String
        description: String
        livesIn: String
        from: String
        relationship: String
        friends: [ID]
        receivedFriendRequests: [ID]
        sentFriendRequests: [ID]
        totalFriends: Int
        createdAt: Date
    }

    type FriendsListDetails {
        offset: Int!
        hasMore: Boolean!
        filter: String!
        friendsDetails: [User]!
    }

    type FriendRequests {
        offset: Int!
        hasMore: Boolean!
        requests: [User]!
    }

    type Timeline {
        offset: Int!
        posts: [Post]!
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    input UpdateUserInput {
        username: String
        email: String
    }

    input UpdateUserProfileInput {
        userId: ID!
        firstName: String
        lastName: String
        description: String
        livesIn: String
        from: String
        relationship: String
        profilePicture: Upload
        coverPicture: Upload
    }

    input UpdatePasswordInput {
        oldPassword: String!
        newPassword: String!
        confirmNewPassword: String!
    }

    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
        getUser(userId: ID!): User
        getTimeline(userId: ID!, queryType: String!, offset: Int!, limit: Int!): Timeline
        getUserProfile(userId: ID, username: String): User
        getUserPosts(userId: ID!): [Post]
        getFriends(userId: ID!, offset: Int!, limit: Int!, filter: String!): FriendsListDetails
        getReceivedRequests(offset: Int!, limit: Int!): FriendRequests
        getSentRequests(offset: Int!, limit: Int!): FriendRequests
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(usernameOremail: String!, password: String!): User!
        logout: String!
        updateUserProfile(updateUserProfileInput: UpdateUserProfileInput): User!
        updatePassword(userId: ID!, updatePasswordInput: UpdatePasswordInput): String!
        deleteUser(userId: ID!, password: String! ): String!
        createPost(body: String, image: Upload): Post!
        updatePost(postId: ID!, body: String, image: String): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!): Post!
        updateComment(postId: ID!, commentId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
        manageFriend(userId: ID!, action: String!): User!
    }
`;


//TODO: add resetPassword, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, sendMessage, acceptMessage, rejectMessage
//TODO: implement subscription for message app 