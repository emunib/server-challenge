const express = require('express');
const router = express.Router();
const {WarehouseController} = require('../controllers');
const {WarehouseValidation} = require('../validations');

router.get('/', async (req, res) => {
    const {code, data} = await WarehouseController.getAllWarehouses();
    res.status(code).json(data);
});

router.post('/', async (req, res) => {
    const warehouse = req.body;

    // validate warehouse format
    const {error} = WarehouseValidation.validate(warehouse);
    if (error) {
        res.status(400).json('Invalid request body format');
        return;
    }

    const {code, data} = await WarehouseController.addWarehouse(warehouse);
    res.status(code).json(data);
});

module.exports = router;