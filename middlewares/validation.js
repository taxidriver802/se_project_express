const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be at most 30 characters long",
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    weather: Joi.string().required().valid("hot", "warm", "cold").messages({
      "any.only":
        'You must select one of the following options: "hot", "warm", or "cold"',
    }),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be at most 30 characters long",
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required().messages({
      "string.length": 'The "id" field must be 24 characters long',
      "string.hex": 'The "id" field must be a hexadecimal string',
      "string.empty": 'The "id" field must be filled in',
    }),
  }),
});

const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).hex().required().messages({
      "string.length": 'The "itemId" field must be 24 characters long',
      "string.hex": 'The "itemId" field must be a hexadecimal string',
      "string.empty": 'The "itemId" field must be filled in',
    }),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be at most 30 characters long",
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
  }),
});

module.exports = {
  validateClothingItem,
  validateUser,
  validateLogin,
  validateId,
  validateItemId,
  validateURL,
  validateUpdateUser,
};
