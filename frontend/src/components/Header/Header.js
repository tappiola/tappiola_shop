import React, {Component} from "react";
import MainLogo from "./MainLogo/MainLogo";
import classes from './Header.module.css';
import CartIcon from "./CartIcon/CartIcon";
import Search from "./Search/Search";
import {HamburgerButton} from "./HamburgerButton/HamburgerButton";
import {Route} from "react-router-dom";
import CategoryTabs from "./CategoryTabs/CategoryTabs";

class Header extends Component {
    state = {
        isMenuOpen: false
    }

    closeMenuHandler = () => {
        this.setState({isMenuOpen: false});
    }

    render() {
        return (
            <>
                <div>
                    <div className={classes.header}>
                        <HamburgerButton
                            menuOpen={this.state.isMenuOpen}
                            onButtonClick={() => this.setState({isMenuOpen: !this.state.isMenuOpen})}
                        />
                        <MainLogo/>
                        <p className={classes.headerText}>Enjoy free worldwide shipping</p>
                        <Search/>
                        <CartIcon/>
                    </div>
                </div>
                <Route path={['/category/:id', '/']}>
                    <CategoryTabs isMenuOpen={this.state.isMenuOpen} onMenuClose={this.closeMenuHandler}/>
                </Route>
            </>
        );
    }
}

export default Header;
