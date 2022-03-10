const db = require('../models/db');

const isAdmin = (req, res, next) => {
  const user = db.getUserByEmail(req.user.email);

  if (user && user.role.toLowerCase() === 'admin') {
    return next();
  }

  res.status(403).json({ message: 'Unauthorized' });
};

module.exports = isAdmin;
