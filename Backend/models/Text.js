const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
  urlId: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  createdAt: { type: Date, expires: '1h', default: Date.now },
});

const Text = mongoose.model('Text', textSchema);

module.exports = Text;
