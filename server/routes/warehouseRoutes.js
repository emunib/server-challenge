const express = require('express');
const router = express.Router();
const {WarehouseController} = require('../controllers');

router.get('/', WarehouseController.getAllWarehouses);
router.post('/', WarehouseController.addWarehouse);

module.exports = router;