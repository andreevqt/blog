'use strict';

const Yup = require('yup');

module.exports = {
  query: Yup.object({
    page: Yup.number(),
    perPage: Yup.number()
  }),

  create: Yup.object({
    title: Yup.string().required(),
    content: Yup.string()
  }).noUnknown(true).strict(),

  update: Yup.object({
    title: Yup.string(),
    content: Yup.string()
  }).noUnknown(true).strict()
};
