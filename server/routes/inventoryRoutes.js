const express = require('express');
const router = express.Router();
const {InventoryController} = require('../controllers');
const {InventoryValidation} = require('../validations');
const {isValidObjectId} = require('../utilites');

// handle get all inventory request
router.get('/', async (_, res) => {
    const {code, data} = await InventoryController.getAllInventoryItems();
    res.status(code).json(data);
});

// handle add inventory item request
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

// handle edit inventory item with id request
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

// handle delete inventory item with id request
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