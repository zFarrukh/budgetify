const mongoose = require('mongoose');
const { decimalCount } = require('../utils/decimalCount.util');

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
    validate: {
      validator: function (number) {
        const numAfterDots = decimalCount(number);
        if (numAfterDots > 2) {
          return false;
        }
        return true;
      },
      message: 'There is more than 2 numbers after dot',
    },
  },
  currency: {
    type: String,
    required: true,
  },
  date_of_creation: {
    type: Date,
    required: true,
  },
  date_of_update: {
    type: Date,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
