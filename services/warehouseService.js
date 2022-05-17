const {Warehouse} = require('../models');

class WarehouseService {
    static getAllWarehouses() {
        return Warehouse.find();
    }

    static addWarehouse(item) {
        return new Warehouse(item).save();
    }
}

module.exports = WarehouseService;