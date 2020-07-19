import React, {Component} from "react";
import {getProducts} from "../../lib/service";
import CartItem from "./CartItem/CartItem";
import Spinner from "react-bootstrap/Spinner";
import './Cart.css';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";

class Cart extends Component {
    state = {
        cartItems: []
    }

    getStockLevelForCartItem = (cartItem, data) => {
        return data
            .filter(d => d.id === +cartItem.id)[0].stock_level
            .filter(d => d.size === cartItem.size)[0].stock_level;
    }

    deleteItemHandler = (id, size) => {
        const updatedCartItems = this.state.cartItems.filter(x => !(x.id === id && x.size === size));
        const cartDataLocal = this.props.cartDataLocal.filter(x => !(+x.id === +id && x.size === size));
        this.setState({cartItems: updatedCartItems});
        this.props.onButtonClick(cartDataLocal);
    }

    quantityChangedHandler = (id, size, newQuantity) => {
        const cartItems = this.state.cartItems.map(
            item => item.id === id && item.size === size
                ? {...item, quantity: newQuantity}
                : item
        );
        const cartDataLocal = this.props.cartDataLocal.map(
            item => +item.id === +id && item.size === size
                ? {...item, quantity: newQuantity}
                : item
        );
        this.setState({cartItems});
        this.props.onButtonClick(cartDataLocal);
    }

    componentDidMount() {
        this.setState({loading: true});

        const cartDataLocal = this.props.cartDataLocal;
        const cartIds = Array.from(new Set(cartDataLocal.map(i => i.id)));
        getProducts({ids: cartIds.join(',')}).then(({data}) => {
                const idsInStock = data.map(x => x.id);
                const updatedCartItems = cartDataLocal
                    .filter(x => idsInStock.includes(+x.id))
                    .filter(x => this.getStockLevelForCartItem(x, data) > 0);
                this.props.onButtonClick(updatedCartItems);

                const cartItems = updatedCartItems.map(item => {
                    const itemSameId = data.filter(x => +x.id === +item.id)[0];
                    return {...item, ...itemSameId};
                })
                this.setState({cartItems, loading: false});
            }
        );
    }

    render() {
        const goodsTotal = this.state.cartItems.reduce(
            (prev, curr) => prev + (curr.discounted_price || curr.price) * curr.quantity, 0);

        let data = <React.Fragment>
            <div>
                <h4 className="cart-header">Your cart items</h4>
                <div className="cart">
                    <div className="cart__items">
                        {this.state.cartItems.map((itemData, index) => <CartItem
                            key={index}
                            data={itemData}
                            deleted={this.deleteItemHandler.bind(this, itemData.id, itemData.size)}
                            quantityChanged={this.quantityChangedHandler.bind(this, itemData.id, itemData.size)}
                        />)}
                    </div>
                    <div className="cart-total">
                        <div className="cart-total__box">
                            <div className="cart-total__title">Order Summary</div>
                            <div className="cart_total__breakdown">
                                <div>
                                    <span>Subtotal</span>
                                    <span>{goodsTotal} €</span></div>
                                <div>
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                            </div>
                            <div className="cart_total__total">
                                <span>Estimated Total</span>
                                <span>{goodsTotal} €</span>
                            </div>

                        </div>
                        <button className="cart-total__checkout">Checkout</button>
                    </div>
                </div>
            </div>
        </React.Fragment>

        if (this.state.loading) {
            data = <Spinner className="spinner" animation="border" variant="secondary"/>
        }

        return (<div>
            {data}
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        cartDataLocal: state.cartDataLocal
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onButtonClick: (cartDataLocal) => dispatch({
            type: 'UPDATE_CART',
            cartDataLocal: cartDataLocal
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
