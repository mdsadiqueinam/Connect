const User = require("../../../models/User.model");
const checkAuth = require("../../../utils/check-auth");
const { UserInputError } = require("apollo-server");

async function paginate(array, offset, limit, filter) {
  /**
   * @param {Array} array [Required] - An array of users friends Ids
   * @param {Int} offset [Required] - The offset of the pagination
   * @param {Int} limit [Required] - The limit of the pagination
   * @param {String} filter [Required] - The filter of the pagination
   * @return {Object} - contains the offset and the list of friendsDetails
   */

  if (!(array instanceof Array) || (offset < 0) || (limit < 1) || (typeof filter !== "string")) {
    throw new UserInputError("Invalid parameters");
  }

  var usersDetails = [];
  const pattern = filter.split("").map(char => {
    return `(?=.*${char.toLowerCase()})`
  }).join("");
  const regex = new RegExp(pattern, "gi");

  for(; offset < array.length; offset++) {
    const friend = await User.findById(array[offset]);

    if (friend) {
      const name = `${friend.firstName} ${friend.lastName}`;
      if(name.match(regex) || friend.username.match(regex)) {
        usersDetails.push({
          id: friend._id,
          username: friend.username,
          firstName: friend.firstName,
          lastName: friend.lastName,
          profilePicture: friend.profilePicture,
        });
      }

      if(usersDetails.length === limit) {
        break;
      }
    }
  }
  
  return {
    offset,
    hasMore: offset < array.length,
    usersDetails
  }
}


module.exports = {
  Query: {
    async getFriends(_, { userId, offset, limit, filter }, context) {
      await checkAuth(context);
      const user = await User.findById(userId);

      if (!user) {
        throw new UserInputError("User not found");
      }
      try {
        
        const details = await paginate(user.friends, offset, limit, filter)
        
        return {
          offset: details.offset,
          hasMore: details.hasMore,
          friendsDetails: details.usersDetails,
          filter
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async getReceivedRequests(_, { offset, limit }, context) {
      const user = await checkAuth(context);
      
      try {
        const details = await paginate(user.receivedFriendRequests, offset, limit, "");
        console.log(details);
        return {
          offset: details.offset,
          hasMore: details.hasMore,
          requests: details.usersDetails,
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async getSentRequests(_, { offset, limit }, context) {
      const user = await checkAuth(context);

      try {
        const details = await paginate(user.sentFriendRequests, offset, limit, "");
        return {
          offset: details.offset,
          hasMore: details.hasMore,
          requests: details.usersDetails,
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
