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
                    <p className='header__text' style={{fontStyle: 'italic', fontSize: '14px'}}>Enjoy free worldwide
                        shipping on all orders</p>
                    <Search/>
                    <CartIcon/>
                </div>
            </div>
        );
    }
}

export default Header;
