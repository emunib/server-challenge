const {WarehouseService} = require('../services');

class WarehouseController {
    static async getAllWarehouses() {
        try {
            return await WarehouseService.getAllWarehouses();
        } catch (err) {
            console.log('Error getting all warehouses: ', err);
            return {code: 500, data: 'Internal server error'};
        }
    }

    static async addWarehouse(warehouse) {
        try {
            return WarehouseService.addWarehouse(warehouse);
        } catch (err) {
            console.log('Error adding warehouse: ', err);
            return {code: 500, data: 'Internal server error'};
        }
    }
}

module.exports = WarehouseController;