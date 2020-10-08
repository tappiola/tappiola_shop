import React, {Component} from "react";
import MainLogo from "./MainLogo/MainLogo";
import classes from './Header.module.css';
import CartIcon from "./CartIcon/CartIcon";
import Search from "./Search/Search";

class Header extends Component {


    render() {
        return (
            <div>
                <div className={classes.header}>
                    <MainLogo/>
                    <p className={classes.headerText}>Enjoy free worldwide shipping on all orders</p>
                    <Search/>
                    <CartIcon/>
                </div>
            </div>
        );
    }
}

export default Header;
