const express = require("express");
const categoryController = require("../controllers/category.controller");

const Router = express.Router();

Router.get('/', categoryController.getAllcategories);
Router.post('/', categoryController.addCategory);
Router.delete('/:id', categoryController.deleteCategoryById);
Router.put('/:id', categoryController.updateCategoryById);


module.exports = Router;
