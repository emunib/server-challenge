const {WarehouseService} = require('../services');

class WarehouseController {
    static async getAllWarehouses(req, res) {
        try {
            const {code, data} = await WarehouseService.getAllWarehouses();
            res.status(code).json(data);
        } catch (error) {
            console.log('Error getting all warehouses: ', error);
            res.status(500).send('Internal server error');
        }
    }

    static async addWarehouse(req, res) {
        try {
            const {code, data} = await WarehouseService.addWarehouse(req.body);
            res.status(code).json(data);
        } catch (err) {
            console.log('Error adding warehouse: ', err);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = WarehouseController;