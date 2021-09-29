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
      const userToUpdate = await checkAuth(context);

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
    },

    async updateUserDetails(_, { email, username, password }) {
      const userToUpdate = await checkAuth(context);

      if(!password) {
        throw new AuthenticationError("Password is required");
      }

      if ((!email && !username)) {
        throw new UserInputError("Either username or email is required to update");
      }

      if(email && !validator.isEmail(email)) {
        throw new UserInputError("Email is invalid");
      }

      if (username && !validator.isAlphanumeric(username)) {
        throw new UserInputError("Username is invalid");
      }

      try {
        if (userToUpdate.verifyPassword(password)) {
          if(email) userToUpdate.email = email;
          if(username) userToUpdate.username = username;
          await userToUpdate.save();
          return {
            ...userToUpdate._doc,
            id: userToUpdate._id,
          };
        }
      } catch (err) {
        throw new Error(err);
      }
      throw new AuthenticationError("Password is incorrect");
    },

    // Update user password
    async updatePassword(_, { oldPassword, newPassword, confirmNewPassword }, context) {
      const userToUpdate = await checkAuth(context);

      try {
        // check if user is admin or if entered password is correct
        if (userToUpdate.verifyPassword(oldPassword)) {
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
                newPassword: "password is not strong enough",
              },
            });
          }

          userToUpdate.setPassword(newPassword);
          await userToUpdate.save();

          return "Password updated successfully";
        }
      } catch (err) {
        throw new Error(err);
      }
      throw new AuthenticationError("Invalid password");
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
