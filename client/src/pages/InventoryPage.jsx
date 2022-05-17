import axios from 'axios';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

function InventoryPage() {
    const history = useHistory();
    const [inventory, setInventory] = useState([]);
    const [warehouses, setWarehouse] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('/api/inventory', {
            itemName: e.target.name.value,
            description: e.target.description.value,
            quantity: e.target.quantity.value,
            warehouseId: e.target.warehouse.value
        });

        e.target.reset();
        getData();
    };

    const getData = async () => {
        let res = await axios.get('/api/inventory');
        setInventory(res.data);

        res = await axios.get('/api/warehouse');
        setWarehouse(res.data);
    };

    const handleClick = async (id) => {
        await axios.delete(`/api/inventory/${id}`);
        getData();
    };

    return (
        <>
            <h1>Inventory</h1>
            <form onSubmit={handleSubmit}>
                <label>Name: <input type="text" required name="name"/></label><br/>
                <label>Description: <input type="text" required name="description"/></label><br/>
                <label>Quantity: <input type="number" required min="0" step="1" name="quantity"/></label><br/>
                <label>Warehouse: <select required name="warehouse">{warehouses.map(wh => (
                    <option key={wh._id} value={wh._id}>{wh.name}</option>
                ))}</select></label><br/>
                <button type="submit">Add Inventory</button>
            </form>
            <hr/>
            {inventory.map(item => (
                <div key={item._id}>
                    <p>{`Name: ${item.itemName}`}</p>
                    <p>{`Description: ${item.description}`}</p>
                    <p>{`Quantity: ${item.quantity}`}</p>
                    <p>{`Warehouse: ${warehouses.find(wh => wh._id === item.warehouseId)?.name}`}</p>
                    <button onClick={() => history.push(`/inventory/${item._id}/edit`)}>Edit</button>
                    <button onClick={() => handleClick(item._id)}>Delete</button>
                    <hr/>
                </div>
            ))}
        </>
    );
}

export default InventoryPage;