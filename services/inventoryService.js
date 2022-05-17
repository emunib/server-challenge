const {Inventory, Warehouse} = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;

class InventoryService {
    static getAllInventoryItems() {
        return Warehouse.aggregate().group({
            _id: null,
            inventory: {
                $push: '$inventory'
            }
        })
            .project({
                _id: 0,
                inventory: {
                    $reduce: {
                        input: '$inventory',
                        initialValue: [],
                        in: {
                            $concatArrays: [
                                '$$this', '$$value'
                            ]
                        }
                    }
                }
            });
    }

    static addInventoryItem(warehouseId, item) {
        item._id = new ObjectId();

        return Warehouse.findOneAndUpdate({
            _id: warehouseId,
            'inventory._id': {$ne: item._id}
        }, {
            $push: {inventory: item}
        }, {new: true});
    }

    static deleteInventoryItem(itemId) {
        return Warehouse.findOneAndUpdate({'inventory._id': itemId}, {$pull: {inventory: {_id: itemId}}}, {new: true});
    }

    static updateInventoryItem(itemId, item) {
        return Warehouse.findOneAndUpdate({'inventory._id': itemId}, {$set: {'inventory.$': item}}, {new: true});
    }
}

module.exports = InventoryService;