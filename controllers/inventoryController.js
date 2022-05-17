const {InventoryService} = require('../services');
const {InventoryValidation} = require('../validations');
const {isValidObjectId} = require('../utilites');

class InventoryController {
    static async getAllInventoryItems(req, res) {
        try {
            const items = await InventoryService.getAllInventoryItems();
            res.json(items[0]?.inventory || []);
        } catch (err) {
            console.log('Error getting all inventory items', err);
            res.status(500).send('Internal server error');
        }
    }

    static async addInventoryItem(req, res) {
        try {
            const {error, value} = InventoryValidation.validate(req.body);
            if (error) {
                res.sendStatus(400);
                return;
            }

            if (!isValidObjectId(req.body.warehouseId)) {
                res.sendStatus(404);
                return;
            }

            const addedItem = await InventoryService.addInventoryItem(value.warehouseId, value);
            res.status(201).json(addedItem);
        } catch (err) {
            console.log('Error adding inventory item', err);
            res.status(500).send('Internal server error');
        }
    }

    static async deleteInventoryItem(req, res) {
        try {
            const id = req.params.id;
            if (!isValidObjectId(id)) {
                res.sendStatus(404);
                return;
            }

            const deletedItem = await InventoryService.deleteInventoryItem(id);
            if (!deletedItem) {
                res.sendStatus(404);
                return;
            }

            res.json(deletedItem);
        } catch (err) {
            console.log('Error deleting inventory item', err);
            res.status(500).send('Internal server error');
        }
    }

    static async updateInventoryItem(req, res) {
        try {
            const id = req.params.id;
            if (!isValidObjectId(id)) {
                res.sendStatus(404);
                return;
            }

            const {error, value} = InventoryValidation.validate(req.body);
            if (error) {
                res.sendStatus(400);
                return;
            }

            // make sure wid is valid


            const updatedItem = await InventoryService.updateInventoryItem(id, {_id: id, ...value});
            if (!updatedItem) {
                res.sendStatus(404);
                return;
            }

            res.json(updatedItem);
        } catch (err) {
            console.log('Error updating inventory item', err);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = InventoryController;