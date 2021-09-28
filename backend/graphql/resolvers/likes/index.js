const Post = require("../../../models/Post.model");
const checkAuth = require("../../../utils/check-auth");

const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    async likePost(_, { postId }, context) {
      const user = await checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (post) {
          const like = await post.likes.find(
            (like) => like.user.equals(user.id)
          );
          if(like) {
            //user already liked this post unlike it
            like.remove();
          } else {
            // like the post
            post.likes.push({
              user: user.id,
              username: user.username,
              createdAt: new Date().toISOString(),
            });
          }

          await post.save();
          return post;
        } else throw new UserInputError("post not found");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
