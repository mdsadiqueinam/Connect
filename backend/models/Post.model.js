const { model, Schema } = require('mongoose');
const { UserInputError } = require("apollo-server");
const { uploadFile, deleteFile } = require("../utils/Amazon-s3");

const PostSchema = new Schema({
    body: String,
    image: String,
    username: String,
    comments: [{
        body: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
        createdAt: String
    }],
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
        createdAt: String
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


//Method to save post
PostSchema.methods.savePost = async function (body, image) {
    if ((!body && !image) || (body && body.trim() === "" && image && image.trim() === "")) {
        throw new UserInputError("Cannot create an empty post");
    }

    if (body && body.trim() !== "") {
        this.body = body;
    }
    if (image && image.file) {
        const data = await uploadFile(this.user, image.file);
        this.image = data.Location;
    }

    this.save();
    return this;
}

PostSchema.methods.deletePost = async function () {
    if (this.image && this.image.trim() !== "") {
        await deleteFile(this.image);
    }
    this.remove();
}

module.exports = model('Post', PostSchema);