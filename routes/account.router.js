const express = require("express");
const accountController = require('../controllers/account.controller');

const Router = express.Router();

Router.get('/', accountController.getAllAccounts);
Router.post('/', accountController.addAccount);
Router.delete('/:id', accountController.deleteAccountById);
Router.put('/:id', accountController.updateAccountById);


module.exports = Router;
