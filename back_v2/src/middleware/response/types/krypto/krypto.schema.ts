import Joi from 'joi';

export const KryptoCreateDtoSchema = Joi.object({
  krypto_name         : Joi.string().required(),
  krypto_amount     : Joi.number().allow(null),
  krypto_average_price  : Joi.number().allow(null),
});

export const KryptoEditDtoSchema = Joi.object({
  krypto_name         : Joi.string().allow(null),
  krypto_amount     : Joi.number().allow(null),
  krypto_average_price  : Joi.number().allow(null),
});
