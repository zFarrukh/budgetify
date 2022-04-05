const Transaction = require('../models/transaction.model');
const Account = require('../models/account.model');

const addTransaction = async (req, res) => {
  const { title, amount, category, account_id, description, type } = req.body;
  if ((!title || isNaN(amount) || !category, !account_id || !type)) {
    return res.status(400).json({ error: 'Bad request' });
  }
  if (type !== 'income' && type !== 'expense') {
    return res.status(400).json({ error: 'Bad request' });
  }
  try {
    const account = await Account.findById(account_id);
    let newAmount;
    if (type === 'income') {
      newAmount = account.amount + amount;
    } else {
      newAmount = account.amount - amount;
    }
    const transaction = new Transaction({
      title,
      amount,
      category,
      account_id,
      description,
      type,
      date_of_creation: new Date(),
    });
    await transaction.save();
    await Account.findByIdAndUpdate(account_id, { amount: newAmount });
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

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

const deleteTransactionById = async (req, res) => {
  const transaction_id = req.query.id;
  if (!transaction_id) {
    return res.status(400).json({ error: 'Bad request' });
  }
  try {
    const transaction = await Transaction.findByIdAndDelete(transaction_id);
    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransactionById,
};
