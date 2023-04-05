const {WarehouseService} = require('../services');

class WarehouseController {
    /**
     * Gets all warehouses. Returns a 200 code with an array of warehouse documents. In case of any error returns 500 code and error message.
     * @returns {Promise<{code: number, data: uri.Options.Query<Array<HydratedDocument<*, {}, {}>>, Document<*, *, *>&Require_id<*>, {}, *>}|{code: number, data: string}>}
     */
    static async getAllWarehouses() {
        try {
            return WarehouseService.getAllWarehouses();
        } catch (err) {
            console.log('Error getting all warehouses: ', err);
            return {code: 500, data: 'Internal server error'};
        }
    }

    /**
     * Given a valid warehouse object adds it to the database. Return 201 code with added warehouse object. In case of any error returns 500 code and error message.
     * @param warehouse a valid warehouse object.
     * @returns {Promise<{code: number, data: string}|{code: number, data: *}>}
     */
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