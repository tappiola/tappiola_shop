import React, {Component} from "react";
import './CartIcon.css';
import {getCartItems} from "../../../lib/localStorageHelpers";

class CartIcon extends Component {


    render() {
        const cartCount = getCartItems().reduce((prev, next) => prev + next.quantity, 0);

        return (<div className='header__main-icons'>
            <div onClick={this.cartClickHandler}>
                <span className="header__cart-count">{cartCount > 0 ? cartCount : ''}</span>
                <svg className="header__bag-icon" viewBox="0 0 32 32">
                    <path
                        d="M24.444 8.6c-0.087-4.606-3.875-8.037-8.5-8.037s-8.425 3.225-8.5 8.037h-7.444v23.4h32v-23.4h-7.556zM15.931 2.6c3.375 0 6.187 2.45 6.269 6h-12.537c0.088-3.55 2.894-6 6.269-6z"></path>
                </svg>
            </div>
        </div>)
    }
}

export default CartIcon;
