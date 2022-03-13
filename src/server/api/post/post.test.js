'use strict';

const request = require('supertest');
const setup = require('../../test-setup/setup');
const postService = require('./post.service');
const userService = require('../user/user.service');
const { Http } = require('../../constants');

let teardown;
let app;
let testUser;

beforeAll(async () => {
  const result = await setup();
  app = result.app;
  teardown = result.destroy;
  testUser = await userService.create({
    name: 'John Doe',
    email: 'example@mail.com',
    password: '12345'
  });
});

afterAll(async () => {
  await userService.delete(testUser.id);
  await teardown();
});

describe('/posts api endpoint', () => {
  describe('GET /posts', () => {
    test('should return list of posts', async () => {
      const postsToInsert = [{
        title: 'Sed non est finibus',
        content: 'Nullam ullamcorper finibus molestie. Duis id dictum tellus, a cursus enim.',
        authorId: testUser.id
      }, {
        title: 'Aliquam ex tellus',
        content: 'Cras hendrerit tortor vel fringilla rutrum. Ut mollis in nisi quis condimentum. Duis cursus ornare eros.',
        authorId: testUser.id
      }];

      const posts = (await postService.bulkCreate(postsToInsert))
        .map((post) => ({
          ...post.toJSON(),
          author: post.author.toJSON()
        }));

      const response = await request(app).get(`/posts`)
        .expect(Http.OK);

      const { results } = response.body;

      expect(results.length).toBe(postsToInsert.length);
      expect(posts).toEqual(expect.objectContaining(results));
    });
  });

  describe('POST /posts', () => {
    test('should create a post', async () => {
      const postAttrs = {
        title: 'Lorem ipsum',
        content: 'Donec pulvinar enim quam, et luctus arcu laoreet ut'
      };

      const response = await request(app).post('/posts')
        .set('authorization', testUser.tokens.access)
        .send(postAttrs)
        .expect(Http.CREATED);

      const { post } = response.body;
      expect(post).toEqual(expect.objectContaining(postAttrs));
    });
  });

  describe('PUT /posts/:postId', () => {
    test('should update a post', async () => {
      const testPost = await postService.create({
        title: 'Some post title',
        content: 'Post content',
        authorId: testUser.id
      });

      const toUpdate = {
        title: 'Lorem ipsum'
      };

      const response = await request(app).put(`/posts/${testPost.id}`)
        .set('authorization', testUser.tokens.access)
        .send(toUpdate)
        .expect(Http.OK);

      const { post } = response.body;
      expect(post).toEqual(expect.objectContaining(toUpdate));
    });
  });

  describe('DELETE /posts/:postId', () => {
    test('Should delete a post', async () => {
      const testPost = await postService.create({
        title: 'Some post title',
        content: 'Post content',
        authorId: testUser.id
      });

      const response = await request(app)
        .delete(`/posts/${testPost.id}`)
        .set('authorization', testUser.tokens.access)
        .expect(Http.OK);

      const { message } = response.body;
      expect(message).toBe('Deleted');
    });
  });
});
