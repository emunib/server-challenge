const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const InventorySchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    warehouseId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    }
});

module.exports = {InventorySchema, InventoryModel: mongoose.model('Inventory', InventorySchema)};