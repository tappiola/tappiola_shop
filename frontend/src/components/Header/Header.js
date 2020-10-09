import React, {Component} from "react";
import MainLogo from "./MainLogo/MainLogo";
import classes from './Header.module.css';
import CartIcon from "./CartIcon/CartIcon";
import Search from "./Search/Search";
import {HamburgerButton} from "./HamburgerButton/HamburgerButton";

class Header extends Component {
    state = {
        isMenuOpen: false
    }


    render() {
        return (
            <div>
                <div className={classes.header}>
                    <HamburgerButton
                        menuOpen={this.state.isMenuOpen}
                        onButtonClick={() => this.setState({isMenuOpen: !this.state.isMenuOpen})}/>
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
