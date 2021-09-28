const checkAuth = require("../../../utils/check-auth");
const Post = require("../../../models/Post.model");

const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    async createPost(_, { body, image }, context) {
      const user = await checkAuth(context);

      try {
        const newPost = new Post({
          user: user.id,
          username: user.username,
        });

        const post = await newPost.savePost(body, image);
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },

    async updatePost(_, { postId, body, image }, context) {
      const user = await checkAuth(context);

      try {
        const post = await Post.findById(postId);

        if (post.user.equals(user.id)) {
          const updatedPost = await post.savePost(body, image);
          return updatedPost;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async deletePost(_, { postId }, context) {
      const user = await checkAuth(context);

      const post = await Post.findById(postId);
      if (!post) {
        throw new UserInputError("Post not found");
      }
      if (post.user.equals(user.id)) {
        await post.deletePost();
        return "Post deleted successfully";
      } else {
        throw new AuthenticationError("Action not allowed");
      }
    },
  },
};
