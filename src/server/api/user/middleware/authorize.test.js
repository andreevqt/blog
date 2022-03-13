'use strict';

const { Http } = require('../../../constants');
const createAuthorize = require('./authorize');
const {
  mockUserService,
  mockJWTService,
  mockRequest,
  mockResponse
} = require('../../../test-setup/mocks');

let userService;
let jwtService;
let req;
let res;
let next;
let authorize;

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe('Should verify that user has an access to specific route', () => {
  beforeEach(() => {
    userService = mockUserService();
    jwtService = mockJWTService();
    req = mockRequest();
    res = mockResponse();
    next = jest.fn();
    authorize = createAuthorize(userService, jwtService);
  });

  test('If token is not provided it should return 401 status code', async () => {
    await authorize(req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(Http.UNAUTHROIZED);
  });

  test('If user has been autorized successfully then next() should be called once', async () => {
    req.headers.authorization = 'Bearer babecafe';
    await authorize(req, res, next);
    expect(next.mock.calls.length).toBe(1);
    expect(typeof res.locals.currentUser).toBe('object');
  });

  test('If token is wrong it should return 403 error', async () => {
    req.headers.authorization = 'Bearer 123';
    await authorize(req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(Http.FORBIDDEN);
  });
});
