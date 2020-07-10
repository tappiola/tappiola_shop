import React from "react";
import MainLogo from "./MainLogo/MainLogo";
import './Header.css';
import Banner from "./Banner/Banner";
import CategoryTabs from "./Categories/CategoryTabs";
import {withRouter} from "react-router-dom";

const Header = props => {
    return (
        <div>
        <div className='top-menu-lvl1'>
            <div className='main-categories'>
                <div>Country</div>
                <div className='active'>Women</div>
                <div>Men</div>
                <div>Children</div>
            </div>
            <MainLogo/>
            <div className='main-icons'>
                <div>Profile</div>
                <div>Favorites</div>
                <div>Basket</div>
            </div>

        </div>
        </div>
    );
}

export default withRouter(Header);