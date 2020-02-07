const Joi = require('joi');

// joi query schema
export const create = {
  body: {
  },
};

// joi query schema
export const getAll = {
  query: {
    id: Joi.number()
      .required()
  },
};

// joi query schema
export const getOne = {
  query: {
    id: Joi.number()
      .required()
  },
};

// joi params schema
export const update = {
  params: {
    id: Joi.number()
      .required()
  },
};

// joi params schema
export const remove = {
  params: {
    id: Joi.number()
      .required()
  },
};
