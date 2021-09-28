const checkAuth = require("../../../utils/check-auth");
const Post = require("../../../models/Post.model");


module.exports = {
  Query: {
    // get all posts of user as well as all posts of users friends
    async getTimeline(_, { userId, queryType, offset, limit }, context) {
      const currentUser = await checkAuth(context);
      
      try {
        var userFriends = [];
        if (queryType === "timeline") {
          userFriends = currentUser.friends;
        }

        // find all posts of user and friends of user with given offset and limit
        // and return the posts in descending order , next offset
        const posts = await Post.find({
          $or: [
            { user: userId },
            { user: { $in: userFriends } }
          ]
        }).sort({ createdAt: -1 })
          .skip(offset)
          .limit(limit);

        return {
          posts,
          offset: offset + limit
        };
      } catch (err) {
        throw new Error(err);
      }
    },

    async getPosts(_, args, context) {
      const user = await checkAuth(context);
      try {
        const posts = await Post.find({ user: user.id }).sort({
          createdAt: -1,
        });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
