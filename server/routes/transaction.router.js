const express = require('express');
const transactionController = require('../controllers/transaction.controller');

const Router = express.Router();

Router.get('/', transactionController.getTransactions);

module.exports = Router;
