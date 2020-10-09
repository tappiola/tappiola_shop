import React, {Component} from "react";
import classes from './CartIcon.module.css';
import {NavLink} from 'react-router-dom';
import {connect} from "react-redux";

const getCartTotal = data => data.reduce((prev, next) => prev + next.quantity, 0);

class CartIcon extends Component {

    getCartLabel = quantity => quantity > 0 ? quantity : ''

    render() {

        return (<div className={classes.headerMainIcons}>
            <NavLink to="/cart">
                <span className={classes.headerCartCount}>
                    {this.getCartLabel(this.props.cartTotal)}
                </span>
                <svg className={classes.headerBagIcon} viewBox="0 0 32 32">
                    <path
                        d="M24.444 8.6c-0.087-4.606-3.875-8.037-8.5-8.037s-8.425 3.225-8.5 8.037h-7.444v23.4h32v-23.4h-7.556zM15.931 2.6c3.375 0 6.187 2.45 6.269 6h-12.537c0.088-3.55 2.894-6 6.269-6z"></path>
                </svg>
            </NavLink>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        cartTotal: getCartTotal(state.cartDataLocal)
    }
};

export default connect(mapStateToProps)(CartIcon);
