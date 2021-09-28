const { model, Schema } = require("mongoose");
const { uploadFile, deleteFile } = require("../utils/Amazon-s3");
const crypto = require("crypto");

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: String,
    salt: String,
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    coverPicture: { type: String, default: "" },
    description: { type: String, maxlength: 100, default: "" },
    livesIn: { type: String, default: "" },
    from: { type: String, maxlength: 50, default: "" },
    relationship: { type: String, enum: ["Single", "RelationShip", "Engaged", "Married"], default: "Single" },
    friends: { type: Array, default: [] },
    receivedFriendRequests: { type: Array, default: [] },
    sentFriendRequests: { type: Array, default: [] },
    isActive: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    images: []
  },
  {
    timestamps: true,
  }
);

// Method to set salt and hash the password for user
UserSchema.methods.setPassword = function (password) {
    
  //creating a unique salt for each user
  this.salt = crypto.randomBytes(16).toString("hex");

  // Hashing user's salt and password with 1000 iterations
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

// Method to verify user's password
UserSchema.methods.verifyPassword = function (password) {
  // Hashing user's password with 1000 iterations
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.password === hash;
};

//Method to update user
UserSchema.methods.userUpdate = async function (data) {
  
  if(data.profilePicture) {
    const file = await uploadFile(this.id, data.profilePicture.file);
    this.profilePicture = file.Location;
  }

  if(data.coverPicture) {
    const file = await uploadFile(this.id, data.coverPicture.file);
    this.coverPicture = file.Location;
  }

  if(data.relationship) this.relationship = data.relationship;
  if(data.description !== null && data.description !== undefined) this.description = data.description;
  if(data.firstName !== null && data.firstName !== undefined) this.firstName = data.firstName;
  if(data.lastName !== null && data.lastName !== undefined) this.lastName = data.lastName;
  if(data.livesIn !== null && data.livesIn !== undefined) this.livesIn = data.livesIn;
  if(data.from !== null && data.from !== undefined) this.from = data.from;
  this.save();
}

module.exports = model("User", UserSchema);
