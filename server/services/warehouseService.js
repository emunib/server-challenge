const {Warehouse} = require('../models');

class WarehouseService {
    static async getAllWarehouses() {
        const warehouses = await Warehouse.find(); // get all warehouse
        return {code: 200, data: warehouses};
    }

    static async addWarehouse(warehouse) {
        warehouse.inventory = []; // add empty inventory
        const addedWarehouse = await new Warehouse(warehouse).save(); // add warehouse to db
        return {code: 201, data: addedWarehouse};
    }
}

module.exports = WarehouseService;