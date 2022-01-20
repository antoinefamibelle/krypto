import Joi from 'joi';

export const UserCreateDtoSchema = Joi.object({
  user_first_name         : Joi.string().required(),
  user_last_name          : Joi.string().required(),
  user_email              : Joi.string().required(),
  user_password           : Joi.string().required(),
  user_phone              : Joi.string().allow(null),
  user_username          : Joi.string().allow(null),
  user_is_active          : Joi.boolean().allow(null),
});

export const UserEditDtoSchema = Joi.object({
  user_first_name         : Joi.string().required(),
  user_last_name          : Joi.string().required(),
  user_email              : Joi.string().required(),
  user_password           : Joi.string().required(),
  user_phone              : Joi.string().allow(null),
  user_username          : Joi.string().allow(null),
  user_is_active          : Joi.boolean(),
});
