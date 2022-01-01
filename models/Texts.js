const mongoose = require('mongoose');

const TextSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
  },
  textarea: {
    type: String,
    required: true,
  },
  upDate: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('text', TextSchema);
