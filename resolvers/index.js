const Post = require('./PostResolvers');
const Auth = require('./AuthResolver');

const resolvers = [Post, Auth];

module.exports = resolvers;
