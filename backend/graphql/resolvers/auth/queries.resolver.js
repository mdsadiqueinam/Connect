const jwt = require("jsonwebtoken");
const User = require("../../../models/User.model");
const validator = require("validator");
const { AuthenticationError } = require("apollo-server");

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

async function checkUser(context) {
  const authHeader = context.req.headers.authorization;

  if (authHeader && authHeader !== "") {
    // Bearer token
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      var currentUser = null;
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        currentUser = await User.findById(user.id);
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
      if (!currentUser) {
        throw new AuthenticationError("User not found");
      }
      if (!currentUser.isActive) {
        throw new AuthenticationError("User is not active");
      }
      return currentUser;
    } else {
      throw new Error("Authentication token must be 'Bearer' [token]");
    }
  }
  return null;
}

module.exports = {
  Query: {
    async checkUsername(_, { username }, context) {
      const currentUser = await checkUser(context);
      const user = await User.findOne({ username });

      if ((!user || (user && currentUser && user._id === currentUser._id)) && validator.isAlphanumeric(username)) {
        return true;
      }
      return false;
    },

    async checkEmail(_, { email }, context) {
      const currentUser = await checkUser(context);
      const user = await User.findOne({ email });

      if ((!user || (user && currentUser && user._id === currentUser._id)) && validator.isEmail(email)) {
        return true;
      }
      return false;
    }
  },
};
