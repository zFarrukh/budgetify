const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    required: true,
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 128,
  },
  account_id: {
    ref: 'Account',
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    required: true,
    trim: true,
    type: String,
    minlength: 1,
    maxlength: 128,
  },
  description: {
    required: false,
    trim: true,
    type: String,
    minlength: 1,
    maxlength: 256,
  },
  category: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    maxlength: 128,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
    validate: {},
  },
  date_of_creation: {
    type: Date,
    required: true,
  },
  date_of_update: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
