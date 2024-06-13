const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("config");
const { ObjectId } = mongoose.Schema.Types;
const deepPopulate = require("mongoose-deep-populate")(mongoose);

const defaultNoProfileUrl ="https://firebasestorage.googleapis.com/v0/b/marketplace-c9f19.appspot.com/o/pics%2Fimages.jpeg?alt=media&token=0ed4aa18-d1de-403a-bf27-80493da871f5"
const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(8).max(255).required(),
    profilePhoto: Joi.string().uri().max(255),
    coverPhoto: Joi.string().uri().max(255),
  });
  return schema.validate(data);
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      maxlength: 255,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 255,
      required: true,
    },
    ratings: {
      type: ObjectId,
      ref: "Rating",
    },
    profilePhoto: {
      type: String,
      default: defaultNoProfileUrl,
    },
    coverPhoto: {
      type: String,
      default: defaultNoProfileUrl,
    },
    conversations: [
      {
        conversation: {
          type: ObjectId,
          ref: "Conversation",
        },
        status: {
          type: String,
          enum: ["active", "archived", "removed"],
          default: "active",
        },
      },
    ],
    expoToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.plugin(deepPopulate, {
  populate: {
    "conversations.conversation.messages.createdBy": {
      select: "name",
    },
    "conversations.conversation.createdTo": {
      select: "name",
    },
    "conversations.conversation.createdBy": {
      select: "name",
    },
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      email: this.email,
      name: this.name,
      profilePhoto: this.profilePhoto,
      coverPhoto: this.coverPhoto,
    },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.validate = validate;
