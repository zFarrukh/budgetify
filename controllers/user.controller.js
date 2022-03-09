const validator = require('validator');
let { users } = require('../models/db');

const loginUser = (req, res) => {
  const { email, userName } = req.body;

  if (!email || !userName) {
    return res.status(400).json({ error: 'Bad Request' });
  }

  if (!validator.isEmail(email) || !userName) {
    return res.status(400).json({
      error: 'email or username is not valid',
    });
  }

  const user = users.filter((user) => {
    return user.email == email && user.userName == userName;
  });

  if (!user[0]) {
    return res.status(404).json({
      error: 'User is not found',
    });
  }
  res.json(user);
};

module.exports = {
  loginUser,
};
