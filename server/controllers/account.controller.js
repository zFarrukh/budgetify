const Account = require('../models/account.model');
const Transaction = require('../models/transaction.model');

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user_id: req.user._id });
    res.json(accounts);
  } catch (err) {
    res.status(404).json({ error: 'Not Found' });
  }
};

const addAccount = async (req, res) => {
  try {
    const { title, description, currency, amount } = req.body;
    const user_id = req.user._id;
    const account = new Account({
      title,
      description,
      currency,
      amount,
      user_id,
      date_of_creation: new Date(),
    });
    await account.save();
    res.json(account);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

const deleteAccountById = async (req, res) => {
  const id = req.params.id;
  try {
    const account = await Account.findByIdAndDelete(id);
    res.status(200).json(account);
  } catch (err) {
    res.status(404).json({ error: 'Not Found' });
  }
};

const updateAccountById = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, currency } = req.body;
    if (currency) {
      const transactions = await Transaction.find({ account_id: id });
      transactions.forEach(async (transaction) => {
        await Transaction.findByIdAndUpdate(transaction._id, {
          currency,
        });
      });
    }

    const account = await Account.findByIdAndUpdate(
      id,
      {
        title,
        description,
        currency,
        date_of_update: new Date(),
      },
      { new: true }
    );
    res.json(account);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

module.exports = {
  getAllAccounts,
  addAccount,
  deleteAccountById,
  updateAccountById,
};
