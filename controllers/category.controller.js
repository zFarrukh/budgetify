let { categories } = require("../models/db");
const { v4: uuidv4 } = require('uuid');

const getAllcategories = (req, res) => {
    res.json(categories);
}


const addCategory = (req, res) => {
    const newcategory = {
        id: uuidv4(),
        category: req.body.category
    };

    categories.push(newcategory);

    res.json({category: newcategory});
}

const deleteCategoryById = (req, res) => {
    const id = req.params.id;
    categories = categories.filter(category => {
        return category.id != id;
    });

    res.json(categories);
}

const updateCategoryById = (req, res) => {
    const id = req.params.id;
    const updatedCategory = req.body.category;

    categories = categories.map(category => {
        if(category.id == id) {
            return {
                id: category.id,
                category: updatedCategory
            }
        } else {
            return category;
        }
    });

    res.json(categories);
}

module.exports = {
    getAllcategories,
    addCategory,
    deleteCategoryById,
    updateCategoryById
}
