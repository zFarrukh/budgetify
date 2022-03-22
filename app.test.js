const { app } = require('./app');
const supertest = require('supertest');
const mongoose = require('mongoose');
let token;
describe('app', () => {
  beforeAll(async () => {});

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('POST /register', () => {
    it('Should return Bad request', async () => {
      const response = await supertest(app).post('/user/register').send({
        email: 'invalidEmail',
        password: 123456,
        role: 'user',
        name: 'Farrukh',
      });

      expect(response.status).toBe(401);
      expect(response.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(response.body.error).toBe('Bad request');
    });
  });
  describe('POST /login', () => {
    it('Should return user with token', async () => {
      const response = await supertest(app).post('/user/login').send({
        email: 'email@email.com',
        password: 'Farrukh123456',
      });

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(response.body.email).toBe('email@email.com');
      expect(response.body.name).toBe('Farrukh');
      token = response.body.token;
    });
    it('Should return error: Unauthorized', async () => {
      const response = await supertest(app).post('/user/login').send({
        email: 'email@email.com',
        password: 'invalid password',
      });

      expect(response.status).toBe(401);
      expect(response.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(response.body.error).toBe('Unauthorized');
    });
  });
  describe('GET /accounts', () => {
    it('Should return accounts of user', async () => {
      const response = await supertest(app)
        .get('/accounts')
        .set({ Authorization: `Bearer ${token}` });

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(response.body[0].currency).toBe('UZD');
      expect(response.body[0].title).toBe('My updated account');
    });
  });
  describe('POST /accounts', () => {
    it('Should return a new account of user', async () => {
      const response = await supertest(app)
        .post('/accounts')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          title: 'New created account',
          currency: 'UZD',
          amount: 5000,
        });

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(response.body.currency).toBe('UZD');
      expect(response.body.title).toBe('New created account');
      expect(response.body.amount).toBe(5000);
    });

    it('Should fail (Unauthorized)', async () => {
      const response = await supertest(app)
        .post('/accounts')
        .set({ Authorization: 'Unauthorized' })
        .send({
          title: 'New created account',
          currency: 'UZD',
          amount: 5000,
        });

      expect(response.status).toBe(401);
    });

    it('Should fail Bad request', async () => {
      const response = await supertest(app)
        .post('/accounts')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          title: 'New created account',
          currency: 'UZD',
          amount: 'this should be number',
        });

      expect(response.status).toBe(400);
      expect(response.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(response.body.error).toBe('Bad request');
    });
  });
  //   describe('GET /user/:id?', () => {
  //     describe('GET: when the request is valid', () => {
  //       it('get all users', async () => {
  //         const response = await supertest(app).get('/user');

  //         expect(response.status).toBe(200);
  //         // expect(response.body[0]).toEqual({ id: 1, username: 'admin', password: 'admin' });
  //         expect(response.body[0]).toMatchObject({
  //           id: expect.any(Number),
  //           username: expect.any(String),
  //           password: expect.any(String),
  //         });
  //         expect(response.header['content-type']).toBe(
  //           'application/json; charset=utf-8'
  //         );
  //       });

  //       it('get single user', async () => {
  //         const response = await supertest(app).get('/user/1');

  //         expect(response.status).toBe(200);
  //         expect(response.body).toMatchObject({
  //           id: expect.any(Number),
  //           username: expect.any(String),
  //           password: expect.any(String),
  //         });
  //         expect(response.header['content-type']).toBe(
  //           'application/json; charset=utf-8'
  //         );
  //       });
  //     });

  //     describe('GET: when the request is not valid', () => {});
  //   });

  //   describe('POST /user', () => {
  //     describe('POST: when the request body is valid', () => {
  //       it('given username and password', async () => {
  //         const response = await supertest(app)
  //           .post('/user')
  //           .send({ username: 'guest', password: 'guest' });

  //         expect(response.status).toBe(201);
  //         expect(response.body).toEqual({
  //           id: 2,
  //           username: 'guest',
  //           password: 'guest',
  //         });
  //         expect(response.header['content-type']).toBe(
  //           'application/json; charset=utf-8'
  //         );
  //       });
  //     });

  //     describe('POST: when the request body is not valid', () => {
  //       it('given no username', async () => {
  //         const response = await supertest(app)
  //           .post('/user')
  //           .send({ password: 'guest' });

  //         expect(response.status).toBe(400);
  //         expect(response.body.message).toBe(
  //           'Username and password are required!'
  //         );
  //         expect(response.header['content-type']).toBe(
  //           'application/json; charset=utf-8'
  //         );
  //       });
  //     });
  //   });

  //   describe('POST /todo', () => {
  //     describe('POST: when request is valid', () => {
  //       it('given title and completed', async () => {
  //         const response = await supertest(app)
  //           .post('/todo')
  //           .send({ title: 'test', completed: false });

  //         expect(response.status).toBe(201);
  //         expect(response.body).toEqual({ title: 'test', completed: false });
  //         expect(response.header['content-type']).toBe(
  //           'application/json; charset=utf-8'
  //         );
  //       });
  //     });

  //     describe('POST: when request is not valid', () => {});
  //   });
});
