'use strict';

const { Router } = require('express');
const controller = require('./user.controller');
const validator = require('./user.validator');
const { validate } = require('../../core/middleware');
const { authorize } = require('./helpers');
const isCurrentUser = require('./middleware/is-current-user');

const router = new Router();

module.exports = (app) => {
  app.use('/users', router);

  router.param('userId', controller.checkUser);

  router
    .route('/')
    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get user's information
     *     description: Get user's information
     *     tags:
     *       - users
     *     security:
     *       - bearerAuth: []
     *     responses:
     *        200:
     *          description: User information
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/User'
     *        401:
     *           description: Not authorized
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/responses/NotAuthorized'
     */
    .get(authorize, controller.getByAccess)
    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Create a user
     *     description: Create user
     *     consumes: application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/requestBodies/UserCreate'
     *           example:
     *             name: John Doe
     *             email: example@mail.com
     *             password: 123456
     *     tags:
     *       - users
     *     responses:
     *        201:
     *          description: Created
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/UserCreated'
     *        400:
     *          description: Bad request
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/UserInvalid'
     */
    .post(validate(validator.create), controller.create)
    /**
     * @swagger
     * /users:
     *   delete:
     *     summary: Delete a user
     *     description: Delete authorized user
     *     security:
     *       - bearerAuth: []
     *     tags:
     *       - users
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/responses/Deleted'
     *       401:
     *         description: Not authorized
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/responses/NotAuthorized'
     *       403:
     *         description: Forbidden
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/responses/Forbidden'
     */
    .delete(authorize, controller.delete);

  router
    .route('/token')
    /**
     * @swagger
     * /users/token:
     *   post:
     *     summary: Token reset
     *     description: Refresh access token
     *     consumes: application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/requestBodies/Token'
     *           example:
     *             token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3MTEwODA4fQ.XFaI0MZSMMZAcVoa9Y21zVeELbL6NkbqijX4cLFA9T4
     *     tags:
     *       - users
     *     responses:
     *        200:
     *          description: OK
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/TokenRefreshed'
     *        400:
     *          description: Bad request
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/TokenInvalid'
     *        401:
     *          description: Not Authorized
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/NotAuthorized'
     *              example:
     *                success: false
     *                message: User not found
     */
    .post(validate(validator.token), controller.token);

  router
    .route('/login')
    /**
     * @swagger
     * /users/login:
     *   post:
     *     summary: Login user
     *     description: Login user using credentials
     *     consumes: application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/requestBodies/Login'
     *           example:
     *             token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3MTEwODA4fQ.XFaI0MZSMMZAcVoa9Y21zVeELbL6NkbqijX4cLFA9T4
     *     tags:
     *       - users
     *     responses:
     *        200:
     *          description: OK
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/UserLoggedIn'
     *        400:
     *          description: Bad request
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/UserLoggedInInvalid'
     *              example:
     *                success: false
     *                errors:
     *                  email: email is required field
     *                  password: password is required field
     */
    .post(validate(validator.login), controller.login);

  router
    .route('/logout')
    /**
     * @swagger
     * /users/logout:
     *   post:
     *     summary: Logout
     *     description: Logout user
     *     consumes: application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/requestBodies/Token'
     *           example:
     *             token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3MTEwODA4fQ.XFaI0MZSMMZAcVoa9Y21zVeELbL6NkbqijX4cLFA9T4
     *     tags:
     *       - users
     *     responses:
     *        200:
     *          description: OK
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/Logout'
     *              example:
     *                success: true
     *                message: Logout is successful
     *        400:
     *          description: Bad request
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/TokenInvalid'
     */
    .post(validate(validator.logout), controller.logout);

  router
    .route('/:userId')
    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Get specific user info
     *     description: Get user info by id
     *     consumes: application/json
     *     parameters:
     *       - name: id
     *         in: path
     *         description: User id
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *     tags:
     *       - users
     *     responses:
     *        200:
     *          description: OK
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/User'
     *        400:
     *          description: Bad request
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/IdInvalid'
     *        404:
     *          description: Not Found
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/NotFound'
     */
    .get(controller.get)
    /**
     * @swagger
     * /users/{id}:
     *   put:
     *     summary: Update user
     *     description: Update user
     *     consumes: application/json
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         description: User id
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/requestBodies/UserUpdate'
     *     tags:
     *       - users
     *     responses:
     *        200:
     *          description: OK
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/User'
     *        400:
     *          description: Bad request
     *          content:
     *            application/json:
     *              schema:
     *                oneOf:
     *                 - $ref: '#/components/responses/IdInvalid'
     *                 - $ref: '#/components/responses/UserInvalid'
     *        404:
     *          description: Not Found
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/responses/NotFound'
     */
    .put(authorize, isCurrentUser, validate(validator.update), controller.update);
};
