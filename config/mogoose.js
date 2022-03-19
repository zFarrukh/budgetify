const mongoose = require('mongoose');

const MONGO_URL = `mongodb+srv://budgetify-api:${process.env.MONGO_KEY}@budgetifycluster.7xfxj.mongodb.net/budgetify?retryWrites=true&w=majority`;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready');
});

mongoose.connection.on('error', (err) => {
  console.error(err.message);
});

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
