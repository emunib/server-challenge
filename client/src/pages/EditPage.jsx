import axios from 'axios';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

const API_URI = process.env.REACT_APP_API_URI || '/api';

function InventoryPage() {
    const id = useParams().id;
    const history = useHistory();
    const [inventory, setInventory] = useState([]);
    const [warehouses, setWarehouse] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.put(`${API_URI}/inventory/${id}`, {
            itemName: e.target.name.value,
            description: e.target.description.value,
            quantity: e.target.quantity.value,
            warehouseId: e.target.warehouse.value
        });

        e.target.reset();
        history.push('/inventory');
    };

    const getData = async () => {
        let res = await axios.get(`${API_URI}/inventory`);
        setInventory(res.data);

        res = await axios.get(`${API_URI}/warehouse`);
        setWarehouse(res.data);
    };

    return (
        <>
            <h1>Inventory</h1>
            <form onSubmit={handleSubmit}>
                <label>Name: <input type="text" required name="name"
                                    defaultValue={inventory.find(item => item._id === id)?.itemName}/></label><br/>
                <label>Description: <input type="text" required name="description"
                                           defaultValue={inventory.find(item => item._id === id)?.description}/></label><br/>
                <label>Quantity: <input type="number" required min="0" step="1" name="quantity"
                                        defaultValue={inventory.find(item => item._id === id)?.quantity}/></label><br/>
                <label>Warehouse: <select required name="warehouse">{warehouses.map(wh => (
                    <option key={wh._id} value={wh._id}
                            selected={wh._id === inventory.find(item => item._id === id)?.warehouseId}>{wh.name}</option>
                ))}</select></label><br/>
                <button type="submit">Update Inventory</button>
            </form>
        </>
    );
}

export default InventoryPage;