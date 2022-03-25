const Category = require('../models/category.model');

const getAllCategories = async (req, res) => {
  const account_id = req.query.account_id;
  try {
    const categories = await Category.find({ account_id });
    res.json(categories);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

const addCategory = async (req, res) => {
  const { type, title, account_id } = req.body;

  try {
    const category = new Category({ type, title, account_id });
    await category.save();

    res.json(category);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

const deleteCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByIdAndDelete(id);
    res.json(category);
  } catch (err) {
    res.status(404).json({ error: 'Not Found' });
  }
};

const updateCategoryById = async (req, res) => {
  const id = req.params.id;
  const { title, type } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(id, { title, type });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  deleteCategoryById,
  updateCategoryById,
};
