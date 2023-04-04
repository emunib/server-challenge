const {InventoryService} = require('../services');

class InventoryController {
    static async getAllInventoryItems() {
        try {
            return InventoryService.getAllInventoryItems();
        } catch (err) {
            console.log('Error getting all inventory items: ', err);
            return {code: 500, data: 'Internal server error'};
        }
    }

    static async addInventoryItem(item) {
        try {
            return InventoryService.addInventoryItem(item);
        } catch (err) {
            console.log('Error adding inventory item: ', err);
            return {code: 500, data: 'Internal server error'};
        }
    }

    static async deleteInventoryItem(itemId) {
        try {
            return InventoryService.deleteInventoryItem(itemId);
        } catch (err) {
            console.log('Error deleting inventory item: ', err);
            return {code: 500, data: 'Internal server error'};
        }
    }

    static async updateInventoryItem(itemId, item) {
        try {
            return InventoryService.updateInventoryItem(itemId, item);
        } catch (err) {
            console.log('Error updating inventory item: ', err);
            return {code: 500, data: 'Internal server error'};
        }
    }
}

module.exports = InventoryController;