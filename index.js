'use strict';

const mongoose = require('mongoose');
const server = require('./src/server.js');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
      server.start(process.env.PORT)
  });
  