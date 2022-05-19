const { Post } = require('../db');
const { convertToSlug } = require('../helpers/functions');
const { UserInputError } = require('apollo-server');

const postResolver = {
  Query: {
    async posts() {
      return await Post.find({});
    },
    async post(_, { id }) {
      return await Post.findById(id);
    },
    async slug(_, { slug }) {
      const response = await Post.findOne({ slug: slug });

      return response;
    },
  },
  Mutation: {
    createPost(_, { post }, { db: { Post }, userId }) {
      let updatedPost;
      const slug = convertToSlug(post.title);
      updatedPost = { ...post, slug };
      updatedPost = { ...updatedPost, author: userId };

      console.log(updatedPost);
      console.log(userId);

      const newPost = new Post(updatedPost);
      return newPost.save();
    },
    async updatePost(_, { id, post }) {
      return await Post.findByIdAndUpdate(id, post, {
        new: true,
      });
    },
    async deletePost(_, { id }) {
      try {
        const isExist = await Post.findById(id);

        if (!isExist) {
          throw new UserInputError('Invalid argument value', {
            argumentName: 'id',
          });
        } else {
          return await Post.findByIdAndRemove(id);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = postResolver;
