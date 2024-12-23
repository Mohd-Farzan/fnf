require('dotenv').config(); // Load environment variables from .env

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(function() {
    console.log('Database connected');
  })
  .catch(function(err) {
    console.log(err);
  });

module.exports = mongoose.connection;
