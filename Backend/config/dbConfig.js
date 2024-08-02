const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'textecho',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbCon = mongoose.connection;
dbCon.on('error', console.error.bind(console, 'connection error:'));
dbCon.once('open', () => {
  console.log('Connected successfully');
});

module.exports = dbCon;
