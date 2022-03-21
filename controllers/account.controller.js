const Account = require('../models/account.model');

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
      dateOfCreation: new Date(),
    });
    await account.save();
    res.json(account);
  } catch (err) {
    res.status(400).json({ err: 'Bad request' });
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
    const { title, description, currency, amount } = req.body;
    const account = await Account.findByIdAndUpdate(id, {
      title,
      description,
      currency,
      amount,
      dateOfUpdate: new Date(),
    });
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
