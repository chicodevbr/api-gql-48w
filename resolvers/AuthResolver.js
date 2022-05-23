const brcypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const environment = require('../config/environment');
require('dotenv').config();

const secretKey = environment.jwtAccessTokenSecret;

const authResolvers = {
  Query: {
    user: async (_, { id }, { dataSources: { users } }) => users.getUser(id),
    users: async (_, __, { dataSources: { users } }) => users.getAll(),
  },
  Mutation: {
    createUser: async (parent, { user }, { dataSources: { users } }) => {
      const password = await brcypt.hash(user.password, 10);
      const userCreated = await users.create({ ...user, password });
      const token = jwt.sign({ userId: userCreated.id }, secretKey);

      return {
        token,
        user: userCreated,
      };
    },
    login: async (
      parent,
      { email, password },
      { dataSources: { users } },
      info
    ) => {
      const [user] = await users.findByEmail(email);
      if (!user) {
        throw new Error('User not found.');
      }

      const isValid = await brcypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('User or password is wrong. Try again.');
      }

      const token = jwt.sign({ _id: user._id }, secretKey);

      return {
        token,
        user,
      };
    },
  },
};

module.exports = authResolvers;
