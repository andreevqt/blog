'use strict';

const Yup = require('yup');

module.exports = {
  create: Yup.object({
    content: Yup.string().required()
  }),

  update: Yup.object({
    content: Yup.string()
  })
};
