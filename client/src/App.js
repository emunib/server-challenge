import './App.css';
import {BrowserRouter, NavLink, Redirect, Route, Switch} from 'react-router-dom';
import EditPage from './pages/EditPage';
import InventoryPage from './pages/InventoryPage';
import WarehousePage from './pages/WarehousePage';

function App() {
    return (
        <BrowserRouter>
            <nav><NavLink to="/warehouse">Warehouse</NavLink><br/><NavLink to="/inventory">Inventory</NavLink></nav>

            <Switch>
                <Route exact path="/"><Redirect to="/warehouse"/></Route>
                <Route path="/warehouse"><WarehousePage/></Route>
                <Route exact path="/inventory"><InventoryPage/></Route>
                <Route path="/inventory/:id/edit"><EditPage/></Route>
            </Switch>

        </BrowserRouter>
    );
}

export default App;
