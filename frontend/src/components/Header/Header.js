import React, {Component} from "react";
import MainLogo from "./MainLogo/MainLogo";
import './Header.css';
import CartIcon from "./CartIcon/CartIcon";
import Search from "./Search/Search";

class Header extends Component {


    render() {
        return (
            <div>
                <div className='header'>
                    <MainLogo/>
                    <Search/>
                    <CartIcon/>
                </div>
            </div>
        );
    }
}

export default Header;
