import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import CategoryTabs from "./components/Header/CategoryTabs/CategoryTabs";
import Banner from "./components/Header/Banner/Banner";
import DesignersList from "./components/DesignersList/DesignersList";
import DesignerCategory from "./components/DesignerCategory/DesignerCategory";
import ProductPage from "./components/ProductPage/ProductPage";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import OrderSuccessful from "./components/OrderSuccessful/OrderSuccessful";

function App() {
    return (
        <div>
            <Header/>
            <Route path={['/category/:id', '/']} component={CategoryTabs}/>
            <Banner/>
            <Switch>
                <Route path='/designers/:id' component={DesignerCategory}/>
                <Route path='/designers' component={DesignersList}/>
                <Route path='/category/:id/product/:productId' component={ProductPage}/>
                <Route path='/category/:id' component={Category}/>
                <Route path='/cart' component={Cart}/>
                <Route path='/checkout/:id' component={Checkout}/>
                <Route path='/order-details/:id' component={OrderSuccessful}/>
                <Route path='/' component={Home}/>
            </Switch>
        </div>
    );
}

export default App;
