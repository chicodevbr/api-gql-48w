const { Post } = require('../models');

const postResolver = {
  Query: {
    async posts() {
      return await Post.find({});
    },
  },
};

module.exports = postResolver;
