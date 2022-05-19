const mongoose = require('mongoose');

const dbUri = process.env.URI;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUri, dbOptions);

const db = mongoose.connection;

db.on('Error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('\u{1F516} Database connected');
});
