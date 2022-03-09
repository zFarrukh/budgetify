const express = require('express');
const isAuth = require('../middlewares/isAuth');
const savingControllers = require('../controllers/saving.controller');

const Router = express.Router();

Router.get('/', isAuth, savingControllers.getSavings);
Router.post('/', isAuth, savingControllers.addSaving);
Router.put('/:id', isAuth, savingControllers.updateSavingById);
Router.delete('/:id', isAuth, savingControllers.deleteSavingById);

module.exports = Router;
