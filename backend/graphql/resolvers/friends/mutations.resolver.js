const User = require("../../../models/User.model");
const checkAuth = require("../../../utils/check-auth");
const { UserInputError, AuthenticationError } = require("apollo-server");

async function checkUsersRequest(currentUser, checkWithUser, action) {
  /**
   * @param {Object} currentUser [Required] instance of User model
   * @param {Object} checkWithUser [Required] instance of User model
   */

  if (!currentUser || !checkWithUser) {
    throw new UserInputError("user not found");
  }

  if (!(currentUser instanceof User) || !(checkWithUser instanceof User)) {
    throw new UserInputError("Invalid Parameters");
  }

  if (currentUser._id === checkWithUser._id) {
    throw new AuthenticationError(
      "Invalid credential: User cannot send friend request to itself"
    );
  }

  if (action !== "remove" && currentUser.friends.indexOf(checkWithUser._id) !== -1) {
    throw new AuthenticationError(
      "Invalid credential: User is already friends with this user"
    );
  }
}

module.exports = {
  Mutation: {
    async manageFriend(_, { userId, action }, context) {
      const currentUser = await checkAuth(context);
      const userToManage = await User.findById(userId);

      await checkUsersRequest(currentUser, userToManage, action);

      try {
        var isActionSuccess = false;

        switch (action) {
          case "send":
            if (
              currentUser.sentFriendRequests.indexOf(userToManage._id) === -1 ||
              userToManage.receivedFriendRequests.indexOf(currentUser._id ) === -1
            ) {
              currentUser.sentFriendRequests.addToSet(userToManage._id);
              userToManage.receivedFriendRequests.addToSet(currentUser._id);
              isActionSuccess = true;
            }
            break;
          case "accept":
            if (
              currentUser.receivedFriendRequests.indexOf(userToManage._id) !== -1
            ) {
              currentUser.receivedFriendRequests.pull(userToManage._id);
              userToManage.sentFriendRequests.pull(currentUser._id);
              currentUser.friends.addToSet(userToManage._id);
              userToManage.friends.addToSet(currentUser._id);
              isActionSuccess = true;
            }
            break;
          case "reject":
            if (
              currentUser.receivedFriendRequests.indexOf(userToManage._id) !== -1
            ) {
              currentUser.receivedFriendRequests.pull(userToManage._id);
              userToManage.sentFriendRequests.pull(currentUser._id);
              isActionSuccess = true;
            }
            break;
          case "cancel":
            if (
              currentUser.sentFriendRequests.indexOf(userToManage._id) !== -1
            ) {
              currentUser.sentFriendRequests.pull(userToManage._id);
              userToManage.receivedFriendRequests.pull(currentUser._id);
              isActionSuccess = true;
            }
            break;
          case "remove":
            if (currentUser.friends.indexOf(userToManage._id) !== -1) {
              currentUser.friends.pull(userToManage._id);
              userToManage.friends.pull(currentUser._id);
              isActionSuccess = true;
            }
            break;
          default:
            throw new UserInputError("Invalid action");
        }

        if (isActionSuccess) {
          await currentUser.save();
          await userToManage.save();
          return currentUser;
        }
      } catch (err) {
        throw new Error(err);
      }

      throw new AuthenticationError("Action not allowed");
    },
  },
};
