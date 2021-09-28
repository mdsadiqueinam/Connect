const jwt = require("jsonwebtoken");

const checkAuth = require("../../../utils/check-auth");
const { UserInputError, AuthenticationError } = require("apollo-server");
const { validateRegisterInput, validateLoginInput } = require("../../../utils/validation");

const User = require("../../../models/User.model");

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
      context,
      info
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
  },
};
