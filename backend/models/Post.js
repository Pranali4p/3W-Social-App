const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    content: { type: String, required: true },
    song: { type: String },
    image: { type: String }, // only store filename
    likes: { type: Number, default: 0 },
    comments: [
      {
        username: String,
        text: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
