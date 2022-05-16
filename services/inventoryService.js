const Inventory = require('../models/inventory');

class InventoryService {
    static getAllInventoryItems() {
        return Inventory.find();
    }

    static addInventoryItem(item) {
        return new Inventory(item).save();
    }

    static deleteInventoryItem(_id) {
        return Inventory.findByIdAndDelete(_id);
    }

    static updateInventoryItem(_id, item) {
        return Inventory.updateOne({_id}, item);
    }
}

module.exports = InventoryService;