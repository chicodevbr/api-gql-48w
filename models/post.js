const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: String,
  content: String,
  coverImage: String,
  author: String,
  tags: [String],
  slug: String,
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model('Post', PostSchema);
