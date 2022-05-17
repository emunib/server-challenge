const joi = require('joi');

const InventoryValidationSchema = joi.object({
    itemName: joi.string().required(),
    warehouseId: joi.string().required(),
    description: joi.string().required(),
    quantity: joi.number().integer().min(0).required()
});

module.exports = InventoryValidationSchema;