const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    content: { type: String, required: true },
    song: { type: String },
    image: { type: String },
    likes: { type: [String], default: [] },
    comments: { type: [{ user: String, text: String }], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
