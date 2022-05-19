const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: String,
  content: String,
  coverImage: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  slug: String,
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Post', PostSchema);
