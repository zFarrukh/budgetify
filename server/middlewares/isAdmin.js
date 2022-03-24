const User = require('../models/user.model');

const isAdmin = (req, res, next) => {
  const user = User.find({ email: req.user.email })[0];

  if (user && user.role.toLowerCase() === 'admin') {
    return next();
  }

  res.status(403).json({ message: 'Unauthorized' });
};

module.exports = isAdmin;
