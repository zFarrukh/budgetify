const Category = require('../models/category.model');

const getAllCategories = async (req, res) => {
  const user_id = req.user._id;
  try {
    const categories = await Category.find({ user_id });
    res.json(categories);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

const addCategory = async (req, res) => {
  const { type, title } = req.body;
  const user_id = req.user._id;
  console.log(req.user);

  try {
    const category = new Category({ type, title, user_id });
    await category.save();

    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
    const category = await Category.findByIdAndUpdate(
      id,
      { title, type },
      { new: true }
    );
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
