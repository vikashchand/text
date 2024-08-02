const express = require('express');
const env = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const user = require('./routes/userRouter');
const dbConfig = require('./config/dbConfig');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://echotext.vercel.app',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', user);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
