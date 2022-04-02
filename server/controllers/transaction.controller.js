const Transaction = require('../models/transaction.model');

const getTransactions = async (req, res) => {
  const account_id = req.query.account_id;
  if (!account_id) {
    return res.status(400).json({ error: 'Bad request' });
  }
  try {
    const transactions = await Transaction.find({ account_id });
    res.json(transactions);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

module.exports = {
  getTransactions,
};
