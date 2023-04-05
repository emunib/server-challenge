const express = require('express');
const router = express.Router();
const {WarehouseController} = require('../controllers');
const {WarehouseValidation} = require('../validations');

/*
 * Handle /api/warehouse GET request.
 * Gets all warehouses from the database.
 * Sends back all warehouses if successful or appropriate status and error message otherwise.
 */
router.get('/', async (req, res) => {
    const {code, data} = await WarehouseController.getAllWarehouses();
    res.status(code).json(data);
});

/*
 * Handle /api/warehouse POST request.
 * Adds the warehouse given in the request body to the database.
 * Sends back the added warehouse if successful or appropriate status and error message otherwise.
 */
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