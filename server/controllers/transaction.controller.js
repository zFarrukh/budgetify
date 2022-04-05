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
  const transaction_id = req.params.id;
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

const updateTransactionById = async (req, res) => {
  const id = req.params.id;
  const { title, amount, category, description, type } = req.body;
  if (!id && type !== 'income' && type !== 'expense') {
    return res.status(400).json({ error: 'Bad request' });
  }

  try {
    const transaction = await Transaction.findById(id);
    const account = await Account.findById(transaction.account_id);
    let newAmount;
    if (type === 'income') {
      if (transaction.type === 'income') {
        newAmount = !isNaN(amount)
          ? account.amount - transaction.amount + amount
          : account.amount;
        if (newAmount < 0) throw new Error('Amount could not be lower than 0');
      } else {
        newAmount = !isNaN(amount)
          ? account.amount - transaction.amount - amount
          : account.amount - 2 * transaction.amount;
        if (newAmount < 0) throw new Error('Amount could not be lower than 0');
      }
    } else if (type === 'expense') {
      if (transaction.type === 'expense') {
        newAmount = !isNaN(amount)
          ? account.amount + transaction.amount - amount
          : account.amount;
        if (newAmount < 0) throw new Error('Amount could not be lower than 0');
      } else {
        newAmount = !isNaN(amount)
          ? account.amount + transaction.amount + amount
          : account.amount + 2 * transaction.amount;
        if (newAmount < 0) throw new Error('Amount could not be lower than 0');
      }
    }
    await Account.findByIdAndUpdate(transaction.account_id, {
      amount: newAmount,
    });
    await Transaction.findByIdAndUpdate(id, {
      title,
      amount,
      category,
      description,
      date_of_update: new Date(),
      type,
    });
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransactionById,
  updateTransactionById,
};
