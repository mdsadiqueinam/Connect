const User = require("../../../models/User.model");
const checkAuth = require("../../../utils/check-auth");
const { UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    async getUser(_, { userId }, context) {
      await checkAuth(context);
      const user = await User.findById(userId);

      if (!user) {
        throw new UserInputError("User not found");
      }

      return {
        ...user._doc,
        id: user._id,
      };
    },

    async getUserProfile(_, { userId, username }, context) {
      await checkAuth(context);
      var user = null;
      if (userId) {
        user = await User.findById(userId);
      } else if (username) {
        user = await User.findOne({ username });
      }
      if (!user) {
        throw new UserInputError("User not found");
      }

      return {
        ...user._doc,
        id: user._id,
      };
    },
  },
};
