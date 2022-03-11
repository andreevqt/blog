'use strict';

const request = require('supertest');
const setup = require('../../test-setup/setup');
const userService = require('./user.service');
const { Http } = require('../../constants');

let teardown;
let app;

beforeAll(async () => {
  const result = await setup();
  app = result.app;
  teardown = result.destroy;
});

afterAll(async () => {
  await teardown();
});

describe('/users api endpoint', () => {
  let testUser;

  const attrs = {
    name: 'John Doe',
    email: 'example@mail.com',
    password: '12345'
  };

  beforeEach(async () => {
    testUser = await userService.create(attrs);
  });

  afterEach(async () => {
    await userService.delete(testUser.id);
  });

  describe('GET /users/:userId', () => {
    test('Should get user by userId', async () => {
      const storedUser = await userService.get(testUser.id);

      const response = await request(app).get(`/users/${storedUser.id}`)
        .expect(Http.OK);

      const { user } = response.body;
      expect(storedUser).toEqual(expect.objectContaining(user));
    });

    test('Should return 404 error if userId is wrong', async () => {
      const response = await request(app)
        .get('/users/1234');

      expect(response.status).toBe(Http.NOT_FOUND);
    });
  });

  describe('POST /users', () => {
    const toCreate = {
      name: 'Jane Doe',
      email: 'test1234@mail.com',
      password: '123456'
    };

    test('Should create a user', async () => {
      const response = await request(app)
        .post('/users')
        .send(toCreate)
        .expect(Http.CREATED);

      const { user } = response.body;
      expect(user.name).toEqual(toCreate.name);
      expect(user.email).toEqual(toCreate.email);

      await userService.delete(user.id);
    });

    test('Should return 400 status code if attributes are wrong', async () => {
      let response;

      // duplicate email
      response = await request(app)
        .post('/users')
        .send({ ...toCreate, email: attrs.email });
      expect(response.status).toBe(Http.CONFLICT);

      // password less than 6
      response = await request(app)
        .post('/users')
        .send({ ...toCreate, password: '123' });
      expect(response.status).toBe(Http.BAD_REQUEST);

      // email isn't valid
      response = await request(app)
        .post('/users')
        .send({ ...toCreate, email: 'asdad' });
      expect(response.status).toBe(Http.BAD_REQUEST);
    });
  });
});
