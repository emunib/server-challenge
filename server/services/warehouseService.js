const {Warehouse} = require('../models');
const {WarehouseValidation} = require('../validations');

class WarehouseService {
    static async getAllWarehouses() {
        const warehouses = await Warehouse.find(); // get all warehouse
        return {code: 200, data: warehouses};
    }

    static async addWarehouse(warehouse) {
        // validate warehouse format
        const {error} = WarehouseValidation.validate(warehouse);
        if (error) {
            return {code: 400, data: 'Invalid request body format'};
        }

        warehouse.inventory = []; // add empty inventory
        const addedWarehouse = await new Warehouse(warehouse).save(); // add warehouse to db
        return {code: 201, data: addedWarehouse};
    }
}

module.exports = WarehouseService;