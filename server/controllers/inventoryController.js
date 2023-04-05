const {InventoryService} = require('../services');

class InventoryController {
    /**
     * Gets all inventory items from all warehouses. Returns a 200 code with an array of inventory documents. In case of any error returns 500 code and error message.
     * @returns {Promise<{code: number, data: string}|{code: number, data: ([]|*|*[])}>}
     */
    static async getAllInventoryItems() {
        try {
            return InventoryService.getAllInventoryItems();
        } catch (err) {
            console.log('Error getting all inventory items: ', err);
            return {code: 500, data: 'Internal server error'};
        }
    }

    /**
     * Given a valid inventory object adds it to the database. Returns a 201 code with the added inventory object. In case of any error returns 500 code and error message.
     * @param item a valid inventory item
     * @returns {Promise<{code: number, data: string}|{code: number, data: string}|{code: number, data}>}
     */
    static async addInventoryItem(item) {
        try {
            return InventoryService.addInventoryItem(item);
        } catch (err) {
            console.log('Error adding inventory item: ', err);
            return {code: 500, data: 'Internal server error'};
        }
    }

    /**
     * Deletes the inventory item with the given id. Returns a 200 code with the deleted inventory object. In case of any error returns appropriate code and error message.
     * @param itemId an inventory item id
     * @returns {Promise<{code: number, data: string}|{code: number, data: *}|{code: number, data: string}>}
     */
    static async deleteInventoryItem(itemId) {
        try {
            return InventoryService.deleteInventoryItem(itemId);
        } catch (err) {
            console.log('Error deleting inventory item: ', err);
            return {code: 500, data: 'Internal server error'};
        }
    }

    /**
     * Replaces the inventory item with the given id with the given valid inventory item. Returns a 200 code with the updated inventory object. In case of any error returns appropriate code and error message.
     * @param itemId an inventory item id
     * @param item a valid inventory item
     * @returns {Promise<{code: number, data: string}|{code: number, data: string}|{code: number, data}>}
     */
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