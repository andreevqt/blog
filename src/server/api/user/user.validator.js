'use strict';

const Yup = require('yup');

module.exports = {
  create: Yup.object({
    name: Yup.string().required(),
    password: Yup.string().min(6).required(),
    email: Yup.string().email().required()
  }).noUnknown(true).strict(),

  update: Yup.object({
    name: Yup.string(),
    password: Yup.string().min(6),
    email: Yup.string().email()
  }).noUnknown(true).strict(),

  token: Yup.object({
    token: Yup.string().required()
  }).noUnknown(true).strict(),

  login: Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  }).noUnknown(true).strict(),

  logout: Yup.object({
    token: Yup.string().required()
  }).noUnknown(true).strict()
};
