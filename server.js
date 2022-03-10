require('dotenv').config();
const express = require('express');
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const categoryRouter = require('./routes/category.router');
const userRouter = require('./routes/user.router');
const expenseRouter = require('./routes/expense.router');
const incomeRouter = require('./routes/income.router');
const accountRouter = require('./routes/account.router');
const savingRouter = require('./routes/saving.router');
const statsRouter = require('./routes/stats.router');

const { jwtCallback } = require('./config/passport');

const app = express();

app.use(express.json());

app.use(passport.initialize());

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opts, jwtCallback));

app.use('/categories', categoryRouter);
app.use('/user', userRouter);
app.use('/expenses', expenseRouter);
app.use('/incomes', incomeRouter);
app.use('/accounts', accountRouter);
app.use('/savings', savingRouter);
app.use('/stats', statsRouter);

app.listen(process.env.PORT, () => {
  console.log('App is running on port: ' + process.env.PORT || 3000);
});
