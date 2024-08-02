const express = require('express');
const Text = require('../models/Text');
const router = express.Router();

// Function to generate a 4-character alphanumeric string
const generateShortId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Redirect to a unique URL endpoint
router.get('/', async (req, res) => {
  let urlId;
  let isUnique = false;
  while (!isUnique) {
    urlId = generateShortId();
    const existingText = await Text.findOne({ urlId });
    if (!existingText) {
      isUnique = true;
    }
  }
  res.json({ urlId });
});

// Fetch text content by URL ID
router.get('/:urlId', async (req, res) => {
  try {
    const text = await Text.findOne({ urlId: req.params.urlId });
    if (text) {
      res.send(text);
    } else {
      res.send({ content: '' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Save or update text content by URL ID
router.post('/:urlId', async (req, res) => {
  const { content } = req.body;
  try {
    let text = await Text.findOne({ urlId: req.params.urlId });
    if (text) {
      text.content = content;
    } else {
      text = new Text({ urlId: req.params.urlId, content });
    }
    await text.save();
    res.send(text);
  } catch (error) {
    res.status(500).send(error);
  }
});



// Clear text content by URL ID
router.delete('/:urlId', async (req, res) => {
  try {
    await Text.deleteOne({ urlId: req.params.urlId });
    res.status(200).send({ message: 'Text cleared successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
