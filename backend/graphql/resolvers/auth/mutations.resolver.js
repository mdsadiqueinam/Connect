const jwt = require("jsonwebtoken");
const User = require("../../../models/User.model");
const checkAuth = require("../../../utils/check-auth");
const { UserInputError, AuthenticationError } = require("apollo-server");
const { validateRegisterInput, validateLoginInput } = require("../../../utils/validation");

function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    },
    process.env.SECRET_KEY,
  );
}

module.exports = {
  Mutation: {
    // Login user
    async login(_, { usernameOremail, password }) {
      // Validate input
      const { errors, valid } = validateLoginInput(usernameOremail, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // Check if user exists
      var user = await User.findOne({ username: usernameOremail });
      if (!user) {
        user = await User.findOne({ email: usernameOremail });
        if (!user) {
          errors.general = "Invalid Credential";
          throw new UserInputError("Invalid Credential", { errors });
        }
      }

      // Check password
      const match = await user.verifyPassword(password);
      if (!match) {
        errors.general = "Invalid Credential";
        throw new UserInputError("Invalid Credential", { errors });
      }

      // check user is verified
      if (user.verified === false) {
        errors.general = "User is not verified please verify your email first";
        throw new AuthenticationError("User not verified", { errors });
      }
      try {
        // Create JWT
        const token = generateToken(user);

        user.isActive = true;
        await user.save();

        // Return token
        return {
          ...user._doc,
          id: user._id,
          token,
        };
      } catch (err) {
        throw new Error(err);
      }
    },

    // logout user
    async logout(_, args, context) {
      const user = await checkAuth(context);

      try {
        user.isActive = false;
        await user.save();

        return "user logged out successfully";
      } catch (err) {
        throw new Error(err);
      }
    },

    // Register a new user
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context
    ) {
      //validate userData
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      //check if user already exists
      var user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username already exists", {
          errors: {
            username: "Username already exists",
          },
        });
      }
      user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("Email already exists", {
          errors: {
            email: "Email already exists",
          },
        });
      }

      //Creating new user
      const newUser = new User({
        username,
        email,
        isActive: true,
      });

      try {
        newUser.setPassword(password);

        const res = await newUser.save();

        // Create JWT
        const token = generateToken(res);

        return {
          ...res._doc,
          id: res._id,
          token,
        };
      } catch (err) {
        throw new Error(err);
      }
    },


    async updateUserSettings(_, { email, username, password }, context) {
      const userToUpdate = await checkAuth(context);

      if(!password) {
        throw new AuthenticationError("Password is required");
      }

      if ((!email && !username)) {
        throw new UserInputError("Either username or email is required to update");
      }

      if(email && !validator.isEmail(email)) {
        throw new UserInputError("Email is invalid");
      } else if (email) {
        const userWithEmail = await User.findOne({ email });
        if (userWithEmail && userWithEmail.id !== userToUpdate.id) {
          throw new UserInputError("Email is already in use");
        }
      }

      if (username && !validator.isAlphanumeric(username)) {
        throw new UserInputError("Username is invalid");
      } else if (username) {
        const userWithUsername = await User.findOne({ username });
        if (userWithUsername && userWithUsername.id !== userToUpdate.id) {
          throw new UserInputError("Username is already in use");
        }
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
