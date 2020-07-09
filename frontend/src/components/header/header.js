import React from "react";
import MainLogo from "../../components/MainLogo";
import './styles.css';

const Header = props => {
    return (
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
    );
}

export default Header;