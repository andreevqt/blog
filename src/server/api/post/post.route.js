'ust strict';

const { Router } = require('express');
const controller = require('./post.controller');
const { authorize } = require('../user/helpers');
const { query, create, update } = require('./post.validator');
const isPostAuthor = require('./middleware/is-post-author');
const validate = require('../../core/middleware/validate');

const router = new Router();

module.exports = (app) => {
  app.use('/posts', router);

  router.param('postId', controller.checkPost);

  router
    .route('/')
    /**
     * @swagger
     * /posts:
     *   get:
     *     summary: List of posts
     *     description: Get pagnated list of posts
     *     parameters:
     *       - name: page
     *         in: query
     *         description: Page number
     *         schema:
     *           type: integer
     *           example: 1
     *       - name: perPage
     *         in: query
     *         description: Entries per page
     *         schema:
     *           type: integer
     *           example: 15
     *     tags:
     *       - posts
     *     responses:
     *        200:
     *          description: User information
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/ListPosts'
     */
    .get(validate(query, 'query'), controller.list)
    /**
     * @swagger
     * /posts:
     *   post:
     *     summary: Create a post
     *     description: Create a post
     *     consumes: application/json
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/requestBodies/PostCreate'
     *     tags:
     *       - posts
     *     responses:
     *        201:
     *          description: Created
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/PostCreated'
     *        400:
     *          description: Bad request
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/PostInvalid'
     *        401:
     *           description: Not authorized
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/responses/NotAuthorized'
     */
    .post(authorize, validate(create), controller.create);

  router
    .route('/:postId')
    // TODO: document this
    .get(controller.get)
    /**
     * @swagger
     * /posts/{id}:
     *   put:
     *     summary: Update a post
     *     description: Update a post
     *     consumes: application/json
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         description: Post id
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/requestBodies/PostUpdate'
     *     tags:
     *       - posts
     *     responses:
     *        200:
     *          description: OK
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/PostUpdated'
     *        400:
     *          description: Bad request
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/PostInvalid'
     *        401:
     *           description: Not authorized
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/responses/NotAuthorized'
     *        404:
     *          description: Not Found
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/NotFound'
     */
    .put(authorize, isPostAuthor, validate(update), controller.update)
    /**
     * @swagger
     * /posts/{id}:
     *   delete:
     *     summary: Delete a post
     *     description: Delete a post
     *     consumes: application/json
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         description: Post id
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *     tags:
     *       - posts
     *     responses:
     *        200:
     *          description: OK
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/Deleted'
     *        401:
     *           description: Not authorized
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/responses/NotAuthorized'
     *        404:
     *          description: Not Found
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/NotFound'
     */
    .delete(authorize, isPostAuthor, validate(update), controller.delete);
};
