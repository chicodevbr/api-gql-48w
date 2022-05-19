const { MongoDataSource } = require('apollo-datasource-mongodb');

class Posts extends MongoDataSource {
  getFeed() {
    return this.model.find();
  }
}

module.exports = Posts;
