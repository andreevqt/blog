'use strict';

const mockUserService = () => {
  return {
    get: jest.fn((id) => id === 1 && ({
      id: 1,
      name: 'John Doe',
      email: 'example@mail.com'
    }))
  };
};

const mockJWTService = () => {
  return {
    verify: jest.fn((token = 'babecafe') => {
      if (token !== 'babecafe') {
        throw Error('Wrong token');
      }

      return {
        id: 1
      };
    })
  };
};

const mockRequest = () => {
  return {
    headers: {}
  };
};

const mockResponse = () => {
  return {
    status: jest.fn(() => null),
    json: jest.fn(() => null),
    send: jest.fn(() => null),
    locals: {}
  };
};

module.exports = {
  mockUserService,
  mockJWTService,
  mockRequest,
  mockResponse
};
