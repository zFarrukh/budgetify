const Transaction = require('../models/transaction.model');
const Account = require('../models/account.model');

const addExpense = async (req, res) => {
  const { title, amount, category, account_id, description } = req.body;
  if ((!title || isNaN(amount) || !category, !account_id)) {
    return res.status(400).json({ error: 'Bad request' });
  }
  try {
    const account = await Account.findById(account_id);
    const newAmount = account.amount - amount;
    if (newAmount < 0) throw new Error("Amount couldn't be lower than 0");
    const expense = new Transaction({
      title,
      amount,
      category,
      account_id,
      description,
      type: 'expense',
      date_of_creation: new Date(),
    });
    await expense.save();
    await Account.findByIdAndUpdate(account_id, { amount: newAmount });
    res.json(expense);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Bad request' });
  }
};

const deleteExpenseById = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Transaction.findByIdAndDelete(id);
    const account = await Account.findById(expense.account_id);
    const newAmount = account.amount + expense.amount;
    await Account.findByIdAndUpdate(expense.account_id, { amount: newAmount });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

const updateExpenseById = (req, res) => {
  const id = req.params.id;
  res.json({ message: 'PUT expenses' });
  // logic: totalAmount - amount
};

const getExpenses = (req, res) => {
  res.json({ message: 'GET expenses' });
};

module.exports = {
  addExpense,
  deleteExpenseById,
  updateExpenseById,
  getExpenses,
};
