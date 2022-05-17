const {WarehouseService} = require('../services');
const {WarehouseValidation} = require('../validations');

class WarehouseController {
    static async getAllWarehouses(req, res) {
        try {
            const items = await WarehouseService.getAllWarehouses();
            res.json(items);
        } catch (err) {
            console.log('Error getting all warehouses', err);
            res.status(500).send('Internal server error');
        }
    }

    static async addWarehouse(req, res) {
        try {
            const {error, value} = WarehouseValidation.validate(req.body);
            if (error) {
                // console.log(error);
                res.sendStatus(400);
                return;
            }

            const item = {inventory: [], ...value};
            const addedItem = await WarehouseService.addWarehouse(item);
            res.status(201).json(addedItem);
        } catch (err) {
            console.log('Error adding warehouse', err);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = WarehouseController;