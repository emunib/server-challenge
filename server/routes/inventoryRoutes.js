const express = require('express');
const router = express.Router();
const {InventoryController} = require('../controllers');

router.get('/', async (_, res) => {
    const {code, data} = await InventoryController.getAllInventoryItems();
    res.status(code).json(data);
});

router.post('/', async (req, res) => {
    const {code, data} = await InventoryController.addInventoryItem(req.body);
    res.status(code).json(data);
});

router.put('/:id', async (req, res) => {
    const {code, data} = await InventoryController.updateInventoryItem(req.params.id, req.body);
    res.status(code).json(data);
});

router.delete('/:id', async (req, res) => {
    const {code, data} = await InventoryController.deleteInventoryItem(req.params.id);
    res.status(code).json(data);
});

module.exports = router;