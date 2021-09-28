const postsResolver = require('./posts');
const usersResolver = require('./users');
const authResolver  = require('./auth');
const likesResolver = require('./likes');
const friendsResolver = require('./friends');
const GraphQLDateTime = require('graphql-iso-date');
const commentsResolver = require('./comments');
const GraphQLUpload = require('graphql-upload');

module.exports = {
    Upload: GraphQLUpload,
    Date: GraphQLDateTime,
    
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length,
    },
    User: {
        totalFriends: (parent) => parent.friends.length,
    },
    Query: {
        ...postsResolver.Query,
        ...usersResolver.Query,
        ...friendsResolver.Query,
    },
    Mutation: {
        ...authResolver.Mutation,
        ...usersResolver.Mutation,
        ...postsResolver.Mutation,
        ...commentsResolver.Mutation,
        ...likesResolver.Mutation,
        ...friendsResolver.Mutation,
    }
};