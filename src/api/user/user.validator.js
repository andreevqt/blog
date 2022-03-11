'use strict';

const Yup = require('yup');

module.exports = {
  create: Yup.object({
    name: Yup.string().required(),
    password: Yup.string().min(6).required(),
    email: Yup.string().email().required()
  }),

  update: Yup.object({
    name: Yup.string(),
    password: Yup.string().min(6),
    email: Yup.string().email()
  }),

  token: Yup.object({
    token: Yup.string().required()
  }),

  login: Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  }),

  logout: Yup.object({
    token: Yup.string().required()
  })
};
