const express = require('express');
const router = express.Router();
const {InventoryController} = require('../controllers');
const {InventoryValidation} = require('../validations');
const {isValidObjectId} = require('../utilites');

/*
 * Handle /api/inventory GET request.
 * Gets all inventory items from all warehouses from the database.
 * Sends back all inventory items if successful or appropriate status and error message otherwise.
 */
router.get('/', async (_, res) => {
    const {code, data} = await InventoryController.getAllInventoryItems();
    res.status(code).json(data);
});

/*
 * Handle /api/inventory POST request.
 * Adds the inventory item given in the request body to the appropriate warehouse in the database.
 * Sends back added inventory item if successful or appropriate status and error message otherwise.
 */
router.post('/', async (req, res) => {
    const item = req.body;

    // validate item format
    const {error} = InventoryValidation.validate(item);
    if (error) {
        res.status(400).json('Invalid request body format');
        return;
    }

    // check warehouseId format
    if (!isValidObjectId(item.warehouseId)) {
        res.status(404).json('No warehouse with given id was found');
        return;
    }

    const {code, data} = await InventoryController.addInventoryItem(item);
    res.status(code).json(data);
});

/*
 * Handle /api/inventory/:id PUT request.
 * Updates the inventory with the given id in the database using request body.
 * Sends back updated inventory item if successful or appropriate status and error message otherwise.
 */
router.put('/:id', async (req, res) => {
    const itemId = req.params.id;
    const item = req.body;

    // validate itemId format
    if (!isValidObjectId(itemId)) {
        res.status(404).json('No inventory item with given id was found');
        return;
    }

    // validate item format
    const {error} = InventoryValidation.validate(item);
    if (error) {
        res.status(400).json('Invalid request body format');
        return;
    }

    // validate warehouseId format
    if (!isValidObjectId(item.warehouseId)) {
        res.status(404).json('No warehouse with given id was found');
        return;
    }

    const {code, data} = await InventoryController.updateInventoryItem(itemId, item);
    res.status(code).json(data);
});

/*
 * Handle /api/inventory/:id DELETE request.
 * Deletes the inventory item with the given id from the database.
 * Sends back deleted inventory item if successful or appropriate status and error message otherwise.
 */
router.delete('/:id', async (req, res) => {
    const itemId = req.params.id;

    // validate itemId format
    if (!isValidObjectId(itemId)) {
        res.status(404).json('No inventory item with given id was found');
        return;
    }

    const {code, data} = await InventoryController.deleteInventoryItem(req.params.id);
    res.status(code).json(data);
});

module.exports = router;