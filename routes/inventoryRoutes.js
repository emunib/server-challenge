const express = require('express');
const router = express.Router();
const InventoryController = require('../controllers/inventoryController');

router.get('/', InventoryController.getAllInventoryItems);
router.post('/', InventoryController.addInventoryItem);
router.put('/:id', InventoryController.updateInventoryItem);
router.delete('/:id', InventoryController.deleteInventoryItem);

module.exports = router;