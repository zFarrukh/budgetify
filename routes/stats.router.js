const express = require('express');

const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const statsController = require('../controllers/stats.controller');

const statsRouter = express.Router();

statsRouter.get('/', isAuth, isAdmin, statsController.getStats);

module.exports = statsRouter;
