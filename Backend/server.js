


const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://vikashchand2020:765qWJ5RQU4HRqv9@cluster0.dtams9e.mongodb.net/?retryWrites=true&w=majority/textapp', { useNewUrlParser: true, useUnifiedTopology: true });


const textSchema = new mongoose.Schema({
  urlId: String,
  content: String,
  createdAt: { type: Date, expires: '1h', default: Date.now },
});

const Text = mongoose.model('Text', textSchema);

app.use(express.json());

app.get('/', (req, res) => {
  const urlId = uuidv4();
  res.redirect(`/text/${urlId}`);
});

app.get('/text/:urlId', async (req, res) => {
  const text = await Text.findOne({ urlId: req.params.urlId });
  if (text) {
    res.send(text);
  } else {
    res.send({ content: '' });
  }
});

app.post('/text/:urlId', async (req, res) => {
  const { content } = req.body;
  let text = await Text.findOne({ urlId: req.params.urlId });
  if (text) {
    text.content = content;
  } else {
    text = new Text({ urlId: req.params.urlId, content });
  }
  await text.save();
  res.send(text);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
