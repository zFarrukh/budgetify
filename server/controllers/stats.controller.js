const Transaction = require('../models/transaction.model');
const {
  generateCategoryStats,
} = require('../utils/generateCategoryStats.util');
const { generateMonthlyStats } = require('../utils/generateMonthlyStats.util');

const getCategoryStats = async (req, res) => {
  const { account_id, fromDate, toDate } = req.query;
  const findQuery = {
    account_id,
  };

  if (fromDate && toDate) {
    findQuery.date_of_creation = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }

  const transactions = await Transaction.find(findQuery);
  res.json(generateCategoryStats(transactions));
};

const getMonthlyStats = async (req, res) => {
  const { account_id, fromDate, toDate } = req.query;
  const findQuery = {
    account_id,
  };

  if (fromDate && toDate) {
    findQuery.date_of_creation = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }

  const transactions = await Transaction.find(findQuery);
  res.json(generateMonthlyStats(transactions));
};

module.exports = {
  getCategoryStats,
  getMonthlyStats,
};
