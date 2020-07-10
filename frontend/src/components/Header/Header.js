import React from "react";
import MainLogo from "./MainLogo/MainLogo";
import './Header.css';
import {withRouter} from "react-router-dom";

const Header = props => {
    return (
        <div>
            <div className='top-menu-lvl1'>

                <MainLogo/>
                <input className='search'>

                </input>
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
