const checkAuth = require("../../../utils/check-auth");

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
  },
};
