const {Warehouse} = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;

class InventoryService {
    /**
     * Gets all inventory items from all warehouses. Returns a 200 code with an array of inventory documents.
     * @returns {Promise<{code: number, data: ([]|*|*[])}>}
     */
    static async getAllInventoryItems() {
        const items = await Warehouse.aggregate()
            .group({ // make an array of all the inventory arrays from each warehouse
                _id: null, inventory: {
                    $push: '$inventory'
                }
            })
            .project({ // flatten the 2d array
                _id: 0, inventory: {
                    $reduce: {
                        input: '$inventory', initialValue: [], in: {
                            $concatArrays: ['$$this', '$$value']
                        }
                    }
                }
            });

        return {code: 200, data: items[0]?.inventory || []}; // return inventory if it exists, [] otherwise
    }

    /**
     * Given a valid inventory object adds it to appropriate warehouse in the database. If no warehouse with the given id is found returns a 404 code, otherwise returns 201 code with added warehouse object.
     * @param item a valid inventory object.
     * @returns {Promise<{code: number, data: string}|{code: number, data}>}
     */
    static async addInventoryItem(item) {
        item._id = new ObjectId(); // add new id to item

        // find warehouse using warehouseId, add item to its inventory, return updated warehouse
        const updatedWarehouse = await Warehouse.findOneAndUpdate({
            _id: item.warehouseId,
            'inventory._id': {$ne: item._id}
        }, {
            $push: {inventory: item}
        }, {
            new: true
        });

        if (!updatedWarehouse) { // no warehouse was updated
            return {code: 404, data: 'No warehouse with given id was found'};
        }

        return {code: 201, data: item};
    }

    /**
     * Removes the inventory item with the given id from the database. If no inventory item with the given id is found returns a 404 code, otherwise returns 200 code with deleted inventory object.
     * @param itemId a inventory item id
     * @returns {Promise<{code: number, data: string}|{code: number, data: *}>}
     */
    static async deleteInventoryItem(itemId) {
        // find warehouse that has in its inventory an item with the given id, remove that item from the array
        // and return warehouse with its inventory containing the removed item
        const deletedItems = await Warehouse.findOneAndUpdate({
            'inventory._id': itemId
        }, {
            $pull: {inventory: {_id: itemId}}
        }, {
            projection: {
                inventory: {'$elemMatch': {_id: itemId}}
            }
        });

        if (!deletedItems) { // no item was deleted
            return {code: 404, data: 'No inventory item with given id was found'};
        }

        return {code: 200, data: deletedItems.inventory[0]}; // return the deleted inventory item
    }

    /**
     * Replaces the inventory item with the given id with the given valid inventory item in the database. If no inventory item with the given id is found returns a 404 code, otherwise returns 200 code with updated inventory object.
     * @param itemId a inventory item id
     * @param item a valid inventory item
     * @returns {Promise<{code: number, data: string}|{code: number, data}>}
     */
    static async updateInventoryItem(itemId, item) {
        const warehouse = await Warehouse.findOne({_id: item.warehouseId}); // find warehouse with new warehouseId
        if (!warehouse) { // no warehouse with the new id
            return {code: 404, data: 'No warehouse with given id was found'};
        }

        item._id = itemId; // add id to item

        // find warehouse whose inventory contains an item with the given id, and remove the item, return the warehouse
        let updatedWarehouse = await Warehouse.findOneAndUpdate({
            'inventory._id': itemId
        }, {
            $pull: {inventory: {_id: itemId}}
        }, {
            new: true
        });

        if (!updatedWarehouse) { // no warehouse was modified
            return {code: 404, data: 'No inventory item with given id was found'};
        }

        // having removed the old item, add the updated item to the appropriate warehouse
        await Warehouse.findOneAndUpdate({
            _id: item.warehouseId
        }, {
            $push: {inventory: item}
        }, {
            new: true
        });

        return {code: 200, data: item}; // return the updated item
    }
}

module.exports = InventoryService;