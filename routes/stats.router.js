const express = require('express');

const isAdmin = require('../middlewares/isAdmin');

const statsController = require('../controllers/stats.controller');


const statsRouter = express.Router();

statsRouter.get('/', isAdmin, statsController.getStats);

module.exports = statsRouter;