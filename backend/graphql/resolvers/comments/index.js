const Post = require("../../../models/Post.model");
const checkAuth = require("../../../utils/check-auth");

const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const user = await checkAuth(context);

      if (!body || body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }

      try {
        const post = await Post.findById(postId);
        if (post) {
          post.comments.unshift({
            user: user.id,
            username: user.username,
            body,
            createdAt: new Date().toISOString(),
          });
          await post.save();
          return post;
        } else {
          throw new UserInputError("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async updateComment(_, { postId, commentId, body }, context) {
      const user = await checkAuth(context);

      if (!body || body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }

      try {
        const post = await Post.findById(postId);
        const comment = post.comments.id(commentId);
        if (comment.user.equals(user.id)) {
          comment.body = body;
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    
    async deleteComment(_, { postId, commentId }, context) {
      const user = await checkAuth(context);

      try {
        const post = await Post.findById(postId);
        const comment = post.comments.id(commentId);
        if (post.user.equals(user.id) || comment.user.equals(user.id)) {
          comment.remove();
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
