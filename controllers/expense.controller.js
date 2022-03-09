const addExpense = (req, res) => {
  const { title, amount, category, date } = req.body;
  if (!title || !amount || !category)
    return res.status(400).json({ error: 'Please provide infromation' });
  // logic: totalAmount - amount

  res.json({ message: 'POST expense' });
};

const deleteExpenseById = (req, res) => {
  const id = req.params.id;
  // logic: totalAmount + amount
  res.json({ message: 'DELETE expense by id' });
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
