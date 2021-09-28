const User = require("../../../models/User.model");
const validator = require("validator");
const checkAuth = require("../../../utils/check-auth");
const { UserInputError, AuthenticationError } = require("apollo-server");


module.exports = {
  Mutation: {
    // Update user profile
    async updateUserProfile(
      _,
      {
        updateUserProfileInput: {
          userId,
          firstName,
          lastName,
          description,
          livesIn,
          from,
          relationship,
          profilePicture,
          coverPicture,
        },
      },
      context
    ) {
      const user = await checkAuth(context);

      const userToUpdate = await User.findById(userId);
      if (!userToUpdate) {
        throw new UserInputError("User not found");
      }

      if (user.isAdmin || user.id === userId) {
        try {
          await userToUpdate.userUpdate({
            firstName,
            lastName,
            description,
            livesIn,
            from,
            relationship,
            profilePicture,
            coverPicture,
          });

          return {
            ...userToUpdate._doc,
            id: userToUpdate._id,
          };
        } catch (err) {
          throw new Error(err);
        }
      } else
        throw new AuthenticationError("Invalid credential: Action not allowed");
    },

    // Update user password
    async updatePassword(
      _,
      {
        userId,
        updatePasswordInput: { oldPassword, newPassword, confirmNewPassword },
      },
      context
    ) {
      const user = await checkAuth(context);

      try {
        const userToUpdate = await User.findById(userId);
        if (!userToUpdate) {
          throw new UserInputError("User not found");
        }

        // check if user is admin or if entered password is correct
        if (
          user.isAdmin ||
          (user.id === userToUpdate.id &&
            userToUpdate.verifyPassword(oldPassword))
        ) {
          // check if new password is valid
          if (newPassword !== confirmNewPassword) {
            throw new UserInputError("New passwords does not match", {
              errors: {
                newPassword: "New passwords does not match",
              },
            });
          }

          if (!validator.isStrongPassword(newPassword)) {
            throw new UserInputError("Invalid password", {
              errors: {
                newPassword: "Invalid new password",
              },
            });
          }

          userToUpdate.setPassword(newPassword);
          await userToUpdate.save();

          return "Password updated successfully";
        } else
          throw new AuthenticationError("Unauthorized user", {
            errors: { general: "User is not allowed to update details" },
          });
      } catch (err) {
        throw new Error(err);
      }
    },

    // Delete user
    async deleteUser(_, { userId, password }, context) {
      const user = await checkAuth(context);

      try {
        const userToDelete = await User.findById(userId);

        if (!userToDelete) {
          throw new UserInputError("User not found");
        }

        // check if user is admin or if entered password is correct
        if (
          user.isAdmin ||
          (user.id === userToDelete.id && userToDelete.verifyPassword(password))
        ) {
          await userToDelete.remove();
          return "User deleted successfully";
        } else
          throw new AuthenticationError("Unauthorized user", {
            errors: { general: "User is not allowed to delete this account" },
          });
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
