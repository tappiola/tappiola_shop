import React from "react";
import classes from './CartTotal.module.css';

const CartTotal = (props) => {
    return (<div className={classes.box}>
        <div className={classes.title}>Order Summary</div>
        <div className={classes.breakdown}>
            <div>
                <span>Subtotal</span>
                <span>{props.goodsTotal} €</span></div>
            <div>
                <span>Shipping</span>
                <span>Free</span>
            </div>
        </div>
        <div className={classes.total}>
            <span>Total</span>
            <span>{props.goodsTotal} €</span>
        </div>
    </div>);
}

export default CartTotal;
