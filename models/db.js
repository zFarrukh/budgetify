const users = [
  {
    id: 1,
    userName: 'Farrukh',
    email: 'test@test.com',
    country: 'Uzbekistan',
    currency: 'UZD',
    age: 19,
    accounts: [
      {
        id: 1,
        name: 'account',
        totalSum: 100,
        expenses: [
          {
            id: 1,
            title: 'To buy clothes',
            date: '06-03-2021',
            category: 'Shopping',
            amount: 50,
          },
        ],
        income: [
          {
            id: 1,
            title: 'Salary',
            date: '06-03-2021',
            amount: 500,
          },
        ],
        saving: [
          {
            id: 1,
            title: 'To buy a car',
            date: '06-03-2021',
            amount: 50,
          },
        ],
      },
    ],
  },
];

let categories = [
  { id: 1, category: 'Shopping' },
  {
    id: 2,
    category: 'Fun',
  },
];

module.exports = {
  users,
  categories,
};
