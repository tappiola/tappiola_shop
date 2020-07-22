import React from "react";
import './CartTotal.css';

const CartTotal = (props) => {
    return (<div className="cart-total__box">
        <div className="cart-total__title">Order Summary</div>
        <div className="cart_total__breakdown">
            <div>
                <span>Subtotal</span>
                <span>{props.goodsTotal} €</span></div>
            <div>
                <span>Shipping</span>
                <span>Free</span>
            </div>
        </div>
        <div className="cart_total__total">
            <span>Total</span>
            <span>{props.goodsTotal} €</span>
        </div>

    </div>);

}

export default CartTotal;
