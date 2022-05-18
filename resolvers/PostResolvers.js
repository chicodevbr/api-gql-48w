const { Post } = require('../models');
const { convertToSlug } = require('../helpers/functions');

const postResolver = {
  Query: {
    async posts() {
      return await Post.find({});
    },
    async post(_, { id }) {
      return await Post.findById(id);
    },
    async slug(_, { slug }) {
      return await Post.findOne({ slug: slug });
    },
  },
  Mutation: {
    createPost(_, { post }) {
      const slug = convertToSlug(post.title);
      const updatePost = { ...post, slug };

      const newPost = new Post(updatePost);
      return newPost.save();
    },
    async updatePost(_, { id, post }) {
      return await Post.findByIdAndUpdate(id, post, {
        new: true,
      });
    },
    async deletePost(_, { id }) {
      const isExist = await Post.findById(id);

      return await Post.findByIdAndRemove(id);
    },
  },
};

module.exports = postResolver;
