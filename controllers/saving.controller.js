const addSaving = (req, res) => {
  const { title, amount, date } = req.body;
  if (!title || !amount)
    return res.status(400).json({ error: 'Please provide infromation' });
  //  totalAmount - amount

  res.json({ message: 'POST Saving' });
};

const deleteSavingById = (req, res) => {
  const id = req.params.id;
  //  totalAmount + amount
  res.json({ message: 'DELETE Saving by id' });
};

const updateSavingById = (req, res) => {
  const id = req.params.id;
  res.json({ message: 'PUT Savings' });
  //  totalAmount + oldAmount - newAmount
};

const getSavings = (req, res) => {
  res.json({ message: 'GET Savings' });
};

module.exports = {
  addSaving,
  deleteSavingById,
  updateSavingById,
  getSavings,
};
