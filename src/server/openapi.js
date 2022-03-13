'use strict';

const pkg = require('../../package.json');

const definition = {
  openapi: '3.0.0',
  info: {
    title: 'Blog API',
    version: pkg.version
  },
  servers: [{
    url: 'http://localhost:3000',
    description: 'Development server'
  }, {
    url: 'https://blog.kino-reaction.ru/api',
    description: 'Staging server'
  }],
  license: {
    name: 'MIT',
    url: 'https://spdx.org/licenses/MIT.html'
  },
  tags: [{
    name: 'users',
    description: 'Endpoints to deal with users'
  }, {
    name: 'posts',
    description: 'Endpoints to deal with with posts'
  }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    models: {
      Post: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1
          },
          title: {
            type: 'string',
            example: 'Some title'
          },
          content: {
            type: 'string',
            example: 'Some content'
          },
          author: {
            $ref: '#/components/models/User'
          },
          createdAt: {
            type: 'string'
          },
          updatedAt: {
            type: 'string'
          }
        }
      },
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            example: 'example@mail.com'
          }
        }
      },
      tokens: {
        type: 'object',
        properties: {
          access: {
            $ref: '#/components/models/accessToken'
          },
          refresh: {
            $ref: '#/components/models/refreshToken'
          }
        }
      },
      accessToken: {
        type: 'string',
        example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3MTEwODA4LCJleHAiOjE2NDcxMTE3MDh9.yaMYufs6k4SxwQDoypw9yWVOMR9ZgHLvxPwfGGT8Fe0',
      },
      refreshToken: {
        type: 'string',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3MTEwODA4fQ.XFaI0MZSMMZAcVoa9Y21zVeELbL6NkbqijX4cLFA9T4',
      }
    },
    responses: {
      ListPosts: {
        type: 'object',
        properties: {
          results: {
            type: 'array',
            items: {
              type: 'string',
              $ref: '#/components/models/Post'
            }
          },
          total: {
            type: 'integer',
            example: 100
          },
          page: {
            type: 'integer',
            example: 1
          },
          totalPages: {
            type: 'integer',
            example: 15
          }
        }
      },
      User: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true
          },
          user: {
            $ref: '#/components/models/User'
          }
        }
      },
      NotAuthorized: {
        type: 'object',
        properties: {
          success: {
            type: 'false',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Not authorized'
          }
        }
      },
      Forbidden: {
        type: 'object',
        properties: {
          success: {
            type: 'false',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Forbidden'
          }
        }
      },
      UserInvalid: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          errors: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'name is a required field',
              },
              email: {
                type: 'string',
                example: 'email is a required field',
              },
              password: {
                type: 'string',
                example: 'password is a required field',
              },
            }
          }
        }
      },
      PostInvalid: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          errors: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                example: 'title is a required field',
              },
              email: {
                type: 'string',
                example: 'email is a required field',
              },
              password: {
                type: 'string',
                example: 'password is a required field',
              },
            }
          }
        }
      },
      Deleted: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true
          },
          message: {
            type: 'string',
            example: 'Deleted'
          }
        }
      },
      UserCreated: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true
          },
          user: {
            allOf: [{
              $ref: '#/components/models/User'
            }, {
              type: 'object',
              properties: {
                tokens: {
                  $ref: '#/components/models/tokens'
                }
              }
            }]
          }
        }
      },
      TokenRefreshed: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          tokens: {
            $ref: '#/components/models/tokens'
          }
        }
      },
      TokenInvalid: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false
          },
          errors: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
                example: 'token is required field'
              }
            }
          }
        }
      },
      UserLoggedIn: {
        $ref: '#/components/responses/UserCreated'
      },
      UserLoggedInInvalid: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false
          },
          errors: {
            type: 'object',
            properties: {
              erros: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string'
                  },
                  password: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }
      },
      IdInvalid: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false
          },
          message: {
            type: 'string',
            example: 'Id should be a number'
          }
        }
      },
      NotFound: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false
          },
          message: {
            type: 'string',
            example: 'Not Found'
          }
        }
      },
      Logout: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
          },
          message: {
            type: 'string'
          }
        }
      },
      PostCreated: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true
          },
          Post: {
            $ref: '#/components/models/Post'
          }
        }
      },
      PostUpdated: {
        $ref: '#/components/responses/PostCreated'
      }
    },
    requestBodies: {
      PostCreate: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
          title: {
            type: 'string',
            example: 'Some title'
          },
          content: {
            type: 'string',
            example: 'Some content'
          }
        }
      },
      PostUpdate: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'Some title'
          },
          content: {
            type: 'string',
            example: 'Some content'
          }
        }
      },
      UserCreate: {
        type: 'object',
        required: [
          'name', 'email', 'password'
        ],
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          }
        }
      },
      UserUpdate: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'John Doe'
          },
          email: {
            type: 'string',
            example: 'example@mail.com'
          },
          password: {
            type: 'string',
            example: '123456'
          }
        }
      },
      Token: {
        type: 'object',
        properties: {
          token: {
            type: 'string'
          }
        }
      },
      Login: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string'
          },
          password: {
            type: 'string'
          }
        }
      }
    }
  }
};

module.exports = definition;
