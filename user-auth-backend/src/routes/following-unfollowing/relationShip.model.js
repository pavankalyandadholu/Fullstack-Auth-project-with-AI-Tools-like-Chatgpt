import mongoose from "mongoose";

const userRelationshipSchema = new mongoose.Schema({
  follower: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  following: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserRelationship = mongoose.model("UserRelationship", userRelationshipSchema);

export default UserRelationship;
