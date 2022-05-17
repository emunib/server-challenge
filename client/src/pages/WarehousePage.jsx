import {useEffect, useState} from 'react';
import axios from 'axios';

function WarehousePage() {
    const [warehouses, setWarehouse] = useState([]);

    useEffect(() => {
        getWarehouse();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('/api/warehouse', {
            name: e.target.name.value,
            address: e.target.address.value,
            city: e.target.city.value,
            country: e.target.country.value
        });

        e.target.reset();
        getWarehouse();
    };

    const getWarehouse = async () => {
        const res = await axios.get('/api/warehouse');
        setWarehouse(res.data);
    };

    return (
        <>
            <h1>Warehouses</h1>
            <form onSubmit={handleSubmit}>
                <label>Name: <input type="text" required name="name"/></label><br/>
                <label>Address: <input type="text" required name="address"/></label><br/>
                <label>City: <input type="text" required name="city"/></label><br/>
                <label>Country: <input type="text" required name="country"/></label><br/>
                <button type="submit">Add Warehouse</button>
            </form>
            <hr/>
            {warehouses.map(wh => (
                <div key={wh._id}>
                    <p>{`Name: ${wh.name}`}</p>
                    <p>{`Address: ${wh.address}`}</p>
                    <p>{`City: ${wh.city}`}</p>
                    <p>{`Country: ${wh.country}`}</p>
                    <p>Inventory:</p>
                    <ul>{wh.inventory.map(item => (
                        <li key={item._id}>{item.itemName}</li>
                    ))}</ul>
                    <hr/>
                </div>
            ))}
        </>
    );
}

export default WarehousePage;