const {Warehouse} = require('../models');

class WarehouseService {
    /**
     * Gets all warehouses. Returns a 200 code with an array of warehouse documents.
     * @returns {Promise<{code: number, data: Query<Array<HydratedDocument<unknown, {}, {}>>, Document<unknown, any, unknown> & Require_id<unknown>, {}, unknown>}>}
     */
    static async getAllWarehouses() {
        const warehouses = await Warehouse.find(); // get all warehouse
        return {code: 200, data: warehouses};
    }

    /**
     * Given a valid warehouse object adds it to the database. Return 201 code with added warehouse object.
     * @param warehouse a valid warehouse object.
     * @returns {Promise<{code: number, data: *}>}
     */
    static async addWarehouse(warehouse) {
        warehouse.inventory = []; // add empty inventory to warehouse
        const addedWarehouse = await new Warehouse(warehouse).save(); // add warehouse to db
        return {code: 201, data: addedWarehouse};
    }
}

module.exports = WarehouseService;