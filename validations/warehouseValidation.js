const joi = require('joi');

const WarehouseValidationSchema = joi.object({
    name: joi.string().required(),
    city: joi.string().required(),
    country: joi.string().required(),
    address: joi.string().required()
});

module.exports = WarehouseValidationSchema;