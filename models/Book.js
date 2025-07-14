const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  borrowed:{type:String,default:"no"}
});

module.exports = mongoose.model('Book', bookSchema);