const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const videoSchema = new Schema({
  title: String,
  description: String,
  imgPath: String,
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

var Video = mongoose.model("Video", videoSchema);
module.exports = Video;