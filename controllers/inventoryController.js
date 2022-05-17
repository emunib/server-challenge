const {InventoryService} = require('../services');

class InventoryController {
    static async getAllInventoryItems(req, res) {
        try {
            const {code, data} = await InventoryService.getAllInventoryItems();
            res.status(code).json(data);
        } catch (err) {
            console.log('Error getting all inventory items: ', err);
            res.status(500).send('Internal server error');
        }
    }

    static async addInventoryItem(req, res) {
        try {
            const {code, data} = await InventoryService.addInventoryItem(req.body);
            res.status(code).json(data);
        } catch (err) {
            console.log('Error adding inventory item: ', err);
            res.status(500).send('Internal server error');
        }
    }

    static async deleteInventoryItem(req, res) {
        try {
            const {code, data} = await InventoryService.deleteInventoryItem(req.params.id);
            res.status(code).json(data);
        } catch (err) {
            console.log('Error deleting inventory item: ', err);
            res.status(500).send('Internal server error');
        }
    }

    static async updateInventoryItem(req, res) {
        try {
            const {code, data} = await InventoryService.updateInventoryItem(req.params.id, req.body);
            res.status(code).json(data);
        } catch (err) {
            console.log('Error updating inventory item: ', err);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = InventoryController;