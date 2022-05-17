const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const {InventorySchema} = require('./inventory');

const WarehouseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    inventory: {
        type: [InventorySchema],
        required: true
    }
}, {
    toJSON: {
        transform: (doc, obj) => {
            const {__v, _id, ...rest} = obj;
            return {id: _id, ...rest};
        }
    }
});

module.exports = {WarehouseSchema, WarehouseModel: mongoose.model('Warehouse', WarehouseSchema)};