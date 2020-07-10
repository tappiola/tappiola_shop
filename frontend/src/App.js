import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import CategoryTabs from "./components/Header/Categories/CategoryTabs";
import Banner from "./components/Header/Banner/Banner";
import DesignersList from "./components/DesignersList/DesignersList";

function App() {
    return (
        <div>
            <Header/>
            <Route path={['/category/:id', '/']} component={CategoryTabs}/>
            <Banner/>
            <Switch>
                <Route path='/designers' component={DesignersList}/>
                <Route path='/category/:id' component={Category}/>
                <Route path='/' component={Home}/>
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
