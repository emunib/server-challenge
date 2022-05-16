const InventoryService = require('../services/inventoryService');


class InventoryController {
    static async getAllInventoryItems(req, res) {
        try {
            const items = await InventoryService.getAllInventoryItems();
            res.json(items);
        } catch (err) {
            console.log('Error getting all inventory items', err);
            res.status(500).send('Internal server error');
        }
    }

    static async addInventoryItem(req, res) {
        try {
            const item = req.body;

            const addedItem = await InventoryService.addInventoryItem(item);
            res.json(addedItem);
        } catch (err) {
            console.log('Error adding inventory item', req.body, err);
            res.status(500).send('Internal server error');
        }
    }

    static async deleteInventoryItem(req, res) {
        try {
            const _id = req.params.id;
            const deletedItem = await InventoryService.deleteInventoryItem(_id);
            res.json(deletedItem);
        } catch (err) {
            console.log('Error deleting inventory item', req.params.id, err);
            res.status(500).send('Internal server error');
        }
    }

    static async updateInventoryItem(req, res) {
        try {
            const _id = req.params.id;
            const item = req.body;

            const updatedItem = await InventoryService.updateInventoryItem(_id, item);
            res.json(updatedItem);
        } catch (err) {
            console.log('Error updating inventory item', req.params.id, req.body, err);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = InventoryController;