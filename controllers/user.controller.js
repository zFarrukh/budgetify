const validator = require('validator');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

const User = require('../models/user.model');

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Bad Request' });
  }

  if (!validator.isEmail(email) || !password) {
    return res.status(400).json({
      error: 'email or password is not valid',
    });
  }

  const user = db.loginUser(req.body.email, req.body.password);

  if (!user) {
    return res.status(404).json({
      error: 'User is not found',
    });
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    id: user.id,
    email: user.email,
    role: user.role,
    token: `Bearer ${token}`,
  });
};

const registerUser = (req, res) => {
  const { email, password, role } = req.body;
  db.registerUser({ email, password, role });

  res.json(db.users);
};

module.exports = {
  loginUser,
  registerUser,
};
